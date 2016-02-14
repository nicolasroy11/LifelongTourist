angular.module('app').controller('singleThreadCtrl', 
['$scope', '$location', 'UpdateSvc', 'QuerySvc', 'Pagination', '$rootScope', '$sessionStorage', 'socketio',
function($scope, $location, UpdateSvc, QuerySvc, Pagination, $rootScope, $sessionStorage, socketio)
{
	var refresh = function()
	{
		if ( $sessionStorage.session )
		{
			$rootScope.inbox = [];
			$rootScope.sent = [];
			$rootScope.deleted = [];
			$rootScope.drafts = [];
			$rootScope.inbox.length = 0;
			$rootScope.sent.length = 0;
			$rootScope.deleted.length = 0;
			$rootScope.drafts.length = 0;
			var inb,sen,del,dra;
			inb = 0;
			sen = 0;
			del = 0;
			dra = 0;
			$scope.pagination.numPages = Math.ceil($rootScope.numThreads/$scope.pagination.perPage);
			$rootScope.threads = $sessionStorage.threads;
			for (i in $sessionStorage.threads)
			{
				var numOfMsg = $sessionStorage.threads[i].messages.length - 1;
				var d = new Date($sessionStorage.threads[i].messages[numOfMsg].created);
				var year = d.getUTCFullYear(),
					month = d.getUTCMonth() + 1,
					day = d.getUTCDate();
				$rootScope.threads[i].lastDate = year + "/" + month + "/" + day;
				$rootScope.threads[i].id = $sessionStorage.threads[i]._id;
				$rootScope.threads[i].lastSender = $sessionStorage.threads[i].messages[numOfMsg].senderName;
				$rootScope.threads[i].lastExcerpt = $sessionStorage.threads[i].messages[numOfMsg].message.substring(0, 21) + '...';
				// Mail distribution
				switch(checkName($rootScope.threads[i].lastSender))
				{
				    case 'self':
				        $rootScope.sent[sen] = $rootScope.threads[i];
				        sen = sen + 1;
				        break;
				    default:
				        $rootScope.inbox[inb] = $rootScope.threads[i];
				        inb = inb + 1;
				}
				$rootScope.numThreads = $rootScope.inbox.length;

				// console.log("$rootScope.threads[" + i + "].id: " + JSON.stringify($rootScope.threads[i].lastDate));
			}
			console.log($rootScope.inbox);
			console.log($rootScope.sent);
		}
	}

	socketio.on('msg', function(data)
	{
		$rootScope.singleThread = data;
		$sessionStorage.threads[$rootScope.singleThreadIndex] = data;
		console.log('messages after: ');
		console.log($rootScope.singleThread);
		refresh();
	});

    $rootScope.close = function()
    {
        $rootScope.checked = false;
        delete $rootScope.singleThread;
        console.log($rootScope.singleThread);
    }

	// Changes the name of message author to 'you' if current user logged in.
	function checkName(sender)
	{
		var name = sender === $sessionStorage.user.profile.name ? 'self' : sender;
		return name;
	}

	$scope.send = function(status)
	{
		console.log($scope.message);
    	var message = {'messages':
    		{
    			'message' : $scope.message, 
    			'senderID' : $sessionStorage.user._id, 
    			'senderName' : $sessionStorage.user.profile.name 
    		}};

		if ( status === 'reply' )
		{
	    	// Push the message body onto the returned thread - type, id, args
			QuerySvc.push("thread", $rootScope.singleThread._id, message)
			.then(function(res)
			{
				console.log(res);
				$scope.message = '';
				$scope.successMsg = 'message sent!';
				// refresh();
			});
		}
		else if ( status === 'new' )
		{
			// For new threads of communication, we create a new thread
			// Make an array of all the user ids participating in this thread
			var thread = {};
			thread.messages = {};
			thread.parties = [];
			thread.parties[0] = $sessionStorage.user._id;	// first push the sender into the party array
			thread.parties[1] = $rootScope.viewedRoom.meta.listerID._id;	// then the primary lister
			for(i=0; i<$rootScope.viewedRoom.roomie.length; i++)
			{
				thread.parties[i + 2] = $rootScope.viewedRoom.roomie[i]._id;
			}
			console.log("thread.parties: " + thread.parties);
			// make the thread
			QuerySvc.post("message", thread)
			.then(function (response)
	        {
	        	// bump up the current thread index so that the new data 
	        	// returned will be
	        	$rootScope.singleThreadIndex = $sessionStorage.threads.length;
	        	console.log("message: " + JSON.stringify(response._id));
	        	
				// Push the thread id to each roomie participating in the thread - type, ids, args
				var threadPush = { 'threads': response._id };
				QuerySvc.push("roomie", thread.parties, threadPush)
				.then(function(res)
				{
					console.log(res);
					// update the messages object of the the returned thread
		        	var message = {'messages':
		        		{
		        			'message' : $scope.message, 
		        			'senderID' : $sessionStorage.user._id, 
		        			'senderName' : $sessionStorage.user.profile.name 
		        		}};
		        	// Push the message body onto the returned thread - type, id, args - this will trigger the live broadcast of the msg
					QuerySvc.push("thread", response._id, message)
					.then(function(res)
					{
						console.log('thread returned: ' + res);
						$scope.showForm = false;
			        	$scope.successMsg = "request sent!";
			        	$scope.showSuccess = true;
			        	refresh();
					});
				});
	        });
		}
	}

}]);