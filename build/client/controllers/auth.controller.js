angular.module('app')
.controller('authCtrl', 
['$http', '$scope', '$uibModal', '$log', '$location', 'SessionSvc', '$sessionStorage', '$state',
function($http, $scope, $uibModal, $log, $location, SessionSvc, $sessionStorage, $state)
{
	$scope.animationsEnabled = true;
	$scope.show = false;
	var open = function(size, authMethod)
	{
	    var modalInstance = $uibModal.open(
	    {
		    animation: $scope.animationsEnabled,
		    templateUrl: '../views/' + authMethod + '.html',
		    controller: 'ModalInstanceCtrl',
		    size: size,
		    backdrop: true,
		    keyboard: true
    	});

		modalInstance.result.then(function (selectedItem)
		{
			$scope.selected = selectedItem;
			void 0;
		},
		function()
		{
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.add3 = function(val)
	{
		return val + 3;
	}

	$scope.signupButton = function()
	{
		open('md', 'register');
	}

	$scope.signinButton = function()
	{
		open('md', 'login');
	}

	$scope.signoutButton = function()
	{
		$http.get('/signout').then(function(response)
		{
			void 0;
			SessionSvc.invalidate();
			void 0;
		});
	}

	$scope.check = function()
	{
		if($sessionStorage.session)
		{	
			$scope.name = $sessionStorage.user.profile.name === 'name pending' ? 'new user' : $sessionStorage.user.profile.name;
			return true;
		}
		else
		{
			$scope.name = '';
			return false;
		}
	};

  	$scope.toggleAnimation = function()
  	{
    	$scope.animationsEnabled = !$scope.animationsEnabled;
	};
}]);



angular.module('app').controller('ModalInstanceCtrl', 
	['$location', '$http', '$scope', '$uibModalInstance', 'SessionSvc', '$state',
	function($location, $http, $scope, $uibModalInstance, SessionSvc, $state)
	{


	$scope.cancel = function()
	{
		$uibModalInstance.dismiss('cancel');
	};

	$scope.signup = function()
	{
		void 0;
		$http.post('/signup', $scope.person)
		.then(function(response)
		{
			if (response.data.success === false)
			{
				$scope.error = true;
				$scope.errorMessage = response.data.message;
			}
			else
			{
				$scope.error = false;
				$uibModalInstance.close($scope.person);
				SessionSvc.validate(response.data);
				$state.go('home.tourist.profile');
			}
			void 0;
		});
	}

	$scope.signin = function()
	{
		void 0;
		$http.post('/signin', $scope.person).then(function(response)
		{
			if (response.data.success === false)
			{
				$scope.error = true;	
				$scope.errorMessage = response.data.message;
				void 0;
			}
			else
			{
				$scope.error = false;
				$uibModalInstance.close($scope.person);
				SessionSvc.validate(response.data);
				void 0;
				void 0;
				window.location.href = '/#/primary';
			}
		});
	}

  }]);