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
			var args = 
				{
					'method': 'GET',
					'path': 'db',
					'model': 'tourist',
					'filter': { '_id' : uid,
								'select': 'trips'
							},
					'populate': 'trips',
				};
			QuerySvc.get(args)
			.then(function(res)
			{
				$scope.trips = res.data.trips;
				void 0;
				void 0;
			});

		}
		else
		{
			void 0
		}
	};
	refresh();

	$scope.remove = function(item)
	{
		void 0;
		void 0;
		var args = 
			{
				'method': 'delete',
				'path': 'db',
				'model': model,
				'filter': {'_id': {'$in': [item._id]}},
			};
		QuerySvc.put(args)
		.then(function(res)
		{
			refresh();
			void 0;
			void 0;
			var args = 
			{
				'method': 'PUT',
				'pull': {'trips': {'$in': [item._id]}},
				'path': 'db',
				'model': 'tourist',
				'filter': {'_id': { '$in': [item.lister]}},
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				refresh();
				void 0;
				void 0;
			});
		});
	}

	$scope.edit = function(id)
	{
		var args = 
			{
				'method': 'GET',
				'path': 'db',
				'model': model,
				'filter': {"_id": id},
			};
		QuerySvc.get(args)
		.then(function(res)
		{
			$scope.item = res.data;
			void 0;
			void 0;
		});
	}


	}]);