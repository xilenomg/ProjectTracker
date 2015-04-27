module.exports = function(app){

	var Project = Common.sequelize.define('Project', {
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

	return Project;
}