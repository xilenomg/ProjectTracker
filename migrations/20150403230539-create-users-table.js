"use strict";

var Sequelize = require('sequelize');

module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable(
			'Users',
			{
				id: {
					type: Sequelize.INTEGER,
					field: 'id_user',
					autoIncrement: true,
					primaryKey: true
				},
				firstName: {
					type: Sequelize.STRING,
					field: 'first_name'
				},
				lastName: {
					type: Sequelize.STRING,
					field: 'last_name'
				},
				email:{
					type: Sequelize.STRING,
					field: 'email'
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
		migration.dropTable('Users');
		// add reverting commands here, calling 'done' when finished
		done();
	}
};
