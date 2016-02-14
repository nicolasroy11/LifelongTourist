// This service is for adding roomies to an apartment by another roomie - a rdm str pw is created
// It generates a random password for them and stores them in the DB. It then returns an array
// of all the IDs of the generted roomies
angular.module('app').factory('AddRoomies',['$http', '$q', 'UpdateSvc', function($http, $q, UpdateSvc)
{
	var args = {};
	var IDs = [];
	IDs.length = 0;
	var ready = false;
	// var defer = $q.defer();
	return function(roomies)
	{
		console.log(roomies);
			for(i in roomies)
			{
				// note that roomies is only a scope var, not a reflection of the model field 'roomie'
				args = 
				{
					'username': roomies[i].email, 
					// 'password': 'a'
					'password': Math.random().toString(16).slice(-8)
				};
				// adRoomie.password = Math.random().toString(16).slice(-8);
				// args.push(adRoomie);
				$http.post('/signupProxy', args)
				.then(function(response)
				{
					if (response.data.success === false)
					{
						defer.reject();
						return response.data.message;
					}
					else
					{

						IDs.push(response.data);
						console.log('addRoomies IDs: ');
						console.log(response.data);
						var newStatus = {'meta.status' : 3};
						UpdateSvc("roomie", response.data, newStatus);
						if (IDs.length === roomies.length){ ready = true };
						while( !ready ){};
						// console.log('signup: response.data: ' + JSON.stringify(response.data));
						// console.log('additionalIDs : ' + IDs);
						// var mailData = {};
						// mailData.to = args.username;
						// mailData.from = 'Me';
						// mailData.subject = 'Roomem Welcomes you!';
						// mailData.text = 'Your temporary password is: ' + args.password + ' and your email is: ' + args.username;
						// mailData.html = '<p>' + mailData.text + '</p>';
						// console.log(mailData);
						// $http.post('/mailSend', mailData)
						// .then(function(response)
						// {
						// 	console.log(response);
						// });
					}
				});
			}

			return IDs;
	}
}]);