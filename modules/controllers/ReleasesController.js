module.exports = function(app){
	var utils = require('utility');
	var Models = require('../models/models.js')(app);
	var Cookies = require('cookies');

	var listAll = function(req, res, next){
		var cookies = new Cookies(req, res);
		var id_project = req.params.id_project;
		var id_user = cookies.get('uid');

		Models.User.find({where:{id: id_user}}).then(function(user){
			if ( user ) {
				user.getProjects({where:{id:id_project}}).then(function(project){
					if ( project ){
						project[0].getReleases().then(function(releases){							
							res.json(releases);
						});
					}
					else{
						res.status(404).end();
					}
				});
			}
			else{
				res.status(404).end();
			}
		});
	};

	var listOne = function(req, res, next){
		var cookies = new Cookies(req, res);
		var id_project = req.params.id_project;
		var id_release = req.params.id_release;
		var id_user = cookies.get('uid');

		Models.User.find({where:{id: id_user}}).then(function(user){
			if ( user ) {
				user.getProjects({where:{id:id_project}}).then(function(project){
					if ( project ){
						project[0].getReleases({where:{id_release: id_release}}).then(function(release){							
							res.json(release);
						});
					}
					else{
						res.status(404).end();
					}
				});
			}
			else{
				res.status(404).end();
			}
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
		var id_project = req.params.id_project;

		var name = req.body.name;
		var start_date = new Date(req.body.start_date);
		var end_date = new Date(req.body.end_date);

		Models.Project.find({where:{id_project: id_project}}).then(function(project){
			if ( project ){
				console.log(project);
				Models.Release.create({
					name: name,
					startDate: start_date,
					endDate: end_date,
					id_project: id_project
				}).then(function(release){
					console.log(release);
					if ( release ){
						res.json({
							status: 'success',
							error_message: null,
							release: release
						});
					}
					else{
						res.status(501).json({
							status: 'error',
							error_message: 'Unable to create this release',
							release: null
						});
					}
				});
			}
			else{
				res.status(404).json({
					status: 'error',
					error_message: 'Unable to create this release',
					release: null
				});
			}
		});
	};

	return {
		listAll: listAll,
		register: register,
		listOne: listOne
	}
};