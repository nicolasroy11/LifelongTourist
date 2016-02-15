var express = require('./config/express');
var passport = require('./config/passport');

var Tourist = require('./server/models/tourist.server.model');
var Trip = require('./server/models/trip.server.model');
var Leg = require('./server/models/leg.server.model');
var Thread = require('./server/models/thread.server.model');

var app = express();
app.io = require('socket.io')();
var passport = passport();

var http = require('http'),
	io = require('socket.io')(server);

io.on('connection', function(socket)
{
	void 0;
	socket.on('disconnect', function()
	{
		void 0;
	});
});

var genericRoutes = require('./server/routes/generic.server.routes');
var loginRoutes = require('./server/routes/user.login.routes');
var dbqueryRoutes = require('./server/routes/DBQuery.server.routes');


genericRoutes(app);
loginRoutes(app);
dbqueryRoutes(app);


app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function()
{
	void 0;
});

io.listen(server);



module.exports = app;

