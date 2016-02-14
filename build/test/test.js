describe('Room\'em', function()
{
	beforeEach(module("roomem"));
	describe('authCtrl', function()
	{
		beforeEach(inject(function(_$controller_)
		{
		    var $controller = _$controller_;
		}));

		// it('should be equal to two', function()
		// {
		// 	var $scope = {};
		// 	controller = $controller('authCtrl', {$scope: $scope});
		// 	add3 = $scope.add3;
		// 	expect(add3(3)).toBe(6);
		// });

		it('be equal to two', function()
		{
			var $scope = {};
			var controller = $controller('authCtrl', {$scope: $scope});
			add2 = $scope.add2;
			expect(add2(3)).toBe(5);
		});
	});
});

// describe('filters', function()
// {
// 	beforeEach(module("MyApp"));
	

// 	it('Should be true', function()
// 	{
// 		expect(true).toBeTruthy();
// 	});

// 	describe('reverse', function()
// 	{
// 		var reverse;
// 		beforeEach(inject(function($filter)
// 		{
// 			reverse = $filter('reverse', {});
// 		}));

// 		it('should reverse a string', function()
// 		{
// 			expect(reverse('nick')).toBe('kcin');
// 			expect(reverse('kcin')).toBe('nick');
// 		});
// 	});

// 	describe('testCtrl', function()
// 	{
// 		beforeEach(inject(function(_$controller_)
// 		{
// 		    // The injector unwraps the underscores (_) from around the parameter names when matching
// 		    $controller = _$controller_;
// 		  }));

// 		it('be equal to two', function()
// 		{
// 			var $scope = {};
// 			var controller = $controller('testCtrl', {$scope: $scope});
// 			innerVal = $scope.innerVal;
// 			add2 = $scope.add2;
// 			expect(innerVal + 2).toBe(4);
// 			expect(add2(3)).toBe(5);
// 		});
// 	});

// });