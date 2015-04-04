module.exports = function(app) {
	var Common = require('../Common')(app);
	var HomerController = require('../controllers/HomeController.js')(app);
	var AuthenticationController = require('../controllers/AuthenticationController.js')(app);
	app.get('/', function(req, res, next){
		HomerController.set(req, res, next);
	});

	//API
	app.post('/api/user/authenticate', function(req, res, next){
		AuthenticationController.authenticate(req,res,next);
	});

	app.post('/api/user/register', function(req, res, next){
		AuthenticationController.register(req,res,next);
	});
};