var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function()
{
	var Tourist = mongoose.model('Tourist');

	passport.serializeUser(function(user, done)
	{
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done)
	{
		Tourist.findOne({_id: id}, '-password -salt', function(err, user)
		{
			void 0;
			done(err, user);
		});
	});

	require('./strategies/local.js')();
};