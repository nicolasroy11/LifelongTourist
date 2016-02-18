var mongoose = require('mongoose');

module.exports = function(app)
{
	var path = '/db';

	app.get(path + '/:model*', function(req,res)
	{
		void 0;
		var Model = require('../models/' + req.params.model + '.server.model');
		if (req.query.hasOwnProperty('populate'))
		{
			var populate = req.query.populate;
			delete req.query['populate'];
		}
		if (req.query.hasOwnProperty('select'))
		{
			var select = req.query.select;
			delete req.query['select'];
		}
		var query = Model;
		if (req.hasOwnProperty('query'))
		{
			query = query.where(req.query);
			if (req.query.hasOwnProperty('_id'))
			{
				query  = query.findOne();
			}
			else
			{
				query  = query.find();
			}
		}
		else
		{
			query  = query.find();
		}
		(populate) && (query = query.populate(populate));
		(select) && (query = query.select(select));
		query.exec(function(err, doc)
		{
			if (err) return res.json(err);
			if (doc)
			{
				return res.json(doc);
			}
		})
	});


	app.put(path + '/:model*', function(req,res)
	{	
		var model = req.body.model,
			Model = require('../models/' + model + '.server.model'),
			id = req.body.filter._id,
			action = {};
		void 0;
		void 0;
		if (req.body.hasOwnProperty('push'))
		{
			action.$push = req.body.push;
			void 0;
		}
		if (req.body.hasOwnProperty('pull'))
		{
			action.$pull = req.body.pull;
			void 0;
		}
		Model.findByIdAndUpdate(
		id,
		action,
		{ new: true },
		function(err, doc)
		{
			if (err) return res.json(err);
			if (doc)
			{
				return res.json(doc);
			}
		});
	});








	app.get('/get/:model/:id', function(req,res)
	{
		var id = req.params.id;
		var Model = require('../models/' + req.params.model + '.server.model');
		var query  = Model.where({ _id: id });
		query.findOne(function(err, doc) 
		{
			if (err) return res.json(err);
			if (doc)
			{
				if (req.params.model === 'tourist')
				{
					doc = doc.toObject();
					delete doc.password;
					delete doc.salt;
				}
				return res.json(doc);
			}		
		});
	});

	app.post('/post', function(req,res)
	{
		void 0;
		void 0;
		model = req.body.model;
		var _model = require('../models/' + model + '.server.model');
		var Model = new _model(req.body.data);
		void 0;
		Model.save(function(err, i)
		{
		  if (err) return void 0;
		  void 0;
		  res.json(i);
		});
	});

	app.put('/update/:id', function(req,res)
	{
		var id = req.params.id,
			model = req.body.model,
			Model = require('../models/' + model + '.server.model');
		Model.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},
			req.body.data,
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


	app.put('/push/:id', function(req,res)
	{	
		var id = req.params.id,
			model = req.body.model,
			Model = require('../models/' + model + '.server.model');
		void 0;
		void 0;
		Model.findByIdAndUpdate(
			id,

			{$push: req.body.data},
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



	app.put('/touristPrimary/:id', function(req,res)
	{
		var id = req.params.id;
		void 0;
		void 0;	
		void 0;
		Tourist.findOneAndUpdate(
			{_id: mongoose.Types.ObjectId(id)},

			{
				$set: 	
				{
					profile: req.body.profile,
				}
			},
			function(err, doc)
			{
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
