angular.module('app').controller('singleRoomCtrl', 
['$scope', '$http', '$stateParams', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', 'roomInfo', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, $http, $stateParams, uiGmapGoogleMapApi, MatchSvc, AddRoomies, roomInfo, UpdateSvc, QuerySvc, $sessionStorage)
{
	var current;
	var rid = $stateParams.id;
	$scope.rid = rid;
	$scope.showForm = false;
    $scope.showSuccess = false;

	$scope.room = roomInfo;
	void 0;
	void 0;


	$scope.submit = function()
	{
		void 0;
		$scope.thread = {};
		$scope.thread.messages = {};
		$scope.thread.parties = [];
		$scope.thread.parties[0] = current._id;	
		$scope.thread.parties[1] = $scope.room.meta.listerID;	
		for(i=0; i<$scope.room.roomie.length; i++)
		{
			$scope.thread.parties[i + 2] = $scope.room.roomie[i]._id;
		}
		void 0;
		QuerySvc.post("message", $scope.thread)
		.then(function (response)
        {
        	void 0;

			var threadPush = {'threads': response._id};
			QuerySvc.push("roomie", $scope.thread.parties, threadPush)
			.then(function(res)
			{
				void 0;
	        	var message = {'messages':
	        		{
	        			'message' : $scope.message, 
	        			'senderID' : current._id, 
	        			'senderName' : current.profile.name 
	        		}};
				QuerySvc.push("thread", response._id, message)
				.then(function(res)
				{
					void 0;
					$scope.showForm = false;
		        	$scope.successMsg = "request sent!";
		        	$scope.showSuccess = true;
				});
			});
        });
	};

}]);