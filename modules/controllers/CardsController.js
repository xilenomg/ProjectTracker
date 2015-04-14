module.exports = function(app) {
	var utils = require('utility');
	var Models = require('../models/models.js')(app);
	var Cookies = require('cookies');

	/**
	 * list All cards from release
	 * @method GET
	 * @required cookie('uid')
	 * @params
	 */
	var listAll = function(req, res, next) {
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');
		var id_project = req.params.id_project;
		var id_release = req.params.id_release;

		Models.User.find(id_user).then(function(user) {
			if ( user ) {
				user.getProjects({where:{id_project: id_project}}).then(function(project) {
					if ( project && project.length > 0 ) {
						project[0].getReleases({where: {id_release: id_release}}).then(function(release){
							if ( release && release.length > 0 ){
								release[0].getCards().then(function(cards){
									res.json(cards);
								});
							}
							else{
								res.json([]);
							}
						});
					}
					else{
						res.json([]);
					}
				});
			}
			else{
				res.json([]);
			}
		});
	};

	/**
	 * list One card from release
	 * @method GET
	 * @required cookie('uid')
	 * @params 
	 */
	var listOne = function(req, res, next) {
		var cookies = new Cookies(req, res);
		var id_user = cookies.get('uid');
		var id_project = req.params.id_project;
		var id_release = req.params.id_release;

		Models.User.find(id_user).then(function(user) {
			if ( user ) {
				user.getProjects({where:{id_project: id_project}}).then(function(project) {
					if ( project && project.length > 0 ) {
						project[0].getReleases({where: {id_release: id_release}}).then(function(release){
							if ( release && release.length > 0 ){
								release[0].getCards({where:{id_card: id_card}}).then(function(card){
									res.json(card);
								});
							}
							else{
								res.json([]);
							}
						});
					}
					else{
						res.json([]);
					}
				});
			}
			else{
				res.json([]);
			}
		});
	};

	/**
	 * register card
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
		var id_release = req.body.id_release;
		var status = req.body.status;
		var estimated_time = req.body.estimated_time;
		var time_spent = req.body.time_spent;

		Models.Card.create({
			title: title,
			description: description,
			id_release: id_release,
			status: status,
			estimated_time: estimated_time,
			time_spent: time_spent
		}).then(function(card) {
			if (card) {
				res.json(card);
			} else {
				res.status(505).json({
					status: 'error',
					error_message: 'Unable to create the card',
					project: null
				});
			}
		});
	};

	return {
		listAll: listAll,
		listOne: listOne,
		register: register
	};
};