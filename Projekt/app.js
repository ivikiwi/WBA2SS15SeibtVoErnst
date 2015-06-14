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

///////------------ User --------------/////



//--------- POST-Method to post new User---------//
app.post('/user', function(req, res){
	var newSeries = req.body;

	db.incr('id:u', function(err, rep){
		newSeries.id = rep;

		db.set('user:'+newSeries.id, JSON.stringify(newSeries), function(err, rep){
			res.json(newSeries);
		});
	});
});



//-------- GET-Method to get a user by id--------//
app.get('/user/:id', function(req, res){
	db.get('user:'+req.params.id, function(err, rep){
		if(rep) {
			res.type('json').send(rep);
		}
		else {
			res.status(404).type('text').send('Der User mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});

//---- PUT-Method to change an existing user ----//
app.put('/user/:id', function(req, res) {
	db.get('user:' + req.params.id, function (err, rep) {
		var json = JSON.parse(rep);
		for (var key in req.body) {
			json[key] = req.body[key];
		}
		db.set('user:' + req.params.id, JSON.stringify(json), function (err, rep) {
			res.json(json);
		});
	});
		
	});

//-----DELETE-Method to delete a user by id -----//
app.delete('/user/:id', function(req,res){
	db.del('user:'+req.params.id, function(err, rep){
		if(rep==1){
			res.status(200).type('text').send('OK');
		}
		else {
			res.status(404).type('text').send('Der User mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});


//----GET-Method to get a list with all existing users---//
app.get('/user', function(req, res){
	db.keys('user:*', function(err, rep){
		var userlist = [];

		if(rep.length == 0){
			res.json(userlist);
			return;
		}

		db.mget(rep, function(err, rep){
			rep.forEach(function(val){
				userlist.push(JSON.parse(val));
			});

			userlist = userlist.map(function(user){
				return {id: user.id, name: user.name};
			});
			res.json(userlist);
		});
	});
});


////// ---- WATCHED SERIES ----- ///////
app.post('/user/:uid/watched', function(req, res){
	var newWatchedSeries = req.body;

	db.incr('uzaehler:'+req.params.uid+':watched', function(err, rep){
	newWatchedSeries.id = rep;

		db.set('uu:'+req.params.uid+':watched:'+newWatchedSeries.id, JSON.stringify(newWatchedSeries), function(err, rep){
			res.json(newWatchedSeries);
		});
	});
});

//-------- GET-Method to get a watched series by user-id and series-id--------//
app.get('/user/:uid/watched/:id', function(req, res){
	db.get('uu:'+req.params.uid+':watched:'+req.params.id, function(err, rep){
		if(rep) {
			res.type('json').send(rep);
		}
		else {
			res.status(404).type('text').send('Die watched Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});

//-------- PUT-Method to get a watched series by user-id and series-id--------//
app.put('/user/:uid/watched/:id', function(req, res) {
	db.get('uu:' + req.params.uid + ':watched:' + req.params.id, function (err, rep) {
		var json = JSON.parse(rep);
		for (var key in req.body) {
			json[key] = req.body[key];
		}
		db.set('uu:' + req.params.uid + ':watched:' + req.params.id, JSON.stringify(json), function (err, rep) {
			res.json(json);
		});
	});
		
	});


//-----DELETE-Method to delete a watched series by id -----//
app.delete('/user/:uid/watched/:id', function(req,res){
	db.del('uu:'+req.params.uid+':watched:'+req.params.id, function(err, rep){
		if(rep==1){
			res.status(200).type('text').send('OK');
		}
		else {
			res.status(404).type('text').send('Die watched Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});


//----GET-Method to get a list with all watched series---//
app.get('/user/:uid/watched', function(req, res){
	db.keys('uu:'+req.params.uid+':watched:*', function(err, rep){
		var watchedlist = [];

		if(rep.length == 0){
			res.json(watchedlist);
			return;
		}

		db.mget(rep, function(err, rep){
			rep.forEach(function(val){
				watchedlist.push(JSON.parse(val));
			});

			watchedlist = watchedlist.map(function(series){
				return {id: series.id, seriesid: series.seriesid, season: series.season, episode: series.episode};
			});
			res.json(watchedlist);
		});
	});
});



app.listen(8888);