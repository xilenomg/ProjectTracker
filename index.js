 var 
 	express  = require('express'),
 	app = express();

//start Server
var server = app.listen(process.env.PORT || 3000,function(){
   console.log("Listening to port %s",server.address().port);
});