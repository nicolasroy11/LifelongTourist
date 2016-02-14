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
		// When a user is authenticated, Passport will save its _id property to the session
		// however, per the second argument, Mongoose won't fetch the user's password and salt properties
		Tourist.findOne({_id: id}, '-password -salt', function(err, user)
		{
			console.log('deserialized: ' + user);
			done(err, user);
		});
	});

	// Include our local strategy file so server.js file will load
	require('./strategies/local.js')();
};