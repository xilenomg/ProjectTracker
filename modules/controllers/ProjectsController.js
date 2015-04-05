module.exports = function(app){
	var utils = require('utility');
	var Project = require('../models/project.js')(app);
	var User = require('../models/user.js')(app);
	var UserProject = require('../models/user_project.js')(app);
	var Cookies = require('cookies');

	User.belongsToMany(Project, {through: UserProject, foreignKey: 'id_user'});
	Project.belongsToMany(User, {through: UserProject, foreignKey: 'id_project'});

	/**
	* list All projects user
	* @method GET
	* @required cookie('uid')
	*/
	var listAll = function(req, res, next){
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');


		var user = User.find(id_user).then(function(user){
			user.getProjects().then(function(projects){
				res.json(projects);
			})
		});
	};

	/**
	* register project
	* @method POSt
	* @param title
	* @param description
	* @required cookie('uid')
	*/
	var register = function(req, res, next){
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');

		var title = req.body.title;
		var description = req.body.description;

		Project.create({title: title, description: description}).then(function(project){
			if ( project ){
				UserProject.create({idUser: id_user, idProject: project.id, role: 'owner'}).then(function(user_project){
					if ( user_project ) {
						res.json({status: 'success', error_message: null, project: project});
					}
					else{
						res.status(505).json({status: 'error', error_message: 'Unable to create project', project: null });
					}
				});
			}
			else{
				res.status(505).json({status: 'error', error_message: 'Unable to create project', project: null });
			}
		});
	};

	return {
		listAll: listAll,
		register: register
	};
};