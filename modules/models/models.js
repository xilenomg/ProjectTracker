module.exports = function(app){
	var Project = require('../models/project.js')(app);
	var User = require('../models/user.js')(app);
	var UserProject = require('../models/user_project.js')(app);
	var Release = require('../models/release.js')(app);
	var Card = require('../models/card.js')(app);

	User.belongsToMany(Project, {through: UserProject, foreignKey: 'id_user'});
	Project.belongsToMany(User, {through: UserProject, foreignKey: 'id_project'});
	Project.hasMany(Release, {foreignKey: 'id_project'});
	Release.hasMany(Card, {foreignKey: 'id_release'});

	Release.belongsTo(Project, {foreignKey: 'id_project'});
	Card.belongsTo(Release, {foreignKey: 'id_release'});

	return {
		Project: Project,
		User: User,
		UserProject: UserProject,
		Release: Release,
		Card: Card
	}
};