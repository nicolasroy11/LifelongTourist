// This service takes a unique DB ID and returns the whole object
angular.module('app').factory('QuerySvc',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) 
  {
    // create user variable used as a boolean to indicate log status
    var user = null;

    // return available functions for use in controllers
    return ({
      get: get,
      genericGet: genericGet,
      post: post,
      push: push,
      populate: populate,
      getArray: getArray
    });


function get(type, id)
{
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomie/' + id;
	}
	else if(type === "room")
	{
		path = '/room/' + id;
	}
	else if(type === "thread")
	{
		path = '/thread/' + id;
	}

	$http.get(path)
	.success(function(data)
	{
		user = false;
		// resolve means to EITHER succeed or fail
		defer.resolve(data);
	})
	.error(function()
	{
		user = false;
		defer.reject();
	});

	return defer.promise;
}

function genericGet(type, params)
{
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomie/' + params;
	}
	else if(type === "room")
	{
		path = '/roomSearch/' + params;
	}
	else if(type === "thread")
	{
		path = '/thread/' + params;
	}

	console.log('In generic get')

	$http.get(path)
	.success(function(data)
	{
		user = false;
		// resolve means to EITHER succeed or fail
		defer.resolve(data);
	})
	.error(function()
	{
		user = false;
		defer.reject();
	});

	return defer.promise;
}

function post(type, object)
{
	// Create a new instance of deferred
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomie/';
	}
	else if(type === "room")
	{
		path = '/room/';
	}
	else if(type === "message")
	{
		path = '/message/';
	}

	$http.post(path, object)
	.success(function(data)
	{
		user = false;
		// resolve means to EITHER succeed or fail
		defer.resolve(data);
	})
	.error(function()
	{
		user = false;
		defer.reject();
	});

	return defer.promise;
}

function push(type, id, args)
{
	// We are checking for an array so that a different route
	// is taken and things are handled differently, namely
	// the id array is part of the argument rather than the url
	var array;
	if( Object.prototype.toString.call( id) === '[object Array]' )
	{
    	array = true;
	}
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomiePush/';
	}
	else if(type === "room")
	{
		path = '/roomPush/';
	}
	else if(type === "thread")
	{
		path = '/messagePush/';
	}
	if (!array)
	{
		path = path + id;
		$http.put(path, args)
		.success(function(data)
		{
			defer.resolve(data);
		})
		.error(function()
		{
			user = false;
			defer.reject();
		});
	}
	else
	{
		alert( JSON.stringify(args));
		args = {'id': id, "args" : args};
		alert( JSON.stringify(args));
		$http.put(path, args)
		.success(function(data)
		{
			defer.resolve(data);
		})
		.error(function()
		{
			user = false;
			defer.reject();
		});
	}
	

	return defer.promise;
}

function populate(type, id, args)
{
	// Create a new instance of deferred
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomie/populate/' + args + '/' + id;
	}
	else if(type === "room")
	{
		path = '/room/populate/' + args + '/' + id;
	}
	else if(type === "message")
	{
		path = '/message/populate/' + args + '/' + id;
	}

	$http.get(path)
	.success(function(data)
	{
		defer.resolve(data);
	})
	.error(function()
	{
		defer.reject();
	});

	return defer.promise;
}

function getArray(type, ids)
{
	// Create a new instance of deferred
	var defer = $q.defer();
	var path;
	if(type === "roomie")
	{
		path = '/roomie/getArray/';
	}
	else if(type === "room")
	{
		path = '/room/getArray/';
	}
	else if(type === "thread")
	{
		path = '/thread/getArray';
	}

	alert( JSON.stringify(path));
	$http.get
	({
	  method: 'GET',
	  url: path,
	  params: {'ids': ids.toString()}
	})
	.then(function successCallback(response)
	{
	    defer.resolve(data);
	}, 
	function errorCallback(response)
	{
		defer.reject();
	});
	// .success(function(data)
	// {
	// 	defer.resolve(data);
	// })
	// .error(function()
	// {
	// 	defer.reject();
	// });

	return defer.promise;
}

}]);

