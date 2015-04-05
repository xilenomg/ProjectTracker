"use strict";

var Sequelize = require('sequelize');

module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable(
			'Users_Projects',
			{
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
					type: DataTypes.DATE,
					field: 'created_at'
				},
				updatedAt: {
					type: DataTypes.DATE,
					field: 'updated_at'
				}
			},
			{
				engine: 'MYISAM', // default: 'InnoDB'
				charset: 'latin1' // default: null
			}
		);

		// add altering commands here, calling 'done' when finished
		done();
	},

	down: function(migration, DataTypes, done) {
		migration.dropTable('User_Projects');
		// add reverting commands here, calling 'done' when finished
		done();
	}
};
