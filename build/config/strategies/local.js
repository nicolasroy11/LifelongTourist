var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Tourist = require('mongoose').model('Tourist');

module.exports = function()
{	
	passport.use(new LocalStrategy(function(username, password, done)
	{
		Tourist.findOne(
		{
			username: username
		})
		.populate('threads')	
		.populate('trips')	
		.exec(
		function(err, user)
		{
			void 0;
			if (err)
			{
				return done(err);
			}
			if (!user)
			{
				return done(null, false,
				{
					message: 'Unknown user! Are you using the right email adress?'
				});
			}
			if (!user.authenticate(password))
			{
				return done(null, false,
				{
					message: 'Invalid Password! Have you forgotten your password?'
				});
			}
		return done(null, user);
		});

	}));
};

