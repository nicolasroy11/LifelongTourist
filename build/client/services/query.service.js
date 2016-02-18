angular.module('app').factory('QuerySvc',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) 
  {
    var user = null;

    return (
    {
		get: get,
		put : put,
		genericGet: genericGet,
		post: post,
		push: push,
		populate: populate,
		getArray: getArray
    });

function getURL(args)
{
	void 0;
	void 0;
	var url = '';
	var defer = $q.defer();
	switch(args.method.toLowerCase())
	{
		case 'get':
			(args.hasOwnProperty('path'))&&(url += '/'+args.path);
			(args.hasOwnProperty('model'))&&(url += '/'+args.model);
			(args.hasOwnProperty('populate'))&&(url += '?populate='+args.populate);
			if(args.hasOwnProperty('filter'))
			{
				var i = 1,
					length = Object.keys(args.filter).length;
				url += (args.hasOwnProperty('populate'))? '&' : '?';
				for (var key in args.filter)
				{
					if (args.filter.hasOwnProperty(key))
					{
						url += key + "=" + args.filter[key];
						(i!==length) && (url += '&');
						i++;
					}
				}
			}
			defer.resolve(encodeURI(url));
			void 0;
			return defer.promise;
			break;

		case 'put':
			(args.hasOwnProperty('path'))&&(url += '/'+args.path);
			(args.hasOwnProperty('model'))&&(url += '/'+args.model);
			defer.resolve(encodeURI(url));
			void 0;
			return defer.promise;
			break;

		case 'delete':
			break;
	}
}

function get(args)
{
	var url = getURL(args).$$state.value;
	var defer = $q.defer();
	$http.get(url)
	.then(function(data)
	{
		defer.resolve(data.data);
	});

	return defer.promise;
}

function put(args)
{
	var defer = $q.defer();
	var url = '';
	(args.hasOwnProperty('path'))&&(url += '/'+args.path);
	(args.hasOwnProperty('model'))&&(url += '/'+args.model);
	$http.put(url, args)
	.then(function(res)
	{
		defer.resolve(res.data);
	})
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

function push(model, id, args)
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
		pushData = {'model': model, 'data': args}
		path = path + id;
		$http.put(path, pushData)
		.then(function(res)
		{
			defer.resolve(res.data);
		})
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

