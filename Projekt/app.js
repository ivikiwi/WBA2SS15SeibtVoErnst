var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();
var redis = require("redis");

var app = express();
var db = redis.createClient();

app.use(bodyParse.json());

app.post('/series', function(req, res){
	var newSeries = req.body;

	db.incr('id:series', function(err, rep){
		newSeries.id = rep;

		db.set('series:'+newSeries.id, JSON.stringify(newSeries), function(err, rep){
			res.json(newSeries);
		});
	});
});



/*
var series = [{"Name": "Once Upon a Time",
			"Seasons": "2",
		},
		{
			"Name": "Bla",
			"Seasons": "3",
		}]


app.get('/', function(req, res) {
	var acceptedTypes = req.accepts(['html', 'json']);
	switch(acceptedTypes) {
		case 'html':
			res.type('html').send('<h1>'+JSON.stringify(series)+'</h1>');
			break;
		case 'json':
			res.json(series);
			break;
		default:
			res.status(406).end();
	}
});

app.post('/series', jsonParser, function(req, res){
	series.push(req.body);
	res.type('plain').send('Added!');
});

app.post('/series/name', jsonParser, function(req, res){
	series.push(req.body);
	res.type('plain').send('Added!');
});*/



app.listen(8888);