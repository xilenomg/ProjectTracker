"use strict";

var Sequelize = require('sequelize');

module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable(
			'Projects',
			{
				id: {
					type: Sequelize.INTEGER,
					field: 'id_project',
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
		migration.dropTable('Projects');
		// add reverting commands here, calling 'done' when finished
		done();
	}
};
