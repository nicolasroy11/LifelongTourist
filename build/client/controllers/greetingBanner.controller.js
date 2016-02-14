angular.module('app').controller('greetingBannerCtrl', 
['$scope', '$rootScope',  '$sessionStorage', function($scope, $rootScope, $sessionStorage)
{
	// $scope.session = {valid: sessionStorage.session};

	$scope.check = function()
	{
		if($sessionStorage.session)
		{
			$scope.name = $sessionStorage.user.profile.name === 'name pending' ? 'new user' : $sessionStorage.user.profile.name;
			// console.log("greeting Banner (session = true): " + $scope.name);
			return true;
		}
		else
		{
			$scope.name = '';
			// console.log("greeting Banner (session = false): " + $scope.name);
			return false;
		}
	};

	// console.log("greeting Banner (valid): " + $scope.session.valid);
}]);