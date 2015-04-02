module.exports = (function() {
	app.get('/', function(req, res, next){
		res.render('index.html');   
	});
}());