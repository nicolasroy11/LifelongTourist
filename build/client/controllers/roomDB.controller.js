angular.module('roomem').controller('dbroomqueryCtrl', 
['$scope', '$http', '$location', '$log', '$sessionStorage',
function($scope, $http, $location, $log, $sessionStorage)
	{
		void 0;
		var refresh = function()
		{
			$http.get('/roomList').success(function(response)
				{
					void 0;
					$scope.roomList = response;
					$scope.room = '';
				});
		};
		refresh();


		$scope.addRoom = function()
		{
			$scope.room.meta = {};
			$scope.room.meta.listerID = $sessionStorage.user._id;
			$http.post('/roomList', $scope.room).then(function(response)
			{
				void 0;
				sessionStorage.setItem('roomID', response.data._id);
				window.location.hash = "#roomquerytest";
				refresh();
			});

					}

		$scope.remove = function(id)
		{
			void 0;
			$http.delete('/roomList/' + id).success(function(response)
			{
				refresh();
			});
		}

		$scope.edit = function(id)
		{
			void 0;
			$http.get('/roomList/' + id).success(function(response)
			{
				$scope.room = response;
			});
		}

		$scope.update = function()
		{
			void 0;
			$http.put('/roomList/' + $scope.room._id, $scope.room).success(function(response)
			{
				void 0;
				refresh();
			});
		}


			}]);