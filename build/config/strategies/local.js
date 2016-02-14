var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Tourist = require('mongoose').model('Tourist');

module.exports = function()
{	
	// 'done' is called when the authentication process is over.
	passport.use(new LocalStrategy(function(username, password, done)
	{
		// console.log('looking for ' + username + ' and ' + password);
		Tourist.findOne(
		{
			username: username
		})
		.populate('threads')	// populate all the user's threads
		// .populate('meta.hasRoom')	// populate the room
		.exec(
		function(err, user)
		{
			console.log('and user: ' + user);
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

  // Roomie.findOne({_id: id}).populate('threads').exec(function(err, user) 
  //  {
  //    console.log('deserialized: ' + user);
  //    done(err, user);
  //  });