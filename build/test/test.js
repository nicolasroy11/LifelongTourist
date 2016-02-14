describe('Room\'em', function()
{
	beforeEach(module("roomem"));
	describe('authCtrl', function()
	{
		beforeEach(inject(function(_$controller_)
		{
		    var $controller = _$controller_;
		}));


		it('be equal to two', function()
		{
			var $scope = {};
			var controller = $controller('authCtrl', {$scope: $scope});
			add2 = $scope.add2;
			expect(add2(3)).toBe(5);
		});
	});
});








