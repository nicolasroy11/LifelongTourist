// This file is the routes the user will be interacting with directly when entering/modifying room info
var mongoose = require('mongoose');
Room = require('../models/room.server.model');

module.exports = function(app)
{

	app.get('/room/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Room.where({ _id: id });
		console.log("Got a GET request!");
		// an error arg and docs, meaning the 
		// db will respond with a document.
		query.findOne().populate('roomie').exec(function(err, room) 
		{
			if (err) return console.error(err);
			res.json(room);
			console.log(room);
		});
	});

	app.post('/room', function(req,res)
	{
			var room = new Room(req.body);
			var userID = req.body.meta.listerID;
			console.log("userID is: " + userID);

			room.save(function(err, room) {
			  if (err) return console.error(err);
			  console.log('This is the room id: ' + room._id);
			  res.json(room);
			});
	});

	// gets a document and populates wtv :field is with DBRef
	app.get('/room/populate/:field/:id', function(req,res)
	{
		var id = req.params.id;
		var field = req.params.field;
		var query  = Room.where({ _id: id });
		query
		.findOne()
		.populate(field, 'primary')	// field(s) to populate, return only primary info of the document
		.exec(function(err, room) 
		{
			if (err) return console.error(err);
			res.json(room);
			console.log(room);
		});

	});

	// app.get('/room/:id', function(req,res)
	// {
	// 	// This will get the value of the id from the url
	// 	var id = req.params.id;
	// 	console.log(id);
	// 	Room.findOne({_id: mongoose.Types.ObjectId(id)}).populate('roomie').exec(function(err, doc)
	// 	{
	// 	  if (err) return console.error(err);
	// 	  console.log(doc);
	// 	  res.json(doc);
	// 	});
	// });

	// We use put requests for modifying entries in the server space.
	// before submitting them to the DB on the backend.
	app.put('/roomUpdate/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In room update.");
		console.log("This is req.body: " + JSON.stringify(req.body));	//req.body
		Roomie.findOneAndUpdate(

			{_id: mongoose.Types.ObjectId(id)},

			req.body,
			{ upsert: true, new: true },

			function(err, doc)
			{
				if(err)
				{
			        console.log(err);
			    }
				res.json(doc);
				console.log(doc);
			});
	});

	app.put('/roomMatch/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In app.put - match.");
		console.log("This is req.body: " + req.body.match);	//req.body
		
		Room.findOneAndUpdate(
			// What we're lookign for
			{_id: mongoose.Types.ObjectId(id)},

			// What we do when we find it
			{
				$set: 	
				{
					match: req.body.match
				}
			},

			// What we do once we've done our modifications
			function(err, doc)
			{
				res.json(doc);
				console.log(doc);
			});
		//console.log("route reaches server side");	//req.body
	});

	app.get('/roomSearch/:n', function(req,res)
	{
		// var p = req.body;
		var n = req.params.n;
		console.log("parameters: " + n);
		var q = Room.where(
			{
				'profile.neighborhood' : n,
			});
		q.find()
		.populate('roomie')
		.populate('meta.listerID')
		.exec(function(err, rooms) 
		{
			if (err) return console.error(err);
			// rooms = rooms.toObject();
		 //    delete rooms.roomie.password;
		 //    delete rooms.roomie.salt;
		 	console.log(rooms);
			res.json(rooms);
			
		});
	});

}