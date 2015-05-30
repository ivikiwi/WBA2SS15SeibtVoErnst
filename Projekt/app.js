var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();

var app = express();

var redis = require("redis");
var client = redis.createClient();

client.set("key", value);
client.get("key", function(err, rep){
	console.log(rep);
})

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
});



app.listen(8888);