//Requires
var	express  = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	expressValidator = require('express-validator'),
	sass = require("node-sass"),
	path = require('path'),
	hat = require("hat"),
	async = require("async"),
	favicon = require('serve-favicon'),
	_ = require('underscore'),
	app = express();

//App set up
app.set("view options", {layout: false});
app.set('port', process.env.PORT || 3000);
app.set('environment', process.env.NODE_ENV || 'development');
app.engine('html', require('ejs').renderFile);
app.use(compression({ threshold: 512 }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

//Instances
var Common = require('./modules/common.js')(app);

//Load routes 
require('./modules/routes/routes.js')(app);

//start Server
var server = app.listen(app.get('port'),function(){
	console.log("Listening to port %s",server.address().port);
});