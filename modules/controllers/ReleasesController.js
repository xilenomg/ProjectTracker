module.exports = function(app){
	var utils = require('utility');
	var Models = require('../models/models.js')(app);
	var Cookies = require('cookies');

	var listAll = function(req, res, next){
		var cookies = new Cookies(req, res);
		var id_project = req.params.id_project
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

	return {
		listAll: listAll
	}
};