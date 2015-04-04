module.exports = function(app){
	var set = function(req, res, next){
		res.render('index.html');
	};

	return {
		set: set
	};
};