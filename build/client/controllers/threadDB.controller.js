angular.module('roomem').controller('dbthreadqueryCtrl', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log)
	{

		var refresh = function()
		{
			$http.get('/messageList').success(function(response)
			{
				void 0;
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
				void 0;
				sessionStorage.setItem('userID', response.data._id);
				window.location.hash = "#querytest";
			});
			refresh();
		}

		$scope.addMessage = function()
		{
			$http.post('/roomieList', $scope.person).then(function(response)
			{
				void 0;
				sessionStorage.setItem('userID', response.data._id);
				window.location.hash = "#querytest";
			});
			refresh();
		}

		$scope.remove = function(id)
		{
			void 0;
			$http.delete('/thread/' + id).success(function(response)
			{
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			void 0;
			$http.get('/roomieList/' + id).success(function(response)
			{
				void 0;
				$scope.person = response;
			});
		}

		$scope.update = function()
		{
			void 0;
			$http.put('/roomieList/' + $scope.person._id, $scope.person).success(function(response)
			{
				void 0;
				refresh();
			});
		}


			}]);