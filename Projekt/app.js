var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();
var redis = require("redis");

var app = express();
var db = redis.createClient();

app.use(bodyParse.json());


//--------- POST-Method to post new Series---------//
app.post('/series', function(req, res){
	var newSeries = req.body;

	db.incr('id:series', function(err, rep){
		newSeries.id = rep;

		db.set('series:'+newSeries.id, JSON.stringify(newSeries), function(err, rep){
			res.json(newSeries);
		});
	});
});

//-------- GET-Method to get a series by id--------//
app.get('/series/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		if(rep) {
			res.type('json').send(rep);
		}
		else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});

//---- PUT-Method to change an existing series ----//
app.put('/series/:id', function(req, res) {
	db.get('series:' + req.params.id, function (err, rep) {
		console.log(req.body.name);
		var json = JSON.parse(rep);
		console.log(json);
		for (var key in req.body) {
			json[key] = req.body[key];
		}
		db.set('series:' + req.params.id, JSON.stringify(json), function (err, rep) {
			res.json(json);
		});
	});
		
	});

//-----DELETE-Method to delete a series by id -----//
app.delete('/series/:id', function(req,res){
	db.del('series:'+req.params.id, function(err, rep){
		if(rep==1){
			res.status(200).type('text').send('OK');
		}
		else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});


//----GET-Method to get a list with all existing series---//
app.get('/series', function(req, res){
	db.keys('series:*', function(err, rep){
		var serieslist = [];

		if(rep.length == 0){
			res.json(serieslist);
			return;
		}

		db.mget(rep, function(err, rep){
			rep.forEach(function(val){
				serieslist.push(JSON.parse(val));
			});

			serieslist = serieslist.map(function(series){
				return {id: series.id, name: series.name, description: series.description, genre: series.genre};
			});
			res.json(serieslist);
		});
	});
});

//--------GET-Method to get the name of a series by id --------//
app.get('/series/name/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		var serie = [];

		if(rep){

				serie.push(JSON.parse(rep));


			serie = serie.map(function(series){
				return {name: series.name};
			});
			res.json(serie);
		} else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});

});

//--------GET-Method to get the description of a series by id -------//
app.get('/series/description/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		var serie = [];

		if(rep){

				serie.push(JSON.parse(rep));


			serie = serie.map(function(series){
				return {description: series.description};
			});
			res.json(serie);
		} else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});

});




app.listen(8888);