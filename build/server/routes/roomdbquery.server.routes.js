// This file is the routes used by admin to verify proper room collections operations
var mongoose = require('mongoose');
Room = require('../models/room.server.model');

module.exports = function(app)
{

	app.get('/roomList', function(req,res)
	{
		console.log("Got a GET request in roomList!");
		Room.find(function(err, room) {
		if (err) return console.error(err);
		//console.log(person);
		res.json(room);
		});
	});

	app.delete('/roomList/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log(id);
		Room.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			// same as in post
			res.json(doc);
		});
	});

	// Adding a new room
	app.post('/roomList', function(req,res)
	{
		var room = new Room(req.body);
		var userID = req.body.meta.listerID;
		console.log("userID is: " + userID);
		console.log("room added: " + JSON.stringify(req.body));
		// room.roomie = userID;
		// room.roomie.push(userID);
		// room.roomie.push(req.body.roomie);
		room.save(function(err, room)
		{
		  if (err) return console.error(err);
		  console.log('This is the room: ' + room);
		  res.json(room);
		});
	});

	app.get('/roomList/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log(id);
		Room.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, doc) {
		  if (err) return console.error(err);
		  console.log(doc);
		  res.json(doc);
		});
	});

	app.put('/roomList/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		Room.findOneAndUpdate(
			// What we're lookign for
			{_id: mongoose.Types.ObjectId(id)},

			// What we do when we find it
			{
				$set: 	
				{
					meta: req.body.meta,
					inclusions: req.body.inclusions,
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
