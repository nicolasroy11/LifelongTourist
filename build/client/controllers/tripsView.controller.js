angular.module('app').controller('tripCtrl', 
['$scope', '$http', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', '$q', '$timeout', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, $http, uiGmapGoogleMapApi, MatchSvc, AddRoomies, $q, $timeout, UpdateSvc, QuerySvc, $sessionStorage)
{
	$rootScope.pagination = Pagination.getNew(7);
	$scope.isCollapsed = true;
	$scope.pagination.numPages = Math.ceil($rootScope.numTrips/$scope.pagination.perPage);
	var model = 'trip';
	var refresh = function()
	{
		if ( sessionStorage.session )
		{
			var uid = sessionStorage.user._id;
			$scope.trips = sessionStorage.user.trips;
		}
		else
		{
			void 0
		}
	};


	}]);