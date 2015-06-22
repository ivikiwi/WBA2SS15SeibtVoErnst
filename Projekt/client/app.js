var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/public'));

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




app.get('/cover/:id', function (req, res, next) {

  var options = {
    root: __dirname + '/img/series/cover/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.id+'.jpg';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

})


app.get('/allseries/:id', jsonParser, function(req, res){
	fs.readFile('./series.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/series/'+req.params.id,
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


app.get('/user/:id', jsonParser, function(req, res){
	fs.readFile('./user.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user/'+req.params.id,
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