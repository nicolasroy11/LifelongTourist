var mongoose = require('mongoose');
Roomie = require('../models/roomie.server.model');

module.exports = function(app)
{

	app.get('/roomieList', function(req,res)
	{
		void 0;
		Roomie.find(function(err, person) {
		if (err) return void 0;
		void 0;
		res.json(person);
		});
	});

	app.delete('/roomieList/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Roomie.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc)
		{
			res.json(doc);
		});
	});

	app.get('/roomieList/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		Roomie.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, doc) {
		  if (err) return void 0;
		  void 0;
		  res.json(doc);
		});
	});

	app.post('/roomieList', function(req,res)
	{
		var roomie = new Roomie(req.body);

		roomie.save(function(err, roomie) 
		{
		  if (err) return void 0;
		  void 0;
		  res.json(roomie);
		});
	});

	app.put('/roomieList/:id', function(req,res)
	{
		var id = req.params.id;
		Roomie.findOneAndUpdate(
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
