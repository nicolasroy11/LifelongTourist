var mongoose = require('mongoose');
Room = require('../models/room.server.model');

module.exports = function(app)
{

	app.get('/roomList', function(req,res)
	{
		void 0;
		Room.find(function(err, room) {
		if (err) return void 0;
		res.json(room);
		});
	});

	app.delete('/roomList/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Room.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			res.json(doc);
		});
	});

	app.post('/roomList', function(req,res)
	{
		var room = new Room(req.body);
		var userID = req.body.meta.listerID;
		void 0;
		void 0;
		room.save(function(err, room)
		{
		  if (err) return void 0;
		  void 0;
		  res.json(room);
		});
	});

	app.get('/roomList/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Room.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, doc) {
		  if (err) return void 0;
		  void 0;
		  res.json(doc);
		});
	});

	app.put('/roomList/:id', function(req,res)
	{
		var id = req.params.id;
		Room.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},

			{
				$set: 	
				{
					meta: req.body.meta,
					inclusions: req.body.inclusions,
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
