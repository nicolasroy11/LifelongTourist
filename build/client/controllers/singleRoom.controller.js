angular.module('app').controller('singleRoomCtrl', 
['$scope', '$http', '$stateParams', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', 'roomInfo', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, $http, $stateParams, uiGmapGoogleMapApi, MatchSvc, AddRoomies, roomInfo, UpdateSvc, QuerySvc, $sessionStorage)
{
	// Object to hold user currently logged in
	var current;
	var rid = $stateParams.id;
	$scope.rid = rid;
	$scope.showForm = false;
    $scope.showSuccess = false;

	// First thing: get the room's document and the user ID if one is logged in
	// var refresh = function()
	// {
	// 	QuerySvc.get("room", rid)
	// 	.then(function (response)
 //        {
 //        	$scope.room = response;
 //        	// console.log("Single Room from ctrl: " + JSON.stringify(response));
	// 	});
	// 	// console.log("room parameter from ctrl: " + JSON.stringify(roomInfo));
	// 	if ( $sessionStorage.session )
	// 	{
	// 		var uid = $sessionStorage.user._id;
	// 		QuerySvc.get("roomie", uid)
	// 		.then(function (response)
	//         {
	//         	current = response;
	//         	$scope.current = current;
	//         	// console.log("Current: " + JSON.stringify(response));
	//         });
	// 	}
	// 	else
	// 	{
	// 		console.log("No one logged in.")
	// 	}
	// };
	$scope.room = roomInfo;
	console.log('in single room ctrl with: ');
	console.log($scope.room);

	// refresh();

	// User (normally a room seeker) submits their message to the room 
	$scope.submit = function()
	{
		console.log("Message: " + JSON.stringify($scope.message));
		// Make an array of all the user ids participating in this thread
		$scope.thread = {};
		$scope.thread.messages = {};
		$scope.thread.parties = [];
		$scope.thread.parties[0] = current._id;	// first push the sender into the party array
		$scope.thread.parties[1] = $scope.room.meta.listerID;	// then the primary lister
		for(i=0; i<$scope.room.roomie.length; i++)
		{
			$scope.thread.parties[i + 2] = $scope.room.roomie[i]._id;
		}
		console.log("$scope.thread.parties: " + $scope.thread.parties);
		// first, create a thread to host the new message
		QuerySvc.post("message", $scope.thread)
		.then(function (response)
        {
        	console.log("message: " + JSON.stringify(response._id));
        	
			// Push the thread id to each roomie participating in the thread - type, ids, args
			var threadPush = {'threads': response._id};
			QuerySvc.push("roomie", $scope.thread.parties, threadPush)
			.then(function(res)
			{
				console.log(res);
				// update the messages object of the the returned thread
	        	var message = {'messages':
	        		{
	        			'message' : $scope.message, 
	        			'senderID' : current._id, 
	        			'senderName' : current.profile.name 
	        		}};
	        	// Push the message body onto the returned thread - type, id, args - this will trigger the live broadcast of the msg
				QuerySvc.push("thread", response._id, message)
				.then(function(res)
				{
					console.log(res);
					$scope.showForm = false;
		        	$scope.successMsg = "request sent!";
		        	$scope.showSuccess = true;
				});
			});
        });
	};

}]);