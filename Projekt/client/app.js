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

//Allgemeine Images laden
app.get("/img/:imgname", function (req, res, next) {

  var options = {
    root: __dirname + "/img/",
    dotfiles: "deny",
    headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
    }
  };

  var fileName = req.params.imgname;
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

// Variable, um in der get-methode die seriendaten zu speichern und später nochmal zu verwenden.
var seriesrating;

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
						// speichert die seriendaten in der Variable seriesrating, die von außen kommt, damit diese Daten noch für die Put-Methode für die Bewertungen benutzt werden können.
						seriesrating = seriesdata;
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

app.put("/putwatchinglist/user/:id/watched/", function(req, res){
	var data = JSON.stringify(req.body);
	console.log("req.body.watchedid: " + req.body.watchedid);
	console.log("episode: " + req.body.episode);
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

// Serie Bewerten!
app.put("/ratewatchedseries/user/:id/allseries/:sid", function(req, res){
	var data = JSON.stringify(req.body);
	console.log(seriesrating.bewertung);
	console.log("req.body.bewertung: " + req.body.bewertung);
	var watchedseries = {
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

	var ratedByUser = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id,
				method: 'PUT',
				headers: {
				accept: "application/json",
				"Content-Type": "application/json",
       		    "Content-Length": Buffer.byteLength(data)
				}
	};


	// Bewertungsalgorithmus
	var newSingleRate = req.body.bewertung;
	var oldAllRate = seriesrating.bewertung;
	var newRate;
	var ratingAnzahl;
	var bewertungssumme;

	if(seriesrating.bewertung == null) {
		oldAllRate = 0;
	}

	if(seriesrating.bewertungssumme == null) {
		bewertungssumme = 0;
	} else {
		bewertungssumme = seriesrating.bewertungssumme;
	}

	//if (typeof(seriesrating.bewertungsanzahl) !== 'undefined' || seriesrating.bewertungsanzahl == 0) {
	//	ratingAnzahl = 1;
	//} else {
	//	ratingAnzahl = seriesrating.bewertungsanzahl + 1;
	//}

	console.log(seriesrating.bewertungsanzahl);

	if(seriesrating.bewertungsanzahl == null) {
		ratingAnzahl = 1;
	} else {
		ratingAnzahl = seriesrating.bewertungsanzahl + 1;
	}
	
	bewertungssumme = parseInt(bewertungssumme) + parseInt(newSingleRate);

	newRate = parseInt(bewertungssumme) / parseInt(ratingAnzahl);

	if(newRate > 5) {
		newRate = 5;
	}

	if(newRate < 0) {
		newRate = 0;
	}

	var ratingData = {
		"bewertung": newRate,
		"bewertungsanzahl": ratingAnzahl,
		"genre": "Musik",
		"bewertungssumme": bewertungssumme
	};

	console.log("RatingAnzahl: " + ratingAnzahl);

	var newRatingData = JSON.stringify(ratingData);

	var putInSeries = {
				host: "localhost",
				port: 8888,
				path: "/series/" + req.params.sid,
				method: 'PUT',
				headers: {
				accept: "application/json",
				"Content-Type": "application/json",
       		    "Content-Length": Buffer.byteLength(newRatingData)
				}
	};

	console.log("newRate" + newRate);
	console.log("oldAllRate" + oldAllRate);
	console.log("ratingAnzahl" + ratingAnzahl);
	console.log(newRatingData);

	var externalRequest1 = http.request(putInSeries, function(res) {
				externalRequest1.on("newRatingData", function(chunk) {
						console.log("body: " + chunk);
				});
	});


		var externalRequest2 = http.request(watchedseries, function(res){
			externalRequest2.on("data", function(chunk) {
						console.log("body: " + chunk);
					});
		
		});

	//externalRequest1.write(JSON.stringify(newRatingData));
	externalRequest1.write(newRatingData);
	externalRequest2.write(data);
	externalRequest1.end();
	externalRequest2.end();
	
	
});




app.get("/user/:id/watched", jsonParser, function(req, res){
	fs.readFile("./watchedseries.ejs", {encoding: "utf-8"}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var watchedSeriesOptions = {
				host: "localhost",
				port: 8888,
				path: "/user/"+req.params.id+"/watched",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}

			var seasonOptions = {
				host: "localhost",
				port: 8888,
				path: "/allseasons",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			}

			var seriesdata;
			var seasondata;
			var requestCounter = 0;

			requestloop = function() {
				requestCounter = 0;
				var externalRequestOne = http.request(watchedSeriesOptions, function(externalRequestOne) {
					requestCounter++;
					externalRequestOne.on("data", function(chunk) {
						console.log("erster request fertig");
						seriesdata = JSON.parse(chunk);
					});
				});
				console.log("rcounter " + requestCounter);
				
				
				var externalRequestTwo = http.request(seasonOptions, function(externalRequestTwo) {
					requestCounter++;
					if(requestCounter==2) {
						externalRequestTwo.on("data", function(chunk) {
							console.log("zweiter request fertig");
							seasondata = JSON.parse(chunk);
							var finaldata = {"seriesdata":seriesdata, "seasondata":seasondata}
							console.log("finaldata " + JSON.stringify(finaldata));
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
				externalRequestTwo.end();
				externalRequestOne.end();
				
			}

			requestloop();
		}


	});
});





app.listen(3001);