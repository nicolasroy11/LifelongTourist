angular.module('MyApp',[])
.filter('reverse', [function()
{
	return function(string)
	{
		return string.split('').reverse().join('');
	}
}])
.controller('testCtrl', ['$scope', '$rootScope', function($scope, $rootScope)
{
	$scope.innerVal = 2;
	$scope.add2 = function(val)
	{
		return val + 2;
	}
}]);