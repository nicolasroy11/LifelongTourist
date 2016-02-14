var express = require('express'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://127.0.0.1/roomem'),
	flash = require('connect-flash'),	
	session = require('express-session');

module.exports = function()
{
	var app = express();



		app.use(session({
	  saveUninitialized: true,
	  resave: true,
	  secret: 'secret' 
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));

	app.use(flash());

	app.use(express.static(__dirname + '/../client'));
	app.use('/uploads', express.static(__dirname + "/../uploads"));
	app.use('/img', express.static(__dirname + "/../client/img"));

	app.use('/googleScripts', express.static(__dirname + '/../node_modules/angular-google-maps/dist'));

	app.use('/simpleLogger', express.static(__dirname + '/../node_modules/angular-simple-logger/dist'));

	app.use('/angular-ui-router', express.static(__dirname + '/../node_modules/angular-ui-router/build'));

	app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

	app.use('/ng-file-upload', express.static(__dirname + '/../node_modules/ng-file-upload/dist'));

	app.set('views', './server/views');
	app.set('view engine', 'ejs');


		return app;
}