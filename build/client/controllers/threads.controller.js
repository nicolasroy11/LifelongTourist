angular.module('app').controller('threadsCtrl', 
['$scope', '$http', '$location', 'UpdateSvc', 'QuerySvc', 'Pagination', '$rootScope', 'socketio', '$sessionStorage',
function($scope, $http, $location, UpdateSvc, QuerySvc, Pagination, $rootScope, socketio, $sessionStorage)
{
	$rootScope.pagination = Pagination.getNew(7);
	$scope.isCollapsed = true;

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
			var threads = $sessionStorage.user.threads;
			$scope.pagination.numPages = Math.ceil($rootScope.numThreads/$scope.pagination.perPage);
			$rootScope.threads = $sessionStorage.threads;
			for (i in $sessionStorage.threads)
			{
				var numOfMsg = threads[i].messages.length - 1;
				var d = new Date(threads[i].messages[numOfMsg].created);
				var year = d.getUTCFullYear(),
					month = d.getUTCMonth() + 1,
					day = d.getUTCDate();
				$rootScope.threads[i].lastDate = year + "/" + month + "/" + day;
				$rootScope.threads[i].id = threads[i]._id;
				$rootScope.threads[i].lastSender = threads[i].messages[numOfMsg].senderName;
				$rootScope.threads[i].lastExcerpt = threads[i].messages[numOfMsg].message.substring(0, 21) + '...';
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
			void 0;
			void 0;

					}
	}
	refresh();

	$scope.$watch(function()
	{
		return $sessionStorage.session;
	},
	function(newVal, oldVal)
	{
		void 0;
		refresh();
	},
	true);

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

	$rootScope.checked = false; 
    $rootScope.toggle = function()
    {
        $rootScope.checked = !$rootScope.checked;
        void 0;
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
		void 0;
		void 0;

		$rootScope.singleThreadIndex = index;
		$rootScope.singleThread = msg[index]; 
		for (i in $rootScope.singleThread.messages)
		{
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