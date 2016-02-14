angular.module('app').controller('tripQueryCtrl', 
['$scope', '$http', '$sessionStorage', '$state',
function($scope, $http, $sessionStorage, $state)
	{
		console.log('in room db controller');
		var model = $state.current.model;
		console.log(model);
		var refresh = function()
		{
			$http.get('/list/trip')
			.then(function(response)
			{
				console.log('dbquery in db refresh: ');
				console.log(response);
				$scope.list = response.data;
				$scope.item = '';
			});
		};
		refresh();


		$scope.add = function()
		{
			console.log($scope.item);
			$http.post('/list', {"item": model, "data": $scope.item})
			.then(function(response)
			{
				console.log(response.data._id);
				sessionStorage.setItem('userID', response.data._id);
				refresh();
			});
		}

		$scope.remove = function(id)
		{
			console.log(id);
			$http.delete('/list/' + model + '/' + id)
			.then(function(response)
			{
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			console.log(id);
			$http.get('/list/' + model + '/' + id)
			.then(function(response)
			{
				$scope.item = response.data;
				console.log('edit response: ');
				console.log(response.data);
				// refresh();
			});
		}

		$scope.update = function()
		{
			console.log($scope.item);
			$http.put('/list/' + model + '/' + $scope.item._id, $scope.item)
			.then(function(response)
			{
				//console.log($scope.person);
				console.log(response.data);
				refresh();
			});
		}
		

	}]);