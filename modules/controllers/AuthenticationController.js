module.exports = function(app){
	var User = require('../models/user.js')(app);
	var utils = require('utility');

	/**
	* Authenticate user
	* @method POST
	* @params email, password
	*/
	var authenticate = function(req, res, next){
		var email = req.body.email;
		var password = utils.sha1(req.body.password);

		User.find({ where: {email: email, password: password} }).then(function(user){
			if ( !!user ){
				res.json({status: 'success', error_message: null, user: user });
			}
			else{
				res.json({status: 'error', error_message: 'User not found', user: null });
			}
		})

	};

	/**
	* User signup
	* @method POST
	* @params firstName, lastName, email, password, confirm_password
	*/
	var register = function(req, res, next){
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var password = utils.sha1(req.body.password);

		User.findOrCreate({firstName: firstName, lastName: lastName, email: email, password: password}).then(function(user){
			if ( !!user ){
				res.json({status: 'success', error_message: null, user: user });
			}
			else{
				res.json({status: 'error', error_message: 'User not found', user: null });
			}
		});

	};

	return {
		authenticate: authenticate,
		register: register
	};
};