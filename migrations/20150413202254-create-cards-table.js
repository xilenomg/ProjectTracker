"use strict";

var Sequelize = require('sequelize');

module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable(
			'Cards', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id_cards',
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
				idRelease:{
					type: Sequelize.INTEGER,
					field: 'id_release'
				},
				status:{
					type: Sequelize.ENUM(['planned', 'dev', 'test', 'done']),
					field: 'status'
				},
				estimatedTime:{
					type: Sequelize.TIME,
					field: 'estimated_time'
				},
				timeSpent:{
					type: Sequelize.TIME,
					field: 'time_spent'
				},
				createdAt: {
					type: DataTypes.DATE,
					field: 'created_at'
				},
				updatedAt: {
					type: DataTypes.DATE,
					field: 'updated_at'
				}
			}
		);
		done();
	},

	down: function(migration, DataTypes, done) {
		migration.dropTable('Cards');
		// add reverting commands here, calling 'done' when finished
		done();
	}
};