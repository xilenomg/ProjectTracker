module.exports = function(app) {
	var utils = require('utility');
	var Common = require('../common.js')(app);

	var Card = Common.sequelize.define('Card', {

		id: {
			type: Sequelize.INTEGER,
			field: 'id_card',
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING,
			field: 'title'
		},
		description: {
			type: Sequelize.TEXT,
			field: 'description'
		},
		idRelease: {
			type: Sequelize.INTEGER,
			field: 'id_release'
		},
		status:{
			type: Sequelize.ENUM(['planned', 'dev', 'test', 'done']),
			field: 'status'
		},
		estimatedTime: {
			type: Sequelize.TIME,
			field: 'estimated_time'
		},
		timeSpent: {
			type: Sequelize.TIME,
			field: 'time_spent'
		},
		createdAt: {
			type: Sequelize.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: 'updated_at'
		}

	}, {
		instanceMethods: {

		}
	});

	return Card;
}