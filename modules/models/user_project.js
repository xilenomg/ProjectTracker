module.exports = function(app){
	var utils = require('utility');

	var UserProject = Common.sequelize.define('Users_Projects', {
		idUser: {
			type: Sequelize.INTEGER,
			field: 'id_user',
			primaryKey: true
		},
		idProject: {
			type: Sequelize.INTEGER,
			field: 'id_project',
			primaryKey: true
		},
		role:{
			type: Sequelize.ENUM(['dev', 'qa', 'pm', 'po', 'owner']),
			field: 'role',
			default: 'dev'
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

	return UserProject;
}