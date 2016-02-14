// This controller handles all messaging. The reason for the use of rootscope is that this controller
// may be called on in two different areas and have to share data across the two different instances.
angular.module('app').controller('threadsCtrl', 
['$scope', '$http', '$location', 'UpdateSvc', 'QuerySvc', 'Pagination', '$rootScope', 'socketio', '$sessionStorage',
function($scope, $http, $location, UpdateSvc, QuerySvc, Pagination, $rootScope, socketio, $sessionStorage)
{
	$rootScope.pagination = Pagination.getNew(7);
	$scope.isCollapsed = true;
	
		// uid = $sessionStorage.user._id;
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

			console.log('threads, inbox and sent: ');
			console.log($rootScope.inbox.length);
			console.log($rootScope.sent.length);
			console.log($sessionStorage.threads.length);
			
		}
	}
	refresh();

	// This watches any change in sessionStorage.session
	// to refresh the contents of the threads dropdown
	$scope.$watch(function()
	{
		return $sessionStorage.session;
	},
	function(newVal, oldVal)
	{
		console.log("The web storage has changed");
		refresh();
	},
	true);

	// Check if someone is logged in for the greeting banner
	$scope.check = function()
	{
		if($sessionStorage.session)
		{	
			return true;
		}
		else
		{
			return false;
		}
	};



	function checkName(sender)
	{
		var name = sender === $sessionStorage.user.profile.name ? 'self' : sender;
		return name;
	}

	$rootScope.checked = false; // This will be binded using the ps-open attribute
    $rootScope.toggle = function()
    {
        $rootScope.checked = !$rootScope.checked;
        console.log($rootScope.singleThread);
    }

	$scope.displaySingle = function(msgType, index)
	{
		msg = [];
		msg.length = 0;
		switch(msgType)
		{
		    case 'sent':
		        msg = $rootScope.sent;
		        break;
		    case 'inbox':
		        msg = $rootScope.inbox;
		        break;
		    default:
		}
		console.log('id: ');
		console.log(msg[index]._id);

		$rootScope.singleThreadIndex = index;
		$rootScope.singleThread = msg[index]; //$rootScope.messages[index]; $sessionStorage.user.threads
		for (i in $rootScope.singleThread.messages)
		{
			// $rootScope.singleThread[i].sender = checkName($rootScope.singleThread[i].sender.messages[i].senderName);
			var d = new Date($rootScope.singleThread.messages[i].created);
			var year = d.getUTCFullYear(),
				month = d.getUTCMonth() + 1,
				day = d.getUTCDate();
				hour = d.getUTCHours() + 4,
				minute = d.getUTCMinutes();
			$rootScope.singleThread.messages[i].time = hour + ":" + minute;
		}
		$rootScope.checked = true;
	}

}]);