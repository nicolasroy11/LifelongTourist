angular.module('app').controller('touristCtrl', 
['$scope', '$http', 'Upload', '$rootScope', 'SessionSvc', '$sessionStorage', 'QuerySvc',
function($scope, $http, Upload, $rootScope, SessionSvc, $sessionStorage, QuerySvc)
	{
		var model = 'tourist';
		var id = $sessionStorage.user._id;
		var refresh = function()
		{
			void 0;
			if ($sessionStorage.session)
			{
				var args = 
				{
					'method': 'GET',
					'path': 'db',
					'model': 'tourist',
					'filter': {
								'_id': id,
								'select': '-password -salt -__v',
							},
					'populate': 'trips',
				};
				QuerySvc.get(args)
				.then(function(res)
				{
					$scope.person = res.data;
					$sessionStorage.user = res.data;
					void 0;
					void 0;
				})
			}
			else
			{
				void 0;
			}
		};

		refresh();


		$scope.formattedP = function(person)
		{
			return person.profile.name;
		}

		$scope.updatePrimary = function()
		{
			var args = 
			{
				'method': 'PUT',
				'update': {'profile': $scope.person.profile},
				'path': 'db',
				'model': model,
				'filter': {
							'_id': id,
						},
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				void 0;
				void 0;
				refresh();
			})
		}


		var test_ids = '[56c13c2ba717b631609497f0, 56c3c25eaad201ed68f52201]';
		$scope.getTest = function()
		{
			var args = 
			{
				'method': 'GET',
				'path': 'db',
				'model': 'tourist',
				'filter': {
							'_id': $sessionStorage.user._id,
							'select': '-password -salt -__v',
						},
				'populate': 'trips threads',
			};
			QuerySvc.get(args)
			.then(function(res)
			{
				void 0;
				void 0;
			})
		}

		$scope.putTest = function()
		{
			var args = 
			{
				'method': 'PUT',
				'push': {'testArray': {'$each': ['y', 'a']}},
				'path': 'db',
				'model': 'tourist',
				'filter': {
						},
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				void 0;
				void 0;
			})
		}

		$scope.postTest = function()
		{
			var args = 
			{
				'method': 'POST',
				'path': 'db',
				'model': 'tourist',
				'data': $scope.person,
				'then': {
							'model': 'tourist',
							'field': 'testArray',
							'action': 'push',
							'arg': 'testPush'
				}
			};
			QuerySvc.post(args)
			.then(function(res)
			{
				void 0;
				void 0;
			})
		}

		$scope.remove = function(id)
		{
			var args = 
			{
				'method': 'delete',
				'path': 'db',
				'model': 'tourist',
				'filter': {
							'_id': id,
						},
				'then': {
							'model': 'tourist',
							'field': 'testArray',
							'action': 'push',
							'arg': 'testPush'
						}
			};
			QuerySvc.put(args)
			.then(function(res)
			{
				void 0;
				void 0;
				refresh();
			});
		}


		$scope.submit = function()
		{
			var f = $scope.file;
			void 0;
	      	if (f)
	      	{
	        	$scope.upload(f);
	      	}
	    };

	    $scope.submitFiles = function()
		{
			var f = $scope.files
			void 0;
	      	if (f && f.length)
	      	{
	      		for (var i = 0; i < f.length; i++)
	      		{
	        		$scope.upload(f[i]);
	        	}
	      	}
	    };

	    $scope.test = function(message)
		{
			void 0;
	    };

	    $scope.upload = function (file) 
	    {
		    Upload.imageDimensions(file).then(function(dimensions)
		    {
		    	void 0;
		    });



	        var upload = Upload.upload(
	        {
	            url: '/upload',
	            data: {file: file, 'id': $scope.person._id},
	            method: 'POST',
	            arrayKey: '[i]'
	        });

	        upload.then(function (resp) 
	        {
	            void 0;
	        }, 
	        function (resp) 
	        {
	            void 0;
	        }, 
	        function (evt) 
	        {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            void 0;
	        });

	        upload.xhr(function(xhr){
			  xhr.upload.addEventListener('click', function(){void 0})
			});
    	};

		var ageSel = (function(){ var a=[], b=82;while(b--) a[b] = {value: b+18, html: b+18}; return a;})();

	}]);