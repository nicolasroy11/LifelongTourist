angular.module('app').controller('roomieCtrl', 
['$scope', '$http', 'Upload', '$rootScope', 'SessionSvc', '$sessionStorage',
function($scope, $http, Upload, $rootScope, SessionSvc, $sessionStorage)
	{

		//$log.info($location.path() + 'roomie 1');

		// The response is what the server.js put as a json formatted
		// response in the localhost:3000/contactList path
		// This controller is now passed that response and will
		// display it according to the html file's indications.

		// Database is refreshed in the view to reflect new changes
		var refresh = function()
		{
			console.log('refresh says: ');
			if ($sessionStorage.session)
			{
				var id = sessionStorage.getItem('userID');
				$http.get('/roomie/' + id).success(function(response)
				{
					$scope.person = response;
					console.log('roomieCtrl refresh: ' + JSON.stringify(response));
					$scope.matchFields = genMatchF();
				});
			}
			else
			{
				alert('User Id has not been stored. You may not be logged in.');
			}
		};

		refresh();

		// $scope.checked = false; // This will be binded using the ps-open attribute
  //       $scope.toggle = function()
  //       {
  //           $scope.checked = !$scope.checked
  //       }

		$scope.formattedP = function(person)
		{
			return person.profile.name;
		}

		// Update user's primary info
		$scope.updatePrimary = function()
		{
			var id = sessionStorage.getItem('userID');
			console.log('updatePrimary will PUT: ' + JSON.stringify($scope.person));
			$http.put('/roomiePrimary/' + id, $scope.person).success(function(response)
			{
				console.log('updatePrimary query returns:' + JSON.stringify(response));
				window.location.hash = "#match";
				refresh();
			});
		}
		
		// Update user's match / dealbreaker info
		$scope.updateMatch = function()
		{
			var id = sessionStorage.getItem('userID');
			// var hasRoom = sessionStorage.getItem('hasRoom');
			// console.log('hasRoom: ' + hasRoom);
			console.log('updateMatch will PUT: ' + $scope.person);
			$http.put('/roomieMatch/' + id, $scope.person).success(function(response)
			{
				console.log('updateMatch query returns:' + JSON.stringify(response));
				// if (hasRoom === '1')
				// {
					window.location.hash = "#roomPost";
				// }
				// else
				// {
				// 	window.location.hash = "#roomSearch";
				// }	
				
				refresh();
			});
		}


		// For a single file (image)
		$scope.submit = function()
		{
			var f = $scope.file;
			console.log(f);
	      	if (f)
	      	{
	        	$scope.upload(f);
	      	}
	    };

	    // For several files (images) at once
	    $scope.submitFiles = function()
		{
			var f = $scope.files
			console.log(f);
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
			console.log(message);
	    };

	    $scope.upload = function (file) 
	    {
		    Upload.imageDimensions(file).then(function(dimensions)
		    {
		    	console.log('width: ' + dimensions.width + ", " + "height: " + dimensions.height);
		    });

		 //    var rename = function(file)
		 //    {
			// 	// (?:         # begin non-capturing group
			// 	//   \.        #   a dot
			// 	//   (         #   begin capturing group (captures the actual extension)
			// 	//     [^.]+   #     anything except a dot, multiple times
			// 	//   )         #   end capturing group
			// 	// )?          # end non-capturing group, make it optional
			// 	// $           # anchor to the end of the string
			//     var re = /(?:\.([^.]+))?$/;				// regex
			//     //console.log(file);
			//     var ext = re.exec(file.$ngfName)[0];	// applies the regex to the file name and returns an array
			//     //console.log(ext);
			//     return $scope.person._id + ext;
			// }

			// Renaming the file using the id of the current user and the extension type of the upload
		 //    Upload.rename(file, (function()
		 //    {
			//     var re = /(?:\.([^.]+))?$/;				// Define the regex
			//     var ext = re.exec(file.$ngfName)[0];	// execute the regex on the uploaded file name to extract extension type
			//     return $scope.person._id + ext;
			// })(file));

	        var upload = Upload.upload(
	        {
	            url: '/upload',
	            data: {file: file, 'id': $scope.person._id},
	            method: 'POST',
	            arrayKey: '[i]'
	        });

	        upload.then(function (resp) 
	        {
	            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
	        }, 
	        function (resp) 
	        {
	            console.log('Error status: ' + resp.status);
	        }, 
	        function (evt) 
	        {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });

	        upload.xhr(function(xhr){
			  xhr.upload.addEventListener('click', function(){console.log('selecteeeeed')})
			});

    	};


    	// scope objects used to populate the roomie views
    	var weights =
    	[
			{value:'1', html:"don't care"},
			{value:'2', html:'somewhat important'},
			{value:'3', html:'deal breaker'},
		];
		// Make a quick 18-99 array
		var ageSel = (function(){ var a=[], b=82;while(b--) a[b] = {value: b+18, html: b+18}; return a;})();
		// view object 
		var parentClass = 'person.match.';
    	// $scope.matchFields =
    	genMatchF = function()
    	{
	    	a = 
	    	[
				{
	    			caption : "Do you mind couples?",
	    			fields : 
	    			[
	    				{
	    					model : $scope.person.match.couple.weight,
	    					class : 'col-sm-8',
	    					w : weights
	    				}
	    			]
	    		},

	    		{
	    			caption : "Have a gender preference?",
	    			fields : 
	    			[
	    				{
	    					model : $scope.person.match.gender.value, //parentClass + 'gender.value',
	    					class : 'col-sm-4',
	    					w :
	    					[
	    						{value:'F', html:'female'},
	    						{value:'M', html:'male'},
	    					]
	    				},
	    				{
	    					model : $scope.person.match.gender.weight, // parentClass + 'gender.weight',
	    					class : 'col-sm-4',
	    					w : weights
	    				}
	    			]
	    		},
	    		// {
	    		// 	caption : "Prefer an age range?",
	    		// 	fields : 
	    		// 	[
	    		// 		{
	    		// 			model : parentClass + 'ageRange.startAge',
		    	// 			class : 'col-sm-2',
		    	// 			w : ageSel
	    		// 		},
	    		// 		{
	    		// 			model : parentClass + 'ageRange.endAge',
	    		// 			class : 'col-sm-2',
		    	// 			w : ageSel
	    		// 		},
	    		// 		{
	    		// 			model : parentClass + 'ageRange.weight',
	    		// 			class : 'col-sm-4',
		    	// 			w : weights
	    		// 		}
	    		// 	]
	    		// },
	    		// {
	    		// 	caption : "Hours",
	    		// 	fields : 
	    		// 	[
	    		// 		{
	    		// 			model : parentClass + 'hours.value',
		    	// 			class : 'col-sm-4',
		    	// 			w : 
		    	// 			[
		    	// 				{value:'1', html:'9 to 5'},
	    		// 				{value:'2', html:'evenings'},
	    		// 				{value:'3', html:'graveyard'},
	    		// 				{value:'4', html:'mixed'},
	    		// 				{value:'5', html:'work from home'},
		    	// 			]
	    		// 		},
	    		// 		{
	    		// 			model : parentClass + 'hours.weight',
	    		// 			class : 'col-sm-4',
		    	// 			w : weights
	    		// 		}
	    		// 	]
	    		// },
	    		// {
	    		// 	caption : "Industry preference?",
	    		// 	fields : 
	    		// 	[
	    		// 		{
	    		// 			model : parentClass + 'industry.value',
		    	// 			class : 'col-sm-4',
		    	// 			w : 
		    	// 			[
		    	// 				{value:'1', html:'engineering'},
	    		// 				{value:'2', html:'food service'},
	    		// 				{value:'3', html:'automotive'},
	    		// 				{value:'4', html:'medicine'},
	    		// 				{value:'5', html:'drug traffic'},
		    	// 			]
	    		// 		},
	    		// 		{
	    		// 			model : parentClass + 'industry.weight',
	    		// 			class : 'col-sm-4',
		    	// 			w : weights
	    		// 		}
	    		// 	]
	    		// },
			];
			return a;
		}

		// console.log(JSON.stringify($scope.matchFields[0]));

    	// Test login - not using passport
		// $scope.login = function()
		// {
		// 	console.log('$scope.person is now: ' + JSON.stringify($scope.person));
		// 	console.log('login will POST: ' + JSON.stringify($scope.person.meta));
		// 	$http.post('/roomielogin', $scope.person.meta).success(function(response)
		// 	{
		// 		console.log('data returned: ' + response);
		// 		sessionStorage.setItem('userID', response);
		// 		console.log('sessionStorage so far: ' + JSON.stringify(window.sessionStorage));
		// 		refresh();
		// 		$scope.imgURL = '/img/' + sessionStorage.getItem('userID') + '/' + sessionStorage.getItem('userID');
		// 		window.location.hash = "#primary";
		// 	});
		// }

		// Test logout - not using passport
		// $scope.logout = function()
		// {
		// 	console.log('from logout POST: ');
		// 	sessionStorage.clear();
		// 	sessionStorage =  null;
		// 	$scope.person = '';
		// 	console.log('sessionStorage is now: ' + JSON.stringify(window.sessionStorage));
		// 	console.log('$scope.person is now: ' + JSON.stringify($scope.person));
		// }

	}]);