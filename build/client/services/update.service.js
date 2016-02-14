// This service is to update a few select things on a DB object like a specific room or roomie
angular.module('app').factory('UpdateSvc',['$http', '$q', 
function($http, $q)
{
	return function(model, id, args)
	{
		var defer = $q.defer();
		var url = '';
		// var response;
		if (model === 'room')
		{
			url = '/roomUpdate/' + id;
		}
		else if (model === 'roomie')
		{
			url = '/roomieUpdate/' + id;
		}
		if(url)
		{
			$http.put(url, args)
			.then(function(res)
			{
				defer.resolve(res.data);
				// response = res.data;
				// console.log('UpdateSvc: ' + JSON.stringify(res.data));
			});
		
		}
		else return 'url is not set';

		return defer.promise;

	}
}]);