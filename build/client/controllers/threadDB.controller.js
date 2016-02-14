angular.module('app').controller('threadQueryCtrl', 
['$scope', '$http', '$location', '$log', 
function($scope, $http, $location, $log)
	{

		var refresh = function()
		{
			$http.get('/messageList').success(function(response)
			{
				console.log('DB thread ctrl refresh: ' + JSON.stringify(response));
				$scope.threadList = response;
				$scope.thread = '';
			});
		};
		refresh();
		$scope.test = "yo yo yo !!!!";


		$scope.addThread = function()
		{
			$http.post('/roomieList', $scope.person).then(function(response)
			{
				console.log(response.data._id);
				sessionStorage.setItem('userID', response.data._id);
				window.location.hash = "#querytest";
				//$scope.person_id = response._id;
			});
			refresh();
		}

		$scope.addMessage = function()
		{
			$http.post('/roomieList', $scope.person).then(function(response)
			{
				console.log(response.data._id);
				sessionStorage.setItem('userID', response.data._id);
				window.location.hash = "#querytest";
				//$scope.person_id = response._id;
			});
			refresh();
		}

		$scope.remove = function(id)
		{
			console.log(id);
			$http.delete('/thread/' + id).success(function(response)
			{
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			console.log(id);
			$http.get('/roomieList/' + id).success(function(response)
			{
				console.log(response);
				$scope.person = response;
				//refresh();
			});
		}

		$scope.update = function()
		{
			console.log($scope.person._id);
			$http.put('/roomieList/' + $scope.person._id, $scope.person).success(function(response)
			{
				//console.log($scope.person);
				console.log(response);
				refresh();
			});
		}
		

	}]);