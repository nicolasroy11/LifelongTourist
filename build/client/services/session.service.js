angular.module('app').factory('SessionSvc',
['$rootScope', '$sessionStorage', 'QuerySvc', 
function($rootScope, $sessionStorage, QuerySvc)
{
	// Quick and dirty session validation
	this.validate = function(user)
	{
		$sessionStorage.session = true;
		$sessionStorage.user = user;
		console.log($sessionStorage);
		$sessionStorage.threads = user.threads;
		console.log($sessionStorage.threads);
		$sessionStorage.room = user.meta.hasRoom;
		console.log($sessionStorage.room);
		
		// console.log('$sessionStorage.threads' + JSON.stringify($sessionStorage.threads));
		// this.realName = user.profile.name;
		// sessionStorage.setItem('session', true);
		// sessionStorage.setItem('userID', user._id);
		// sessionStorage.setItem('roomID', user.meta.hasRoom);
		// sessionStorage.setItem('name', user.profile.name);
		$rootScope.loggedIn = true;
		// console.log('session valid with: ' + JSON.stringify(this));
	}

	this.invalidate = function()
	{
		console.log('In session invalidate.')
		$rootScope.loggedIn = false;
		$sessionStorage.$reset();
		$sessionStorage.session = false;
	}

	return this;

}]);