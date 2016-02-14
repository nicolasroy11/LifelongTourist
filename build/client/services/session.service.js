angular.module('roomem').factory('SessionSvc',
['$rootScope', '$sessionStorage', 'QuerySvc', 
function($rootScope, $sessionStorage, QuerySvc)
{
	this.validate = function(user)
	{
		$sessionStorage.session = true;
		$sessionStorage.user = user;
		void 0;
		$sessionStorage.threads = user.threads;
		void 0;
		$sessionStorage.room = user.meta.hasRoom;
		void 0;

		$rootScope.loggedIn = true;
	}

	this.invalidate = function()
	{
		void 0
		$rootScope.loggedIn = false;
		$sessionStorage.$reset();
		$sessionStorage.session = false;
	}

	return this;

}]);