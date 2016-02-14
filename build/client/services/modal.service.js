angular.module('app').service('ModalSvc', ['$uibModal', '$log', '$location',
function($uibModal, $log, $location)
{
	this.open = function(size, authMethod)
	{
	    var modalInstance = $uibModal.open(
	    {
		    animation: true,
		    templateUrl: '../views/' + authMethod + '.ejs',
		    controller: 'roomieCtrl',
		    size: size,
    	});

		modalInstance.result.then(function ()
		{
		},
		function()
		{
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
}]);