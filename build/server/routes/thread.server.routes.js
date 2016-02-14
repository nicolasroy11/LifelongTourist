// This file is the routes the user will be interacting with directly when entering/modifying roomie info
var mongoose = require('mongoose'),
	Thread = require('../models/thread.server.model');

module.exports = function(app, io)
{
	app.get('/messageList', function(req,res)
	{
		console.log("in message list query!");
		Thread.find(function(err, messages) {
		if (err) return console.error(err);
		// console.log(messages);
		res.json(messages);
		});
	});

	app.get('/thread/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Thread.where({ _id: id });
		console.log("Got a GET request!");
		query.findOne(function(err, message)
		{
			if (err) return console.error(err);
			if (message)
			{
				res.json(message);
				// console.log(message);
			}
			else
			{
				console.log("Query for id " + id + " returned an empty object.");
			}
		});
	});

	app.post('/message', function(req,res)
	{
		var thread = new Thread(req.body);

		thread.save(function(err, message) 
		{
		  if (err) return console.error(err);
		  console.log('This is the id: ' + message._id);
		  res.json(message);
		});
	});

	app.put('/threadUpdate/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In roomie update.");
		// console.log("This is req.body: " + JSON.stringify(req.body));	//req.body
		Thread.findOneAndUpdate(
			// What we're lookign for
			{_id: mongoose.Types.ObjectId(id)},

			// object,
			req.body,
			{ new: true },

			// What we do once we've done our modifications
			function(err, doc)
			{
				if(err)
				{
			        console.log(err);
			    }
				res.json(doc);
				// console.log(doc);
			});
	});

	app.put('/messagePush/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In messagePush with " + id);
		// console.log("This is req.body: " + JSON.stringify(req.body));
		Thread.findByIdAndUpdate(
			// What we're lookign for
			id,

			{$push: req.body},
			// req.body,
			{ new: true },

			// What we do once we've done our modifications
			function(err, doc)
			{
				if(err)
				{
			        console.log(err);
			    }
				res.json(doc);
				io.sockets.emit('msg', doc);
				// console.log(doc);
			});
	});

	app.get('/thread/getArray/:ids', function(req,res)
	{
		// This will get the value of the id from the url
		var ids = req.params.ids;
		console.log("In get array with " + ids);
		// console.log("This is req.body: " + JSON.stringify(req.body));
		Thread.find(
		{
    		'_id': { $in: ids}
		},
		function(err, doc)
		{
		     // console.log(doc);
		     res.json(doc);
		});
	});

	app.delete('/thread/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log(id);
		Thread.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			// same as in post
			res.json(doc);
		});
	});

}
