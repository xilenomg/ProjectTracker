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
				console.log(user);
				
				res.cookie('uid', user.id, { maxAge: 900000, httpOnly: true });
				res.cookie('name', user.name(), { maxAge: 900000, httpOnly: true });
				res.cookie('checkup', user.generateCheckup, { maxAge: 900000, httpOnly: true });
				res.json({status: 'success', error_message: null, user: user });
			}
			else{
				res.status(404).json({status: 'error', error_message: 'User not found', user: null });
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
		var confirm_password = utils.sha1(req.body.confirm_password);
		if ( password !== confirm_password ){
			res.status(403).json({status: 'error', error_message: 'Password doesn\'t match', user: null });	
		}

		User.find({where:{email: email}}).then(function(user){
			if ( !!user ){
				res.status(403).json({status: 'error', error_message: 'User already exists', user: null });
			}
			else{
				User.create({firstName: firstName, lastName: lastName, email: email, password: password}).then(function(user){
					if ( !!user ){
						res.json({status: 'success', error_message: null, user: user });
					}
					else{
						res.status(403).json({status: 'error', error_message: 'Error when creating user', user: null });	
					}
				});
			}
		});

	};

	return {
		authenticate: authenticate,
		register: register
	};
};