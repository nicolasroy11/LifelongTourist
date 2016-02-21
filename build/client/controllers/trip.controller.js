angular.module('app').controller('tripCtrl', 
['$scope', '$http', 'uiGmapGoogleMapApi','QuerySvc', '$sessionStorage',
function($scope, $http, uiGmapGoogleMapApi, QuerySvc, $sessionStorage)
{
	var model = 'trip';

	if ( $sessionStorage.session )
	{
		var current = $sessionStorage.user;
		var uid = $sessionStorage.user._id;
		$scope.trips = $sessionStorage.user.trips;
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
			$scope.trip.profile.fromDate = dateParse($scope.data.dateFrom);
			$scope.trip.profile.toDate = dateParse($scope.data.dateTo);
			void 0;
			$scope.trip.lister = $sessionStorage.user._id;

			var args1 = 
			{
				'method': 'POST',
				'path': 'db',
				'model': model,
				'data': $scope.trip,
			};
			QuerySvc.post(args1)
			.then(function(res1)
			{
				void 0;
				void 0;
				var args2 = 
				{
					'method': 'PUT',
					'path': 'db',
					'model': 'tourist',
					'push': {'trips': {'$each': [res1.data._id]}},
					'filter': {
								'_id': $sessionStorage.user._id,
							},
				};
				QuerySvc.put(args2)
				.then(function(res2)
				{
					void 0;
					void 0;
					$sessionStorage.user.trips.push(res1.data);
				})
			})
		}
	}
}]);
