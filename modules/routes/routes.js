module.exports = function(app) {
	var HomerController = require('../controllers/HomeController.js')(app);
	var AuthenticationController = require('../controllers/AuthenticationController.js')(app);
	var ProjectsController = require('../controllers/ProjectsController.js')(app);
	var ReleasesController = require('../controllers/ReleasesController.js')(app);
	var CardsController = require('../controllers/CardsController.js')(app);

	app.get('/', function(req, res, next){
		HomerController.set(req, res, next);
	});

	//API authenticate
	app.post('/api/user/authenticate', function(req, res, next){
		AuthenticationController.authenticate(req,res,next);
	});

	//API register
	app.post('/api/user/register', function(req, res, next){
		AuthenticationController.register(req,res,next);
	});

	//API projects
	app.get('/api/projects/listAll', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ProjectsController.listAll(req, res, next);
	});

	app.get('/api/projects/:id_project', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ProjectsController.listOne(req, res, next);
	});

	app.post('/api/projects/register', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ProjectsController.register(req, res, next);
	});

	//API Releases
	app.get('/api/projects/:id_project/releases/listAll', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ReleasesController.listAll(req, res, next);
	});

	app.post('/api/projects/:id_project/releases/register', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ReleasesController.register(req, res, next);
	});

	app.get('/api/projects/:id_project/releases/:id_release', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ReleasesController.listOne(req, res, next);
	});

	//API Cards
	app.get('/api/projects/:id_project/releases/:id_release/cards', AuthenticationController.isUserLoggedIn, function(req, res, next){
		CardsController.listAll(req, res, next);
	});

	app.get('/api/cards/:id_card', AuthenticationController.isUserLoggedIn, function(req, res, next){
		CardsController.listOne(req, res, next);
	});

	app.get('/api/releases/byCard/:id_card', AuthenticationController.isUserLoggedIn, function(req, res, next){
		ReleasesController.loadReleasesByCard(req, res, next);
	});

	app.post('/api/cards/register', AuthenticationController.isUserLoggedIn, function(req, res, next){
		CardsController.register(req, res, next);
	});

	app.post('/api/cards/:id_card/update', AuthenticationController.isUserLoggedIn, function(req, res, next){
		CardsController.updateCardField(req, res, next);
	});

	app.post('/api/cards/updateColumn', AuthenticationController.isUserLoggedIn, function(req, res, next){
		CardsController.updateColumnCard(req, res, next);
	});
};