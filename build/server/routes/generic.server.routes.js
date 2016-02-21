var mongoose = require('mongoose');
var g = require('../controllers/generic.server.controller');

module.exports = function(app)
{
	var path = '/db';

	app.route(path + '/:model*')
	.get(g.get)
	.put(g.put)
	.post(g.post)
}
