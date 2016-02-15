angular.module('app').controller('tripsViewCtrl', 
['$scope', '$http', 'uiGmapGoogleMapApi', '$rootScope', 'QuerySvc', '$sessionStorage','Pagination', 
function($scope, $http, uiGmapGoogleMapApi, $rootScope, QuerySvc, $sessionStorage, Pagination)
{
	$rootScope.pagination = Pagination.getNew(7);
	$scope.isCollapsed = true;
	$scope.pagination.numPages = Math.ceil($rootScope.numTrips/$scope.pagination.perPage);
	var model = 'trip';
	var refresh = function()
	{
		if ( $sessionStorage.session )
		{
			void 0;
			var uid = $sessionStorage.user._id;
			$scope.trips = $sessionStorage.user.trips;
		}
		else
		{
			void 0
		}
	};
	refresh();

	}]);