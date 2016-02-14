var passport = require('passport');
var roomies = require('../controllers/roomie.server.controller.js');

module.exports = function(app)
{
  app.route('/signup')
  .post(roomies.signup);

  app.route('/signupProxy')
  .post(roomies.signupProxy);

  app.route('/mailSend')
  .post(roomies.mailSend);


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

  app.get('/signout', roomies.signout);

}