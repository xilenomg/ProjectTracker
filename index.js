//Requires
express  = require('express'),
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
cookieParser = require('cookie-parser'),
connection  = require('express-myconnection'),
mysql = require('mysql'),
Sequelize = require('sequelize'),
app = express();

//App set up
app.set("view options", {layout: false});
app.set('port', process.env.PORT || 3000);
app.set('environment', process.env.NODE_ENV || 'development');
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.use(compression({ threshold: 512 }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

//Instances
config = require('./config/database.json')[app.get('environment')],
sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	logging: console.log
});

//Load models
var models = require('./modules/models.js');
var route = require('./modules/controllers/routes.js');

//start Server
var server = app.listen(app.get('port'),function(){
	console.log("Listening to port %s",server.address().port);
});