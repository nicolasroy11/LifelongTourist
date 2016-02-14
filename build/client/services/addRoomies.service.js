angular.module('roomem').factory('AddRoomies',['$http', '$q', 'UpdateSvc', function($http, $q, UpdateSvc)
{
	var args = {};
	var IDs = [];
	IDs.length = 0;
	var ready = false;
	return function(roomies)
	{
		void 0;
			for(i in roomies)
			{
				args = 
				{
					'username': roomies[i].email, 
					'password': Math.random().toString(16).slice(-8)
				};
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
						void 0;
						void 0;
						var newStatus = {'meta.status' : 3};
						UpdateSvc("roomie", response.data, newStatus);
						if (IDs.length === roomies.length){ ready = true };
						while( !ready ){};
					}
				});
			}

			return IDs;
	}
}]);