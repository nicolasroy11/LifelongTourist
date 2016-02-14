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


  app.post('/signin', function(req, res, next)
  {
    passport.authenticate('local', function(err, user, info)
    {
      if (err)
      {
        return next(err); 
      }
      if (! user)
      {
        return res.send({ success : false, message : info.message });
      }
      user = user.toObject();
      delete user.password;
      delete user.salt;
      return res.json(user);
    })(req, res, next);
  });

  app.get('/signout', u.signout);

}