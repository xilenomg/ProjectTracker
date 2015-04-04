//requires
Sequelize = require('sequelize');

module.exports = function(app){
	var Common = function(){
		var config = require('../config/database.json')[app.get('environment')];
		return {
			util: require('util'),
			fs:   require('fs'),
			path: require('path'),
			config: config,
			sequelize: new Sequelize(config.database, config.username, config.password, {
				host: config.host,
				port: config.port,
				logging: console.log
			})
		};
	};

	return Common();
}