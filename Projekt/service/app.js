//	required Modules
var express = require("express");
var bodyParse = require("body-parser");
var jsonParser = bodyParse.json();
var redis = require("redis");
//	Create our Server
var app = express();
var db = redis.createClient();
//	Use bodyParser
app.use(jsonParser);
//	//////////////////////////////////////////
/* Register Series API */
require("./api/series/import").register(app, db);
/*Register User API */
require("./api/user/import").register(app, db);
//	Server Port
app.listen(8888);