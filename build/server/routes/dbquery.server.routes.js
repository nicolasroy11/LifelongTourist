var mongoose = require('mongoose');

module.exports = function(app)
{

	app.get('/list/:item', function(req,res)
	{
		void 0;
		void 0;
		var _item = require('../models/' + req.params.item + '.server.model');


		_item.find(function(err, i)
		{
			if (err) return void 0;
			void 0;
			res.json(i);
		});
	});

	app.post('/list', function(req,res)
	{
		void 0;
		void 0;
		item = req.body.item;
		var _item = require('../models/' + item + '.server.model');
		var model = new _item(req.body.data);
		void 0;
		model.save(function(err, i)
		{
		  if (err) return void 0;
		  void 0;
		  res.json(i);
		});
	});

	app.delete('/list/:item/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		void 0;
		var _item = require('../models/' + req.params.item + '.server.model');
		_item.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			res.json(doc);
		});
	});

	app.get('/list/:item/:id', function(req,res)
	{
		var id = req.params.id;
		var _item = require('../models/' + req.params.item + '.server.model');
		void 0;
		void 0;
		void 0;
		_item.findOne({_id: mongoose.Types.ObjectId(id)}, 
		function(err, doc)
		{
		  if (err) return void 0;
		  void 0;
		  res.json(doc);
		});
	});


		app.post('/list', function(req,res)
	{
		var item = new Roomie(req.body);
		var _item = require('../models/' + req.params.item + '.server.model');
		item.save(function(err, doc) 
		{
		  if (err) return void 0;
		  void 0;
		  res.json(doc);
		});
	});

	app.put('/roomieList/:item/:id', function(req,res)
	{
		var id = req.params.id;
		var _item = require('../models/' + req.params.item + '.server.model');
		_item.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},
			{
				$set:
				{
					meta: req.body.meta,
					primary: req.body.primary,
					profile: req.body.profile,
					match: req.body.match
				}
			},

			function(err, doc)
			{
				res.json(doc);
				void 0;
			});
		void 0;	
	});

}
