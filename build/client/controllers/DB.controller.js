angular.module('app').controller('queryCtrl', 
['$scope', '$http', '$sessionStorage', '$state', 'QuerySvc',
function($scope, $http, $sessionStorage, $state, QuerySvc)
	{
		void 0;
		var model = $state.current.model;
		void 0;
		var refresh = function()
		{
			var args = 
				{
					'method': 'GET',
					'path': 'db',
					'model': model,
					'filter': {},
				};
			QuerySvc.get(args)
			.then(function(res)
			{
				$scope.list = res.data;
				void 0;
				void 0;
			});
		};
		refresh();


		$scope.add = function()
		{
			var args = 
				{
					'method': 'POST',
					'path': 'db',
					'model': model,
					'data': $scope.item,
				};
			QuerySvc.post(args)
			.then(function(res)
			{
				void 0;
				void 0;
				refresh();
			})
		}

		$scope.remove = function(item)
		{
			void 0
			void 0
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
				var pulled, alt_model, alt_id;
				if (model === 'trip')
				{
					alt_model = 'tourist';
					alt_id = item.lister;
					pulled = {'trips': {'$in': [item._id]}};
				}
				var args = 
				{
					'method': 'PUT',
					'pull': pulled,
					'path': 'db',
					'model': alt_model,
					'filter': {'_id': { '$in': [alt_id]}},
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

		$scope.update = function()
		{


			var args = 
			{
				'method': 'PUT',
				'update': {'profile': $scope.item},
				'path': 'db',
				'model': model,
				'filter': {
							'_id': $scope.item._id,
						},
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				refresh();
				void 0;
				void 0;
			});
		}


			}]);