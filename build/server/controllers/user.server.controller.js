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
	void 0;
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

exports.signup = function(req, res, next)
{
	if (!req.user)
	{
		void 0
		void 0;
		var user = new Tourist(req.body);
		var message = null;
		user.provider = 'local';

		user.save(function(err, user) 
		{
		  if (err)
		  {
		  	var message = getErrorMessage(err);
		  	res.send({ success : false, message : message });
		  	return void 0;
		  } 
		  void 0;
		  req.login(user, function(err)
			{
				void 0;
				if (err) return next(err);
				void 0;
				res.json(user);
			});
		});
	}
	else
	{
		res.end("Already logged in with " + req.user.username);
	}
};

exports.signupProxy = function(req, res, next)
{

	void 0
	void 0;
	var user = new Roomie(req.body);
	var message = null;
	user.provider = 'local';

	user.save(function(err, roomie) 
	{
	  if (err)
	  {
	  	var message = getErrorMessage(err);
	  	return void 0;
	  	res.send({ success : false, message : message });

	  		  } 
	  res.json(user._id);
	});

};

exports.mailSend = function(req, res, next)
{
	void 0;
	void 0;
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
	        	return void 0;
	    	}
	    	void 0;
		}
	);
};

exports.signout = function(req, res)
{
	void 0;
	req.logout();
	res.status(200).json({status: 'Bye!'})
};