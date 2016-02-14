var mongoose = require('mongoose'),
	Thread = require('../models/thread.server.model');

module.exports = function(app, io)
{
	app.get('/messageList', function(req,res)
	{
		void 0;
		Thread.find(function(err, messages) {
		if (err) return void 0;
		res.json(messages);
		});
	});

	app.get('/thread/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Thread.where({ _id: id });
		void 0;
		query.findOne(function(err, message)
		{
			if (err) return void 0;
			if (message)
			{
				res.json(message);
			}
			else
			{
				void 0;
			}
		});
	});

	app.post('/message', function(req,res)
	{
		var thread = new Thread(req.body);

		thread.save(function(err, message) 
		{
		  if (err) return void 0;
		  void 0;
		  res.json(message);
		});
	});

	app.put('/threadUpdate/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Thread.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},

			req.body,
			{ new: true },

			function(err, doc)
			{
				if(err)
				{
			        void 0;
			    }
				res.json(doc);
			});
	});

	app.put('/messagePush/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Thread.findByIdAndUpdate(
			id,

			{$push: req.body},
			{ new: true },

			function(err, doc)
			{
				if(err)
				{
			        void 0;
			    }
				res.json(doc);
				io.sockets.emit('msg', doc);
			});
	});

	app.get('/thread/getArray/:ids', function(req,res)
	{
		var ids = req.params.ids;
		void 0;
		Thread.find(
		{
    		'_id': { $in: ids}
		},
		function(err, doc)
		{
		     res.json(doc);
		});
	});

	app.delete('/thread/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Thread.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			res.json(doc);
		});
	});

}
