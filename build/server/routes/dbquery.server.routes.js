// This file is the routes used by admin to verify proper roomie collections operations
var mongoose = require('mongoose');
// Tourist = require('../models/tourist.server.model');
// Trip = require('../models/trip.server.model');
// Thread = require('../models/thread.server.model');

module.exports = function(app)
{

	app.get('/list/:item', function(req,res)
	{
		console.log("Got a GET request in list: ");
		console.log(req.params);
		var _item = require('../models/' + req.params.item + '.server.model');


		_item.find(function(err, i)
		{
			if (err) return console.error(i);
			console.log(i);
			res.json(i);
		});
	});

	app.post('/list', function(req,res)
	{
		console.log('post request in /list: ');
		console.log(req.body);
		item = req.body.item;
		var _item = require('../models/' + item + '.server.model');
		var model = new _item(req.body.data);
		console.log("model is: " + model);
		model.save(function(err, i)
		{
		  if (err) return console.error(err);
		  console.log('This is the tourist id: ' + i._id);
		  res.json(i);
		});
	});

	app.delete('/list/:item/:id', function(req,res)
	{
		var id = req.params.id;
		console.log("Got a GET request in list: ");
		console.log(id);
		var _item = require('../models/' + req.params.item + '.server.model');
		_item.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			res.json(doc);
		});
	});

	// edit
	app.get('/list/:item/:id', function(req,res)
	{
		var id = req.params.id;
		var _item = require('../models/' + req.params.item + '.server.model');
		console.log("Got an edit request for: ");
		console.log(id);
		_item.findOne({_id: mongoose.Types.ObjectId(id)}, 
		function(err, doc)
		{
		  if (err) return console.error(err);
		  console.log(doc);
		  res.json(doc);
		});
	});

	
	app.post('/list', function(req,res)
	{
		var item = new Roomie(req.body);
		var _item = require('../models/' + req.params.item + '.server.model');
		item.save(function(err, doc) 
		{
		  if (err) return console.error(err);
		  console.log('This is the id: ' + doc._id);
		  res.json(doc);
		});
	});

	// update
	app.put('/roomieList/:item/:id', function(req,res)
	{
		var id = req.params.id;
		var _item = require('../models/' + req.params.item + '.server.model');
		_item.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},
			{
				$set:
				{
					// key needs quotes if nested
					// username: req.body.username,// "number.cell": req.body.number.cell
					// snumber: {home:"12345", cell:"56789"}
					meta: req.body.meta,
					primary: req.body.primary,
					profile: req.body.profile,
					match: req.body.match
				}
			},

			// What we do once we've done our modifications
			function(err, doc)
			{
				res.json(doc);
				console.log(doc);
			});
		console.log("route reaches server side");	//req.body
	});

}
