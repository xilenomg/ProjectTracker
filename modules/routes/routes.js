module.exports = function(app) {

	app.get('/', function(req, res, next){
		Controllers.HomerController.set(req, res, next);
	});

	//API authenticate
	app.post('/api/user/authenticate', function(req, res, next){
		Controllers.AuthenticationController.authenticate(req,res,next);
	});

	//API register
	app.post('/api/user/register', function(req, res, next){
		Controllers.AuthenticationController.register(req,res,next);
	});

	//API projects
	app.get('/api/projects/listAll', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ProjectsController.listAll(req, res, next);
	});

	app.get('/api/projects/:id_project', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ProjectsController.listOne(req, res, next);
	});

	app.post('/api/projects/register', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ProjectsController.register(req, res, next);
	});

	//API Releases
	app.get('/api/projects/:id_project/releases/listAll', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ReleasesController.listAll(req, res, next);
	});

	app.post('/api/projects/:id_project/releases/register', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ReleasesController.register(req, res, next);
	});

	app.get('/api/projects/:id_project/releases/:id_release', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ReleasesController.listOne(req, res, next);
	});

	//API Cards
	app.get('/api/projects/:id_project/releases/:id_release/cards', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.CardsController.listAll(req, res, next);
	});

	app.get('/api/cards/:id_card', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.CardsController.listOne(req, res, next);
	});

	app.get('/api/releases/byCard/:id_card', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.ReleasesController.loadReleasesByCard(req, res, next);
	});

	app.post('/api/cards/register', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.CardsController.register(req, res, next);
	});

	app.post('/api/cards/:id_card/update', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.CardsController.updateCardField(req, res, next);
	});

	app.post('/api/cards/updateColumn', Controllers.AuthenticationController.isUserLoggedIn, function(req, res, next){
		Controllers.CardsController.updateColumnCard(req, res, next);
	});
};