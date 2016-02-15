angular.module('app').factory('QuerySvc',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) 
  {
    var user = null;

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

	void 0

	$http.get(path)
	.success(function(data)
	{
		user = false;
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
	var array;
	if( Object.prototype.toString.call(id) === '[object Array]' )
	{
    	array = true;
	}
	var defer = $q.defer();
	var path = '/push/';
	if (!array)
	{
		pushData = {'model': type, 'data': args}
		path = path + id;
		$http.put(path, pushData)
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
		void 0;
		args = {'id': id, "args" : args};
		void 0;
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

	void 0;
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

	return defer.promise;
}

}]);

