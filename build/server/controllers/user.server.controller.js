var Tourist = require('mongoose').model('Tourist');
var passport = require('passport');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(
	{
		service: 'Gmail',
	    auth:
	    {
	        user: 'nicolasroy11@gmail.com',
	        pass: 'Uberalles77'
	    }
	});


var getErrorMessage = function(err)
{
	var message = '';
	console.log('err');
	if (err.code)
	{
		switch(err.code)
		{
			case 11000:
			case 11001:
				message = "Username already exists!";
				break;
			default: message = 'Something went wrong';
		}
	}
	else
	{
		for (var errName in err.errors)
		{
			if (err.errors[errName].message)
			{
				message = err.errors[errName].message;
			}
		}
	}
	return message;
};

// Handles the sign up button click
exports.signup = function(req, res, next)
{
	if (!req.user)
	{
		console.log("This is the request I got: ")
		console.log(req.body);
		var user = new Tourist(req.body);
		var message = null;
		user.provider = 'local';

		user.save(function(err, user) 
		{
		  if (err)
		  {
		  	var message = getErrorMessage(err);
		  	// res.json(message);
		  	res.send({ success : false, message : message });
		  	return console.error(err);
		  } 
		  console.log('This is the id: ' + user._id);
		  // res.json(user);
		  req.login(user, function(err)
			{
				console.log('signup: attempting login');
				if (err) return next(err);
				console.log('signup: login successful');
				res.json(user);
				// return res.redirect('/#/querytest');
			});
		});
		// user.save(function(err, user)
		// {
		// 	if(err)
		// 	{
		// 		var message = getErrorMessage(err);
		// 		req.flash('error', message);
		// 		return res.redirect('/signup');
		// 		res.json(returnMessage);
		// 	}
		// 	// If the signup was successful, a user session is created
		// 	req.login(user, function(err)
		// 	{
		// 		if (err) return next(err);
		// 		// res.json(user);
		// 		return res.redirect('/#/querytest');
		// 	});
		// });
	}
	else
	{
		// res.json(req.user);
		res.end("Already logged in with " + req.user.username);
		//return res.redirect('/');
	}
};

// Handles when roomies are added by the room lister
exports.signupProxy = function(req, res, next)
{

	console.log("This is the request I got: ")
	console.log(req.body);
	var user = new Roomie(req.body);
	var message = null;
	user.provider = 'local';

	user.save(function(err, roomie) 
	{
	  if (err)
	  {
	  	var message = getErrorMessage(err);
	  	return console.error(err);
	  	res.send({ success : false, message : message });
	  	
	  } 
	  // console.log('Signup proxy: This is the id: ' + user._id);
	  res.json(user._id);
	 //  req.login(user, function(err)
		// {
		// 	if (err) return next(err);
		// 	res.json(user._id);
		// 	console.log("signupProxy: id: " + user._id);
		// });
	});

};

exports.mailSend = function(req, res, next)
{
	console.log('mailSend request body: ');
	console.log(req.body);
	var mailOptions =
	{
	    from: req.body.from,
	    to: req.body.to,
	    subject: req.body.subject,
	    text: req.body.text,
	    html: req.body.html
	};

	transporter.sendMail(mailOptions, 
		function(error, info)
		{
	    	if(error)
	    	{
	        	return console.log(error);
	    	}
	    	console.log('Message sent: ' + info.response);
		}
	);
};

exports.signout = function(req, res)
{
	// logout() is provided by passport to invalidate the session.
	console.log(req.body);
	// req.session.destroy();
	req.logout();
	res.status(200).json({status: 'Bye!'})
	// req.redirect('/');
};