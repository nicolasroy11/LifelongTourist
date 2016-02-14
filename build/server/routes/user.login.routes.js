var passport = require('passport');
var u = require('../controllers/user.server.controller.js');

module.exports = function(app)
{
  app.route('/signup')
  .post(u.signup);

  app.route('/signupProxy')
  .post(u.signupProxy);

  app.route('/mailSend')
  .post(u.mailSend);


  // sign in
  app.post('/signin', function(req, res, next)
  {
    passport.authenticate('local', function(err, user, info)
    {
      if (err)
      {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user)
      {
        return res.send({ success : false, message : info.message });
      }
      // On success, remove password and salt from the returned user object and send to client.
      // This way is meant as a temporary workaround. This task should be performed by local.js
      user = user.toObject();
      delete user.password;
      delete user.salt;
      return res.json(user);
      // return res.send({ success : true, message : 'authentication succeeded'});
    })(req, res, next);
  });

  app.get('/signout', u.signout);

}