angular.module('app')
.controller('touristQueryCtrl', 
['$scope', '$http', '$state',
function($scope, $http, $state)
{
	console.log('in room db controller');
		var model = $state.current.model;
		console.log(model);
		var refresh = function()
		{
			$http.get('/list/' + model)
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
			$http.post('/list', {"item": "tourist", "data": $scope.person})
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
			// This will generate an http get route that the server
			// will pick up on (since we made a get listener in server.js).
			// keep in mind that the controller can issue a get request
			// when a button is pressed; it doens't have to be a typed url
			// followed by an enter key strike.
			// The server will in turn respond with
			// the matching db entry in its entirety and put it in the
			// path specified. This function will listen for completion
			// of this server task, and upon success, will execute
			// the success function passing in the server response, which
			// is the retrieved record.
			$http.get('/list/' + id).success(function(response)
			{
				console.log(response);
				$scope.person = response;
				//refresh();
			});
		}

		$scope.update = function()
		{
			console.log($scope.person._id);
			// This time, since we're modifying using the _id handle
			// but modifying the other params, we also pass in the entire
			// modified contact info contained in the put route.
			$http.put('/list/' + $scope.person._id, $scope.person).success(function(response)
			{
				//console.log($scope.person);
				console.log(response);
				refresh();
			});
		}
		

	}]);