var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function()
{
	var Roomie = mongoose.model('Roomie');

	passport.serializeUser(function(user, done)
	{
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done)
	{
		Roomie.findOne({_id: id}, '-password -salt', function(err, user)
		{
			void 0;
			done(err, user);
		});
	});

	require('./strategies/local.js')();
};