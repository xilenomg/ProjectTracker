"use strict";

var Sequelize = require('sequelize');

module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable(
			'Releases',
			{
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
					type: DataTypes.DATEONLY,
					field: 'start_date'
				},
				endDate: {
					type: DataTypes.DATEONLY,
					field: 'end_date'
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
		migration.dropTable('Releases');
		// add reverting commands here, calling 'done' when finished
		done();
	}
};
