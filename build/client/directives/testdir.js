angular.module('app').directive('testDir', function()
{
  return {
    restrict: 'AECM',
    templateUrl: 'directives/testdir.html',
    replace: true,
    scope:
    {
    	var1: "@",
    	var2: '@',
      funct1: '&',
      funct2: '&',
    	formattedPerson: '&'
    },
    transclude: true,
    link: function(scope, elem, attrs)
    {
		void 0;
		void 0;
		scope.var1 = '56767860c35bee1203a9ae20';
    void 0;
		void 0;
    }

  };
});