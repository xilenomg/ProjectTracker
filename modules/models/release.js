module.exports = function(app){
	var utils = require('utility');

	var Release = Common.sequelize.define('Release', {

		id: {
			type: Sequelize.INTEGER,
			field: 'id_release',
			primaryKey: true
		},
		idProject: {
			type: Sequelize.INTEGER,
			field: 'id_project'
		},
		name: {
			type: Sequelize.STRING,
			field: 'name'
		},
		startDate: {
			type: Sequelize.DATE,
			field: 'start_date'
		},
		endDate: {
			type: Sequelize.DATE,
			field: 'end_date'
		},
		createdAt: {
			type: Sequelize.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: 'updated_at'
		}

	},
	{
		instanceMethods:{

		}
	});

	return Release;
}