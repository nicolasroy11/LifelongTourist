var mongoose = require('mongoose');
var Roomie = require('../models/roomie.server.model');

module.exports = function(app)
{

	app.get('/roomie/:id', function(req,res)
	{
		var id = req.params.id;
		var query  = Roomie.where({ _id: id });
		void 0;
		query.findOne(function(err, person) 
		{
			if (err) return void 0;
			if (person)
			{
				person = person.toObject();
				delete person.password;
				delete person.salt;
				return res.json(person);
				res.json(person);
			}
			else
			{
			}

					});
	});


	app.post('/roomie', function(req,res)
	{
			var roomie = new Roomie(req.body);

			roomie.save(function(err, roomie) 
			{
			  if (err) return void 0;
			  void 0;
			  res.json(roomie);
			});
	});






	app.post('/roomielogin', function(req,res)
	{
		var name = req.body.email;
		void 0;
		var query  = Roomie.where({ 'meta.email': name });
		query.findOne(function(err, roomie) {
		  if (err)
		  {
		  	return void 0;
		  }
		  void 0;
		  void 0;
		  res.json(roomie._id);
		});
	});



	app.put('/roomiePrimary/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;

				Roomie.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},

			{
				$set: 	
				{
					primary: req.body.primary,
					profile: req.body.profile,
				}
			},

			function(err, doc)
			{
				res.json(doc);
				void 0;
			});
	});

	app.put('/roomieMatch/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;

				Roomie.findOneAndUpdate(
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

	app.put('/roomieUpdate/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Roomie.findOneAndUpdate(
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
				void 0;
			});
	});

	app.put('/roomiePush/', function(req,res)
	{
		var ObjectId = mongoose.Types.ObjectId;
		var params = req.body;
		var id = [];
		for (i in req.body.id)
		{
			id[i] = new ObjectId(req.body.id[i]);
		}
		void 0;
		Roomie.update(
			{_id : {"$in" : req.body.id }},
			{$push: req.body.args},
			{multi: true},
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

	app.get('/roomie/populate/:field/:id', function(req,res)
	{
		var id = req.params.id;
		var field = req.params.field;
		var query  = Roomie.where({ _id: id });
		query.findOne().populate(field).exec(function(err, roomie) 
		{
			if (err) return void 0;
			res.json(roomie);
			void 0;
		});

	});

}
