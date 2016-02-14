var express = require('express'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://127.0.0.1/roomem'),
	flash = require('connect-flash'),	// allows messages to be passed from one view to the next - needs sessions
	session = require('express-session');

module.exports = function()
{
	var app = express();


	
	app.use(session({
	  saveUninitialized: true,
	  resave: true,
	  secret: 'secret' //config.sessionSecret
	}));

	// auth middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// parse middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));

	app.use(flash());

	// __dirname = /Users/nicolas/Desktop/NodeJS/roomemdb/config
	// console.log(__dirname);
	app.use(express.static(__dirname + '/../client'));
	app.use('/uploads', express.static(__dirname + "/../uploads"));
	app.use('/img', express.static(__dirname + "/../client/img"));

	//The following 2 use paths are necessary for Google maps
	// Path to Google maps Angular API
	app.use('/googleScripts', express.static(__dirname + '/../node_modules/angular-google-maps/dist'));

	// Path to Simple logger API - 'uiGmapgoogle-maps' dependency won't work without this.
	app.use('/simpleLogger', express.static(__dirname + '/../node_modules/angular-simple-logger/dist'));

	// Path to Simple logger API - 'uiGmapgoogle-maps' dependency won't work without this.
	app.use('/angular-ui-router', express.static(__dirname + '/../node_modules/angular-ui-router/build'));

	// If you use Bower components - see index.html scripts for path
	app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

	// Path to file upload exe
	app.use('/ng-file-upload', express.static(__dirname + '/../node_modules/ng-file-upload/dist'));
	//app.use(multer({dest: './uploads/'}).single('photo'));

	app.set('views', './server/views');
	app.set('view engine', 'ejs');
	

	return app;
}