angular.module('roomem').directive('matchDir', function()
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
        void 0;
        void 0;

    },
    transclude: true,
  };
});
