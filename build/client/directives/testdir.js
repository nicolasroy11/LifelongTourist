angular.module('app').directive('testDir', function()
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
  //   link: function(scope, elem, attrs)
  //   {
		// console.log('Linking...');
		// console.log(elem);
		// if(scope.var1 === '56767860c35bee1203a9ae20')
		// {
		// 	elem.removeAttr('class');
		// }
		// console.log(scope);
  //   }

  };
});