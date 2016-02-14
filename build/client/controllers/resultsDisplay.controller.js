angular.module('app').controller('resultsDisplayCtrl', 
// ['$scope', 'uiGmapGoogleMapApi',  'search', '$sessionStorage',
// function($scope, uiGmapGoogleMapApi, search, $sessionStorage)
['QuerySvc', '$stateParams', '$rootScope', 'MatchSvc', '$sessionStorage', '$scope', '$stateParams',
function(QuerySvc, $stateParams, $rootScope, MatchSvc, $sessionStorage, $scope, $stateParams)
{

	var refresh = function()
	{
		var search = {};
		$scope.roomlist = [];
		var query = $stateParams.n;
		console.log(query);
		return QuerySvc.genericGet("room", query)
		.then(function (rooms)
        {
        	$scope.hasResults = true;
        	$scope.roomList = rooms;
        	for (i in rooms)
			{
				// display the names of each roomie in the view
				$scope.roomList[i].names = [];
				if (rooms[i].meta.byAgent === false){ $scope.roomList[i].names.push(rooms[i].meta.listerID.profile.name); }
				$scope.roomList[i].excerpt = rooms[i].profile.about.substring(0, 250) + '...';
				// console.log('rooms.length: ' + rooms.length);
				// console.log('rooms[i].roomie.length: ' + rooms[i].roomie.length);
				for(j = 0; j < rooms[i].roomie.length; j++)
				{
					$scope.roomList[i].names.push(rooms[i].roomie[j].profile.name); 
				}
				$scope.roomList[i].hash = "#/roomProfile/" + rooms[i]._id;
				// console.log('search.roomList[i].names: ' + JSON.stringify(search.roomList[i].names));
				// console.log("$scope.name: " + $scope.name);
				// Calculate the compatibility index for the lister and the logged in user
				if($sessionStorage.session)	// Only test compatibility if someone is logged in
				{
					var match = MatchSvc($sessionStorage.user, rooms[i].meta.listerID);
					$scope.roomList[i].compatibility = match;
					console.log("match is: " + match);
					if(match >= 80){$scope.roomList[i].compColor="#55aa55";}else
					if(match < 80 && match > 59){$scope.roomList[i].compColor="#dddd00";}else
					if(match < 60){$scope.roomList[i].compColor="rgb(218, 83, 125)";}
				}
				else
				{
					$scope.roomList[i].compColor="#777";
					$scope.roomList[i].compatibility = 'log in!';
				}
			}
			$scope.roomlist = search.roomList;
			console.log("In resultsDisplayCtrl: ");
			console.log($scope.roomList);
			// console.log(search);
		});
	}
	refresh();

}]);