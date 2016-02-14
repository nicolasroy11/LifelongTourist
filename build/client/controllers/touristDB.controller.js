angular.module('app')
.controller('touristQueryCtrl', 
['$scope', '$http', '$state',
function($scope, $http, $state)
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
			$http.post('/list', {"item": "tourist", "data": $scope.person})
			.then(function(response)
			{
				void 0;
				sessionStorage.setItem('userID', response.data._id);
				refresh();
			});
		}

		$scope.remove = function(id)
		{
			void 0;
			$http.delete('/list/' + model + '/' + id)
			.then(function(response)
			{
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			void 0;
			$http.get('/list/' + id).success(function(response)
			{
				void 0;
				$scope.person = response;
			});
		}

		$scope.update = function()
		{
			void 0;
			$http.put('/list/' + $scope.person._id, $scope.person).success(function(response)
			{
				void 0;
				refresh();
			});
		}


			}]);