//requires
Sequelize = require('sequelize');

module.exports = function(app) {
	var Common = function() {
		console.log("environment: " + app.get('environment'));
		var config = require('../config/database.json')[process.env.NODE_ENV || 'development'];
		return {
			util: require('util'),
			fs: require('fs'),
			path: require('path'),
			config: config,
			sequelize: new Sequelize(config.database, config.username, config.password, {
				host: config.host,
				port: config.port,
				logging: console.log,
				dialectOptions: {
					insecureAuth: true
				}

			})
		};
	};

	return Common();
}