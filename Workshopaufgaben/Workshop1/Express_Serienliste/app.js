var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();

var app = express();

var series = [
	{
		name: "Once Upon a Time",
		seasons: "4"
	},
	{
		name: "Pretty little liar",
		seasons: "3"
	}
]

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

app.listen(8888);