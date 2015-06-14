var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();
var redis = require("redis");

var app = express();
var db = redis.createClient();

app.use(bodyParse.json());

/* Register Series API */
require("./api/series/import").register(app, db);

/*Register User API */
require("./api/user/import").register(app, db);

app.listen(8888);