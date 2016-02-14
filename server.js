var express = require('./config/express');
var passport = require('./config/passport');

// DB models
var Tourist = require('./server/models/tourist.server.model');
var Trip = require('./server/models/trip.server.model');
var Leg = require('./server/models/leg.server.model');
var Thread = require('./server/models/thread.server.model');

// login dependencies
var app = express();
app.io = require('socket.io')();
var passport = passport();

var http = require('http'),
	io = require('socket.io')(server);

io.on('connection', function(socket)
{
	console.log('A user has connected!');
	socket.on('disconnect', function()
	{
		console.log('A user has disconnected!');
	});
});

// Routes
// var roomieRoutes = require('./server/routes/roomie.server.routes');
var loginRoutes = require('./server/routes/user.login.routes');
var dbqueryRoutes = require('./server/routes/DBQuery.server.routes');
// var roomdbqueryRoutes = require('./server/routes/roomdbquery.server.routes');
// var roomRoutes = require('./server/routes/room.server.routes');
// var uploadRoutes = require('./server/routes/upload.server.routes');
// var threadRoutes = require('./server/routes/thread.server.routes');


// roomieRoutes(app);
loginRoutes(app);
dbqueryRoutes(app);
// roomdbqueryRoutes(app);
// roomRoutes(app);
// uploadRoutes(app);
// threadRoutes(app, io);


// app.listen('3000');
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function()
{
	console.log('Express server listening on port ' + server.address().port);
});

io.listen(server);



module.exports = app;

// console.log('Nick is a roomem pimp');