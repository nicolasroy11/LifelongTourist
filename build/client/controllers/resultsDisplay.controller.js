angular.module('app').controller('resultsDisplayCtrl', 
['QuerySvc', '$stateParams', '$rootScope', 'MatchSvc', '$sessionStorage', '$scope', '$stateParams',
function(QuerySvc, $stateParams, $rootScope, MatchSvc, $sessionStorage, $scope, $stateParams)
{

	var refresh = function()
	{
		var search = {};
		$scope.roomlist = [];
		var query = $stateParams.n;
		void 0;
		return QuerySvc.genericGet("room", query)
		.then(function (rooms)
        {
        	$scope.hasResults = true;
        	$scope.roomList = rooms;
        	for (i in rooms)
			{
				$scope.roomList[i].names = [];
				if (rooms[i].meta.byAgent === false){ $scope.roomList[i].names.push(rooms[i].meta.listerID.profile.name); }
				$scope.roomList[i].excerpt = rooms[i].profile.about.substring(0, 250) + '...';
				for(j = 0; j < rooms[i].roomie.length; j++)
				{
					$scope.roomList[i].names.push(rooms[i].roomie[j].profile.name); 
				}
				$scope.roomList[i].hash = "#/roomProfile/" + rooms[i]._id;
				if($sessionStorage.session)	
				{
					var match = MatchSvc($sessionStorage.user, rooms[i].meta.listerID);
					$scope.roomList[i].compatibility = match;
					void 0;
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
			void 0;
			void 0;
		});
	}
	refresh();

}]);