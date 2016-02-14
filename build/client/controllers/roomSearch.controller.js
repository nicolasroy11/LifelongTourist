angular.module('app').controller('roomSearchCtrl', 
['$scope', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, uiGmapGoogleMapApi, MatchSvc, AddRoomies, UpdateSvc, QuerySvc, $sessionStorage)
{
		// First thing: get the logged in user ID so that it doesn't
		// var refresh = function()
		// {
		// 	if ( sessionStorage.session )
		// 	{
		// 		var uid = sessionStorage.getItem('userID');
		// 		var rid = sessionStorage.getItem('roomID');
		// 		QuerySvc.get("roomie", uid)
		// 		.then(function (response)
		//         {
		//         	current = response;
		//         	if (sessionStorage.getItem('roomID')!=='')
		// 			{
		// 				QuerySvc.get("room", rid)
		// 				.then(function (response)
		// 		        {
		// 		        	$scope.room = response;
		// 		        });
		// 			}
		//         });
		// 	}
		// 	else
		// 	{
		// 		console.log("No one logged in.")
		// 	}
		// };
		console.log("In roomsearch controller.");

		// refresh();
		if ( $sessionStorage.session )
		{
			var current = $sessionStorage.user;
			var uid = $sessionStorage.user._id;
			// var rid = $sessionStorage.room._id;
			$scope.room = $sessionStorage.room;
		}

		$scope.search = {};
		// // console.log(current);
		// // console.log(uid);
		// // console.log(rid);
		// // console.log($scope.room);

		// $scope.roomies = [];
		// $scope.availRooms = [];
		// $scope.emailPattern = '/^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/';

		// // Adding new roomie emails
		// $scope.addEmail = function()
		// {
		// 	$scope.index = $scope.roomies.length;
		// 	$scope.roomies.push({ 'email' : '' });
		// };

		// // Removing roomie emails
		// $scope.removeEmail = function(index)
		// {
		// 	console.log($scope.roomies[index]);
		// 	$scope.roomies.splice(index, 1);
		// };

		// // Adding new avail rooms
		// $scope.addAvailRoom = function()
		// {
		// 	$scope.index = $scope.availRooms.length;
		// 	$scope.availRooms.push({ 'price' : '' });
		// };

		// // Removing roomie emails
		// $scope.removeAvailRoom = function(index)
		// {
		// 	console.log($scope.availRooms[index]);
		// 	$scope.availRooms.splice(index, 1);
		// };


		// // registering an available room in the db
		// $scope.addRoom = function()
		// {
		// 	if ( !$sessionStorage.session )
		// 	{
		// 		alert("Gotta log in for that!");
		// 	}
		// 	else
		// 	{
		// 		var additionalID = [];
		// 		$scope.room.meta = {};
		// 		$scope.room.meta.listerID = $sessionStorage.user._id;
		// 		$scope.room.rooms = $scope.availRooms;
		// 		additionalID = AddRoomies($scope.roomies);

		// 		// This function is timed out to allow the roomies to return their IDs.
		// 		// Needs to be changed to implement a promise 
		// 		$timeout(function()
		// 		{
		// 			$scope.room.roomie = additionalID;
		// 			$http.post('/room', $scope.room).then(function(response)
		// 			{
		// 				console.log('additionalID : ' + JSON.stringify(additionalID));
		// 				console.log(response.data);
		// 				// sessionStorage.setItem('roomID', response.data._id);
		// 				$sessionStorage.room = response.data;
		// 				// Set the logged in roomie's status to that of a lister
		// 				var newStatus = {'meta.status' : 2, 'meta.hasRoom' : response.data._id};
		// 				UpdateSvc("roomie", $sessionStorage.user._id, newStatus)
		// 				.then(function(response)
		// 				{
		// 					// we update the user in our scope to reflect the change
		// 					current = response;
		// 					// Don't forget to update $sessionStorage.user and .room here
		// 				});
													
		// 				// Update all the annexed roomies' hasRoom field to the newly created room ID
		// 				for(i=0; i<additionalID.length; i++)
		// 				{
		// 					console.log('additionalID[i] : ' + additionalID[i]);
		// 					var newStatus = {'meta.hasRoom' : response.data._id};
		// 					var update = UpdateSvc("roomie", additionalID[i], newStatus);
		// 				}
		// 				// Clear the roomie annexed array so that it doesn't carry over to other sessions
		// 				additionalID.length = 0;
		// 				window.location.hash = "#roomquerytest";
		// 			});
		// 		}, 2000);
		// 	}
		// } 

	// 	$scope.searchLocations = function()
	// 	{
	// 		console.log('In searchLocations');
	// 		// var id = sessionStorage.getItem('userID');
 //          	s = $scope.search
	// 		console.log(s);
	// 		$http.get('/roomSearch/' + s).success(function(rooms)
	// 		{
	// 			console.log("roomSearch: " + JSON.stringify(rooms));

	// 			$scope.hasResults = true;
	// 			$scope.roomList = rooms;
	// 			// Using jQuery to map the JSON results to a JS array
	// 			// var room = $.map(rooms, function(el) { return el });

	// 			// Compatibility algorithm here - loop through all rooms returned by the search
	// 			for (i in rooms)
	// 			{
	// 				// display the names of each roomie in the view
	// 				$scope.roomList[i].names = [];
	// 				if (rooms[i].meta.byAgent === false){ $scope.roomList[i].names.push(rooms[i].meta.listerID.profile.name); }
	// 				// console.log('rooms.length: ' + rooms.length);
	// 				// console.log('rooms[i].roomie.length: ' + rooms[i].roomie.length);
	// 				for(j = 0; j < rooms[i].roomie.length; j++)
	// 				{
	// 					$scope.roomList[i].names.push(rooms[i].roomie[j].profile.name); 
	// 				}
	// 				$scope.roomList[i].hash = "#/roomProfile/" + rooms[i]._id;
	// 				console.log('$scope.roomList[i].names: ' + JSON.stringify($scope.roomList[i].names));
	// 				// console.log("$scope.name: " + $scope.name);
	// 				// Calculate the compatibility index for the lister and the logged in user
	// 				if($sessionStorage.session)	// Only test compatibility if someone is logged in
	// 				{
	// 					var match = MatchSvc(current, rooms[i].meta.listerID);
	// 					$scope.roomList[i].compatibility = match;
	// 					console.log("match is: " + match);
	// 					if(match >= 80){$scope.roomList[i].compColor="#55aa55";}else
	// 					if(match < 80 && match > 59){$scope.roomList[i].compColor="#dddd00";}else
	// 					if(match < 60){$scope.roomList[i].compColor="#aa5555";}
	// 				}
	// 				else
	// 				{
	// 					$scope.roomList[i].compColor="#777";
	// 					$scope.roomList[i].compatibility = 'log in!';
	// 				}
	// 			}
	// 		});
	// 	}
	}]);