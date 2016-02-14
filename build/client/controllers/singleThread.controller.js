angular.module('roomem').controller('singleThreadCtrl', 
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

			}
			void 0;
			void 0;
		}
	}

	socketio.on('msg', function(data)
	{
		$rootScope.singleThread = data;
		$sessionStorage.threads[$rootScope.singleThreadIndex] = data;
		void 0;
		void 0;
		refresh();
	});

    $rootScope.close = function()
    {
        $rootScope.checked = false;
        delete $rootScope.singleThread;
        void 0;
    }

	function checkName(sender)
	{
		var name = sender === $sessionStorage.user.profile.name ? 'self' : sender;
		return name;
	}

	$scope.send = function(status)
	{
		void 0;
    	var message = {'messages':
    		{
    			'message' : $scope.message, 
    			'senderID' : $sessionStorage.user._id, 
    			'senderName' : $sessionStorage.user.profile.name 
    		}};

		if ( status === 'reply' )
		{
			QuerySvc.push("thread", $rootScope.singleThread._id, message)
			.then(function(res)
			{
				void 0;
				$scope.message = '';
				$scope.successMsg = 'message sent!';
			});
		}
		else if ( status === 'new' )
		{
			var thread = {};
			thread.messages = {};
			thread.parties = [];
			thread.parties[0] = $sessionStorage.user._id;	
			thread.parties[1] = $rootScope.viewedRoom.meta.listerID._id;	
			for(i=0; i<$rootScope.viewedRoom.roomie.length; i++)
			{
				thread.parties[i + 2] = $rootScope.viewedRoom.roomie[i]._id;
			}
			void 0;
			QuerySvc.post("message", thread)
			.then(function (response)
	        {
	        	$rootScope.singleThreadIndex = $sessionStorage.threads.length;
	        	void 0;

				var threadPush = { 'threads': response._id };
				QuerySvc.push("roomie", thread.parties, threadPush)
				.then(function(res)
				{
					void 0;
		        	var message = {'messages':
		        		{
		        			'message' : $scope.message, 
		        			'senderID' : $sessionStorage.user._id, 
		        			'senderName' : $sessionStorage.user.profile.name 
		        		}};
					QuerySvc.push("thread", response._id, message)
					.then(function(res)
					{
						void 0;
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