angular.module('roomem').controller('roomSearchCtrl', 
['$scope', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, uiGmapGoogleMapApi, MatchSvc, AddRoomies, UpdateSvc, QuerySvc, $sessionStorage)
{
		void 0;

		if ( $sessionStorage.session )
		{
			var current = $sessionStorage.user;
			var uid = $sessionStorage.user._id;
			$scope.room = $sessionStorage.room;
		}

		$scope.search = {};












	}]);