// This controller handles pre-modal-opening functions. They are used to call the modal
angular.module('app')
.controller('authCtrl', 
['$http', '$scope', '$uibModal', '$log', '$location', 'SessionSvc', '$sessionStorage',
function($http, $scope, $uibModal, $log, $location, SessionSvc, $sessionStorage)
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
			console.log('modalInstance $scope.person: ' + JSON.stringify($scope.selected));
		},
		function()
		{
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	// For testing purposes
	$scope.add3 = function(val)
	{
		return val + 3;
	}

	$scope.signupButton = function()
	{
		open('md', 'register');
	}

	// When user hits "log in" button
	$scope.signinButton = function()
	{
		open('md', 'login');
	}

	// When user hits "log out" button
	$scope.signoutButton = function()
	{
		$http.get('/signout').then(function(response)
		{
			console.log('signout success!');
			SessionSvc.invalidate();
			console.log('session valid: ' + $sessionStorage.session);
		});
	}

	// if ($location.$$path === '/')
	// {
	// 	open('lg', 'register');
	// }
	$scope.check = function()
	{
		if($sessionStorage.session)
		{	
			$scope.name = $sessionStorage.user.profile.name === 'name pending' ? 'new user' : $sessionStorage.user.profile.name;
			// console.log("auth controller (session = true): " + $scope.name);
			return true;
		}
		else
		{
			$scope.name = '';
			// console.log("auth controller (session = false): " + $scope.name);
			return false;
		}
	};

  	$scope.toggleAnimation = function()
  	{
    	$scope.animationsEnabled = !$scope.animationsEnabled;
	};
}]);



// This controller handles post-modal functions that are called inside the open modal
angular.module('app').controller('ModalInstanceCtrl', 
	['$location', '$http', '$scope', '$uibModalInstance', 'SessionSvc',
	function($location, $http, $scope, $uibModalInstance, SessionSvc)
	{

	// $scope.ok = function () {
	//   $uibModalInstance.close($scope.person);
	// };

	$scope.cancel = function()
	{
		$uibModalInstance.dismiss('cancel');
	};

	// User's signup method
	$scope.signup = function()
	{
		console.log('hit signup button');
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
				window.location.href = '/#/primary';
			}
			console.log('signup: response.data: ' + JSON.stringify(response.data));
		});
	}

	// User's sign in method
	$scope.signin = function()
	{
		console.log('hit signin button with' + JSON.stringify($scope.person));
		$http.post('/signin', $scope.person).then(function(response)
		{
			// If there is an error
			if (response.data.success === false)
			{
				$scope.error = true;	// This flag used to make error warning visible
				$scope.errorMessage = response.data.message;
				console.log('signin: response.data: ' + JSON.stringify(response.data));
			}
			// IF it all worked out
			else
			{
				$scope.error = false;
				$uibModalInstance.close($scope.person);
				SessionSvc.validate(response.data);
				console.log('session valid: ' + SessionSvc.valid);
				console.log('signin: session user id: ' + JSON.stringify(SessionSvc.userID));
				window.location.href = '/#/primary';
			}
		});
	}

  }]);