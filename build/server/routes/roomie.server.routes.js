// This file is the routes the user will be interacting with directly when entering/modifying roomie info
var mongoose = require('mongoose');
var Roomie = require('../models/roomie.server.model');
// var flatten = require('flat');

module.exports = function(app)
{

	app.get('/roomie/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Roomie.where({ _id: id });
		console.log("Got a GET request!");
		// an error arg and docs, meaning the 
		// db will respond with a document.
		query.findOne(function(err, person) 
		{
			if (err) return console.error(err);
			if (person)
			{
				person = person.toObject();
				delete person.password;
				delete person.salt;
				return res.json(person);
				res.json(person);
				// console.log(person);
			}
			else
			{
				// console.log("Query for id " + id + " returned an empty object.");
			}
			
		});
	});

	// app.get('/roomieList', function(req,res)
	// {
	// 	console.log("Got a GET request in roomieList!");
	// 	Roomie.find(function(err, person) {
	// 	if (err) return console.error(err);
	// 	//console.log(person);
	// 	res.json(person);
	// 	});
	// });

	app.post('/roomie', function(req,res)
	{
			var roomie = new Roomie(req.body);

			roomie.save(function(err, roomie) 
			{
			  if (err) return console.error(err);
			  console.log('This is the id: ' + roomie._id);
			  res.json(roomie);
			});
		//}
	});

	


	// app.get('/roomie/:id', function(req,res)
	// {
	// 	// This will get the value of the id from the url
	// 	var id = req.params.id;
	// 	console.log(id);
	// 	Roomie.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, doc) {
	// 	  if (err) return console.error(err);
	// 	  console.log(doc);
	// 	  res.json(doc);
	// 	});
	// });


	app.post('/roomielogin', function(req,res)
	{
		// This will get the value of the id from the url
		var name = req.body.email;
		console.log('in roomielogin');
		// console.log("server receiving username: " +req.body.email);
		var query  = Roomie.where({ 'meta.email': name });
		query.findOne(function(err, roomie) {
		  if (err)
		  {
		  	return console.error(err);
		  	//res.send(err);
		  }
		  console.log("server returning id: " + roomie._id);
		  console.log("server returning object: " + roomie);
		  res.json(roomie._id);
		  //res.send(JSON.stringify(roomie));
		});
	});

	// app.post('/upload', function(req,res)
	// {
	// 	console.log(req.body);
	// 	console.log(req.files);
	// 	res.json({success: true});
		
	// });

	// We use put requests for modifying entries in the server space.
	// before submitting them to the DB on the backend.
	app.put('/roomiePrimary/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In app.put - primary.");
		// console.log("This is req.body: " + req.body.primary);	//req.body
		
		Roomie.findOneAndUpdate(
			// What we're lookign for
			{_id: mongoose.Types.ObjectId(id)},

			// What we do when we find it
			{
				$set: 	
				{
					// key needs quotes if nested
					// username: req.body.username,// "number.cell": req.body.number.cell
					// snumber: {home:"12345", cell:"56789"}
					//meta: req.body.meta,
					primary: req.body.primary,
					profile: req.body.profile,
					//match: req.body.match
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

	app.put('/roomieMatch/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In app.put - match.");
		// console.log("This is req.body: " + req.body.match);	//req.body
		
		Roomie.findOneAndUpdate(
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

	// used for updating a small subset of fields on the fly
	app.put('/roomieUpdate/:id', function(req,res)
	{
		// This will get the value of the id from the url
		var id = req.params.id;
		console.log("In roomie update.");
		// console.log("This is req.body: " + JSON.stringify(req.body));	//req.body
		Roomie.findOneAndUpdate(
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
				console.log(doc);
			});
	});

	// Used to push updates to a small subset of fields to an array of documents
	app.put('/roomiePush/', function(req,res)
	{
		// This will get the value of the id from the url
		var ObjectId = mongoose.Types.ObjectId;
		var params = req.body;
		var id = [];
		for (i in req.body.id)
		{
			id[i] = new ObjectId(req.body.id[i]);
		}
		console.log("roomiePush id array: " + id);
		// console.log("This is req.body: " + JSON.stringify(req.body));
		Roomie.update(
			{_id : {"$in" : req.body.id }},
			{$push: req.body.args},
			{multi: true},
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

	// gets a document and populates wtv :field is with DBRef
	app.get('/roomie/populate/:field/:id', function(req,res)
	{
		var id = req.params.id;
		var field = req.params.field;
		var query  = Roomie.where({ _id: id });
		// console.log("/roomie/populate with: " + JSON.stringify(req.params));
		query.findOne().populate(field).exec(function(err, roomie) 
		{
			if (err) return console.error(err);
			res.json(roomie);
			console.log(roomie);
		});

	});

}
