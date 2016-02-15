angular.module('app').controller('tripCtrl', 
['$scope', '$http', 'uiGmapGoogleMapApi', 'MatchSvc', 'AddRoomies', '$q', '$timeout', 'UpdateSvc', 'QuerySvc', '$sessionStorage',
function($scope, $http, uiGmapGoogleMapApi, MatchSvc, AddRoomies, $q, $timeout, UpdateSvc, QuerySvc, $sessionStorage)
	{
		var model = 'trip';

		if ( $sessionStorage.session )
		{
			var current = $sessionStorage.user;
			var uid = $sessionStorage.user._id;
			$scope.trips = $sessionStorage.trips;
		}

		$scope.roomies = [];
		$scope.availRooms = [];
		$scope.emailPattern = '/^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/';

		$scope.addEmail = function()
		{
			$scope.index = $scope.roomies.length;
			$scope.roomies.push({ 'email' : '' });
		};

		$scope.removeEmail = function(index)
		{
			void 0;
			$scope.roomies.splice(index, 1);
		};

		$scope.addAvailRoom = function()
		{
			$scope.index = $scope.availRooms.length;
			$scope.availRooms.push({ 'price' : '' });
		};

		$scope.removeAvailRoom = function(index)
		{
			void 0;
			$scope.availRooms.splice(index, 1);
		};

		$scope.data = {};
		$scope.trip = {};
		$scope.data.dateFrom = new Date();
		$scope.data.dateTo = new Date();

		var dateParse = function(date)
		{
			var month_names = [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ];
			var day = date.getDate();
			var month = month_names[date.getMonth()];
			var year = date.getFullYear();
			return month + ' ' + day + ', ' + year;
		}

		$scope.addTrip = function()
		{
			if ( !$sessionStorage.session )
			{
				void 0;
			}
			else
			{

								$scope.trip.fromDate = dateParse($scope.data.dateFrom);
				$scope.trip.toDate = dateParse($scope.data.dateTo);
				void 0;
				$scope.trip.lister = $sessionStorage.user._id;
				$http.post('/post', {"model": model, "data": $scope.trip})
				.then(function(response)
				{
					void 0;
					void 0;




					var tripPush = { 'trips': response.data._id };
					QuerySvc.push("tourist", uid, tripPush)
					.then(function(res)
			        {
			        	current = res;
						$sessionStorage.user = current;
			        });



				});
			}
		} 


		$scope.addRoom = function()
		{
			if ( !$sessionStorage.session )
			{
				void 0;
			}
			else
			{
				var additionalID = [];
				$scope.room.meta = {};
				$scope.room.meta.listerID = $sessionStorage.user._id;
				$scope.room.rooms = $scope.availRooms;
				var defer = $q.defer();
				var addRoomies = function()
				{
					void 0;
					defer.resolve(AddRoomies($scope.roomies))
					additionalID = defer.promise;
					void 0;
					void 0;
					return additionalID;
				}
				var postRoomAndUpdate = function()
				{
					void 0;
					$scope.room.roomie = additionalID;
					void 0;
					$http.post('/room', $scope.room)
					.then(function(response)
					{
						void 0;
						void 0;
						$sessionStorage.room = response.data;
						var newStatus = {'meta.status' : 2, 'meta.hasRoom' : response.data._id};
						UpdateSvc("roomie", $sessionStorage.user._id, newStatus)
						.then(function(response)
						{
							current = response;
							$sessionStorage.user = current;
						});

						for(i=0; i<additionalID.length; i++)
						{
							void 0;
							var newStatus = {'meta.hasRoom' : response.data._id};
							var update = UpdateSvc("roomie", additionalID[i], newStatus);
						}
						additionalID.length = 0;
					});
				};

				addRoomies().then(postRoomAndUpdate());



			}
		} 



	}]);