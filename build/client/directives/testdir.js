angular.module('roomem').directive('testDir', function()
{
  return {
    restrict: 'AECM',
    templateUrl: 'directives/testdir.html',
    replace: true,
    scope:
    {
    	var1: "@",
    	var2: '=',
    	formattedPerson: '&'
    },
    transclude: true,

  };
});