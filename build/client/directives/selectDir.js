angular.module('app').directive('matchDir', function()
{
  return {
    restrict: 'AECM',
    templateUrl: 'directives/selectDir.html',
    replace: true,
    scope:
    {
    	match: '=',
    },
    link: function(scope, elem, attrs)
    {
        console.log('Linking...');
        console.log(elem);

    },
    transclude: true,
  };
});
