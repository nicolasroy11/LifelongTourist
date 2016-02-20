angular.module('app').controller('queryCtrl', 
['$scope', '$http', '$sessionStorage', '$state', 'QuerySvc',
function($scope, $http, $sessionStorage, $state, QuerySvc)
	{
		void 0;
		var model = $state.current.model;
		void 0;
		var refresh = function()
		{
			$http.get('/list/' + model)
			.then(function(response)
			{
				void 0;
				void 0;
				$scope.list = response.data;
				$scope.item = '';
			});
		};
		refresh();


		$scope.add = function()
		{
			void 0;
			$http.post('/list', {"item": model, "data": $scope.item})
			.then(function(response)
			{
				void 0;
				sessionStorage.setItem('userID', response.data._id);
				refresh();
			});
		}


		$scope.remove = function(id)
		{
			var args = 
			{
				'method': 'delete',
				'path': 'db',
				'model': 'tourist',
				'filter': {'_id': {'$in': [id]}},
				'then': {
							'push': {'testArray': {'$each': ['f', 'r']}},
							'path': 'db',
							'model': 'tourist',
							'filter': {
									},
						}
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				void 0;
				void 0;
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			void 0;
			$http.get('/list/' + model + '/' + id)
			.then(function(response)
			{
				$scope.item = response.data;
				void 0;
				void 0;
			});
		}

		$scope.update = function()
		{
			void 0;
			var update = {'model' : 'tourist', 'data': {'profile' : $scope.item.profile}}
			$http.put('/update/' + $scope.item._id, update)
			.then(function(response)
			{
				void 0;
				refresh();
			});
		}


			}]);