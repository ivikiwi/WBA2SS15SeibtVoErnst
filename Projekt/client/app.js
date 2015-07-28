var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ejs = require("ejs");
var fs = require("fs");
var http = require("http");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
//	first get-method
app.get("/user/:uid/allseries", jsonParser, function(req, res) {
	fs.readFile("./allseries.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if (err) {
			throw err;
		} else {
			var options = {
				host: "localhost",
				port: 8888,
				path: "/series",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			};
			var externalRequest = http.request(options, function(externalRequest) {
				console.log("Connected");
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader("content-type", "text/html");
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});




app.get("/cover/:id", function (req, res, next) {

  var options = {
    root: __dirname + "/img/series/cover/",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
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

});

app.get("/css/:stylesheetname", function (req, res, next) {

  var options = {
    root: __dirname + "/css/",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
    }
  };

  var fileName = req.params.stylesheetname;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });

});



//Bootstrap CSS
app.get("/dist/css/:stylesheetname", function (req, res, next) {

  var options = {
    root: __dirname + "/dist/css",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
    }
  };

  var fileName = req.params.stylesheetname;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });

});

//Bootstrap JS
app.get("/dist/js/:jsname", function (req, res, next) {

  var options = {
    root: __dirname + "/dist/js",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
    }
  };

  var fileName = req.params.jsname;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });

});

//Bootstrap JS
app.get("/dist/fonts/:bfonts", function (req, res, next) {

  var options = {
    root: __dirname + "/dist/fonts",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
    }
  };

  var fileName = req.params.bfonts;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });

});


app.get("/user/:uid/allseries/:id", jsonParser, function(req, res){
	fs.readFile("./series.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var seriesoptions = {
				host: "localhost",
				port: 8888,
				path: "/series/"+req.params.id,
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}

			var seasonoptions = {
				host: "localhost",
				port: 8888,
				path: "/series/"+req.params.id+"/season",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}

			var watchedseriesoptions = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.uid+"/watched",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}
			var requestCounter = 0;
			var seriesdata;
			var seasondata;
			var watchedseriesdata;
			//	we have to loop our requests to make sure, that all requests are done, 
			//	so our last request can write a positive respone heaser
			requestloop = function() {
				requestCounter=0;
			var externalRequest = http.request(seriesoptions, function(externalRequest) {
				//	defined a requestCounter to assure that our res.write() only starts, 
				//	after all our http-requests 
				//	(after we get all our data from our service) are done!!
				requestCounter++;
					externalRequest.on("data", function(chunk) {
						//save our request-data in our variable seriesdata to build our final json-data later
						seriesdata = JSON.parse(chunk);
					});		
			});
			
			//	second Get-Request: we want to get the data for watched series of a user too
			var externalRequestTwo = http.request(watchedseriesoptions, function(externalRequestTwo) {
				requestCounter++;
					externalRequestTwo.on("data", function(chunk) {
						//save our request-data in our variable seriesdata to build our final json-data later
						watchedseriesdata = JSON.parse(chunk);
					});		
			});
			//	third Get-Request: we want to get data from our seasons-ressource too
			var externalRequestThree = http.request(seasonoptions, function(externalRequestThree) {
				requestCounter++;
				if(requestCounter==3) {
					externalRequestThree.on("data", function(chunk) {
						seasondata = JSON.parse(chunk);
						var finaldata = {"seriesdata": seriesdata, "seasonsdata": seasondata, "watchedseriesdata": watchedseriesdata};
						var html = ejs.render(filestring, finaldata);
						res.setHeader("content-type", "text/html");
						res.writeHead(200);
						res.write(html);
						res.end();
					});
				} else {
					requestloop();
				}

			});
			externalRequestThree.end();
			externalRequestTwo.end();
			externalRequest.end();
		}
			requestloop();
			
		}
	});
});


app.get("/user/:id", jsonParser, function(req, res){
	fs.readFile("./user.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id,
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var userdata = JSON.parse(chunk);

					var html = ejs.render(filestring, userdata);
					res.setHeader("content-type", "text/html");
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});


app.get("/index", jsonParser, function(req, res){
	fs.readFile("./index.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: "localhost",
				port: 8888,
				path: "/user/",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log("Connected");
				externalRequest.on("data", function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader("content-type", "text/html");
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});




app.get("/userpost", jsonParser, function(req, res){
	fs.readFile("./userpost.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: "localhost",
				port: 8888,
				path: "/user",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log("Connected");
				externalRequest.on("data", function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader("content-type", "text/html");
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});



app.use("/userlogin", function(req, res){
		var currentUser = req.body;
			var options = {
				host: "localhost",
				port: 8888,
				path: "/user",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}

			var externalRequest = http.request(options, function(externalRequest) {
				externalRequest.on("data", function(chunk) {

					var userdata = JSON.parse(chunk);
					console.log(currentUser);

					//var html = ejs.render(filestring, seriesdata);
				//	res.setHeader('content-type', 'text/html');
					//res.writeHead(200);
					//res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		
	
});

app.post("/postuser", function(req, res){
	var data = JSON.stringify(req.body);
	console.log(req.body);
	console.log(data);
	var options = {
				host: "localhost",
				port: 8888,
				path: "/user",
				method: "POST",
				headers: {
				accept: "application/json",
				"Content-Type": "application/json",
       		    "Content-Length": Buffer.byteLength(data)
				}
			};

	var externalRequest = http.request(options, function(res){
		
		externalRequest.on("data", function(chunk) {
					console.log("body: " + chunk);
					

				});
		
	});
	externalRequest.write(data);
	externalRequest.end();
	
});




app.post("/postwatchedseries/user/:id/allseries/:sid", function(req, res){
	var data = JSON.stringify(req.body);
	console.log(data);
	var options = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id+"/watched",
				method: 'POST',
				headers: {
				accept: "application/json",
				"Content-Type": "application/json",
       		    "Content-Length": Buffer.byteLength(data)
				}
			};

	var externalRequest = http.request(options, function(res){
		
		externalRequest.on("data", function(chunk) {
					console.log("body: " + chunk);
					

				});
		
	});
	externalRequest.write(data);
	externalRequest.end();
	
});


app.put("/putwatchedseries/user/:id/allseries/:sid", function(req, res){
	var data = JSON.stringify(req.body);
	console.log("req.body.watchedid: " + req.body.watchedid);
	var options = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id+"/watched/"+req.body.watchedid,
				method: 'PUT',
				headers: {
				accept: "application/json",
				"Content-Type": "application/json",
       		    "Content-Length": Buffer.byteLength(data)
				}
			};

	var externalRequest = http.request(options, function(res){
		
		externalRequest.on("data", function(chunk) {
					console.log("body: " + chunk);
					

				});
		
	});
	externalRequest.write(data);
	externalRequest.end();
	
});




app.get("/user/:id/watched", jsonParser, function(req, res){
	fs.readFile("./watchedseries.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id+"/watched",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log("Connected");
				externalRequest.on("data", function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader("content-type", "text/html");
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