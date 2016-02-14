var mongoose = require('mongoose');
Room = require('../models/room.server.model');

module.exports = function(app)
{

	app.get('/room/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Room.where({ _id: id });
		void 0;
		query.findOne().populate('roomie').exec(function(err, room) 
		{
			if (err) return void 0;
			res.json(room);
			void 0;
		});
	});

	app.post('/room', function(req,res)
	{
			var room = new Room(req.body);
			var userID = req.body.meta.listerID;
			void 0;

			room.save(function(err, room) {
			  if (err) return void 0;
			  void 0;
			  res.json(room);
			});
	});

	app.get('/room/populate/:field/:id', function(req,res)
	{
		var id = req.params.id;
		var field = req.params.field;
		var query  = Room.where({ _id: id });
		query
		.findOne()
		.populate(field, 'primary')	
		.exec(function(err, room) 
		{
			if (err) return void 0;
			res.json(room);
			void 0;
		});

	});


	app.put('/roomUpdate/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		void 0;	
		Roomie.findOneAndUpdate(

			{_id: mongoose.Types.ObjectId(id)},

			req.body,
			{ upsert: true, new: true },

			function(err, doc)
			{
				if(err)
				{
			        void 0;
			    }
				res.json(doc);
				void 0;
			});
	});

	app.put('/roomMatch/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		void 0;	

				Room.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},

			{
				$set: 	
				{
					match: req.body.match
				}
			},

			function(err, doc)
			{
				res.json(doc);
				void 0;
			});
	});

	app.get('/roomSearch/:n', function(req,res)
	{
		var n = req.params.n;
		void 0;
		var q = Room.where(
			{
				'profile.neighborhood' : n,
			});
		q.find()
		.populate('roomie')
		.populate('meta.listerID')
		.exec(function(err, rooms) 
		{
			if (err) return void 0;
		 	void 0;
			res.json(rooms);

					});
	});

}