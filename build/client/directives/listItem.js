angular
.module('app')
.directive('listItem', function()
{
  return {
    restrict: 'AE',
    templateUrl: 'directives/listItem.html',
    replace: true,
    scope:
    {
    	var1: "@",
    	var2: '@',
      var3: '=',
      func1: '&',
      func2: '&'
    },
    transclude: true,
    link: function(scope, elem, attrs)
    {
  		void 0;
      void 0;
  		void 0;
      void 0;
    }
  };
});