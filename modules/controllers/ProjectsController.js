module.exports = function(app) {
	var utils = require('utility');
	var Models = require('../models/models.js')(app);
	var Cookies = require('cookies');

	/**
	 * list All projects user
	 * @method GET
	 * @required cookie('uid')
	 */
	var listAll = function(req, res, next) {
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');

		var user = Models.User.find(id_user).then(function(user) {
			user.getProjects().then(function(projects) {
				res.json(projects);
			})
		});
	};

	/**
	 * list One project to user
	 * @method GET
	 * @required cookie('uid')
	 * @params id_project
	 */
	var listOne = function(req, res, next) {
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');
		var id_project = req.params.id_project;

		var user = Models.User.find(id_user).then(function(user) {
			user.getProjects({
				where: {
					id_project: id_project
				}
			}).then(function(projects) {
				if (projects.length > 0) {
					res.json(projects[0]);
				}
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
	var register = function(req, res, next) {
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');

		var title = req.body.title;
		var description = req.body.description;

		Models.Project.create({
			title: title,
			description: description
		}).then(function(project) {
			if (project) {
				Models.UserProject.create({
					idUser: id_user,
					idProject: project.id,
					role: 'owner'
				}).then(function(user_project) {
					if (user_project) {
						res.json({
							status: 'success',
							error_message: null,
							project: project
						});
					} else {
						res.status(505).json({
							status: 'error',
							error_message: 'Unable to create project',
							project: null
						});
					}
				});
			} else {
				res.status(505).json({
					status: 'error',
					error_message: 'Unable to create project',
					project: null
				});
			}
		});
	};

	return {
		listAll: listAll,
		register: register,
		listOne: listOne
	};
};