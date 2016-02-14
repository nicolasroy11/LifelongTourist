angular.module('roomem').controller('greetingBannerCtrl', 
['$scope', '$rootScope',  '$sessionStorage', function($scope, $rootScope, $sessionStorage)
{

	$scope.check = function()
	{
		if($sessionStorage.session)
		{
			$scope.name = $sessionStorage.user.profile.name === 'name pending' ? 'new user' : $sessionStorage.user.profile.name;
			return true;
		}
		else
		{
			$scope.name = '';
			return false;
		}
	};

}]);