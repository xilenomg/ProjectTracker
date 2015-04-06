module.exports = function(app){
	var Models = require('../models/models.js')(app);
	var utils = require('utility');
	var Cookies = require('cookies');

	/**
	* Authenticate user
	* @method POST
	* @params email, password
	*/
	var authenticate = function(req, res, next){
		var email = req.body.email;
		var password = utils.sha1(req.body.password);

		Models.User.find({ where: {email: email, password: password} }).then(function(user){
			if ( !!user ){
				console.log(user.id);
				res.cookie('uid', user.id, { maxAge: 119990000000, httpOnly: false });
				res.cookie('name', user.name(), { maxAge: 119990000000, httpOnly: false });
				res.cookie('checkup', user.generateCheckup(), { maxAge: 119990000000, httpOnly: false });

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

		Models.User.find({where:{email: email}}).then(function(user){
			if ( !!user ){
				res.status(403).json({status: 'error', error_message: 'User already exists', user: null });
			}
			else{
				Models.User.create({firstName: firstName, lastName: lastName, email: email, password: password}).then(function(user){
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

	/**
	* is User logged in function
	*/
	var isUserLoggedIn = function(req, res, next){
		var cookies = new Cookies(req, res);
		if ( cookies.get('uid') && cookies.get('name') && cookies.get('checkup') ){
			Models.User.find({where:{id: cookies.get('uid')}}).then(function(user){
				if ( !!user ){
					if ( user.generateCheckup() === cookies.get('checkup') ){
						return next();
					}
				}
				logoutUser(req, res, next);
				return res.status(403).end();
			});
		}
		else{
			logoutUser(req, res, next);
			return res.status(403).end();
		}
	};

	var logoutUser = function(req, res, next){
		res.clearCookie('uid');
		res.clearCookie('name');
		res.clearCookie('checkup');
	};

	return {
		authenticate: authenticate,
		register: register,
		isUserLoggedIn: isUserLoggedIn
	};
};