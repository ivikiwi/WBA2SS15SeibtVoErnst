var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();

app.get('/allseries', jsonParser, function(req, res){
	fs.readFile('./allseries.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/series',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});

app.listen(3001);