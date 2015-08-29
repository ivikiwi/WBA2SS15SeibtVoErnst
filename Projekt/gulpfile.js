var gulp = require("gulp");
var eslint = require("gulp-eslint");
var jsFiles = "**/*.js";
var redis = require("redis");
var bodyParse = require("body-parser");
var jsonParser = bodyParse.json();
// Create our Server
var db = redis.createClient();

gulp.task("lint", function() {
	return gulp.src(jsFiles)
		.pipe(eslint("lint.json"))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task("default", function() {
	gulp.start(["lint"]);
	gulp.watch(jsFiles, ["lint"]);
});

gulp.task("db-flush", function() {
	db.flushdb( function (err, didSucceed) {
        console.log(didSucceed); // true
    });

});




gulp.task("db-dummy", function() {
	var newSeries1 = {
	"id": "1",
	"name": "Once upon a time",
	"genre": "Fantasy, Drama",
	"description": "Serie über Märchen"
	}
	var newSeries2 = {
	"id": "2",
	"name": "Breaking Bad",
	"genre": "Action, Drama",
	"description": "Serie über Drogen"
	}
	var newSeries3 = {
	"id": "3",
	"name": "Better Call Saul",
	"genre": "Action, Drama",
	"description": "Serie über einen Anwalt"
	}
	var newSeries4 = {
	"id": "4",
	"name": "How i met your mother",
	"genre": "Comedy",
	"description": "Serie über 5 Freunde"
	}
	var newSeries5 = {
	"id": "5",
	"name": "Nashville",
	"genre": "Musik, Drama, Romance",
	"description": "Serie über Countrymusik"
	}
   	db.set("series:1", JSON.stringify(newSeries1));
	db.set("series:2", JSON.stringify(newSeries2));
	db.set("series:3", JSON.stringify(newSeries3));
	db.set("series:4", JSON.stringify(newSeries4));
	db.set("series:5", JSON.stringify(newSeries5));
	// Episode Dummies
	var episodes1 = {
	"id": "1",
	"episodes": "24"
	}
	var episodes2 = {
	"id": "2",
	"episodes": "16"
	}
	var episodes3 = {
	"id": "3",
	"episodes": "21"
	}
	db.set("ss:1:season:1", JSON.stringify(episodes1));
	db.set("ss:1:season:2", JSON.stringify(episodes2));
	db.set("ss:2:season:1", JSON.stringify(episodes1));
	db.set("ss:2:season:2", JSON.stringify(episodes2));
	db.set("ss:2:season:3", JSON.stringify(episodes3));
	db.set("ss:3:season:1", JSON.stringify(episodes1));
	db.set("ss:3:season:2", JSON.stringify(episodes2));
	db.set("ss:4:season:1", JSON.stringify(episodes1));
	db.set("ss:4:season:2", JSON.stringify(episodes2));
	db.set("ss:4:season:3", JSON.stringify(episodes3));
	db.set("ss:5:season:1", JSON.stringify(episodes1));
	db.set("ss:5:season:2", JSON.stringify(episodes2));

	// User Dummies
	var user1 = {
	"id": "1",
	"name": "Ivanka"
	}
	var user2 = {
	"id": "2",
	"name": "Roman"
	}
	var user3 = {
	"id": "3",
	"name": "Markus"
	}
	var user4 = {
	"id": "4",
	"name": "Lisa"
	}
	var user5 = {
	"id": "5",
	"name": "Sabine"
	}
	var user6 = {
	"id": "6",
	"name": "Lukas"
	}
	db.set('user:1', JSON.stringify(user1));
	db.set('user:2', JSON.stringify(user2));
	db.set('user:3', JSON.stringify(user3));
	db.set('user:4', JSON.stringify(user4));
	db.set('user:5', JSON.stringify(user5));
	db.set('user:6', JSON.stringify(user6));
});
