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
	"genre": "Action, Drama, Anwaltserie",
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
	var newSeries6 = {
	"id": "6",
	"name": "Suits",
	"genre": "Anwaltserie",
	"description": "Junger Drogendealer mit fotografischem Gedächtnis wird Anwalt"
	}
	var newSeries7 = {
	"id": "7",
	"name": "Game of Thrones",
	"genre": "Fantasy, Action, Drama",
	"description": "Der Kampf auf den Thron"
	}
   	db.set("series:1", JSON.stringify(newSeries1));
	db.set("series:2", JSON.stringify(newSeries2));
	db.set("series:3", JSON.stringify(newSeries3));
	db.set("series:4", JSON.stringify(newSeries4));
	db.set("series:5", JSON.stringify(newSeries5));
	db.set("series:6", JSON.stringify(newSeries6));
	db.set("series:7", JSON.stringify(newSeries7));
	// Episode Dummies
	var ss1season1 = {
	"id": "1",
	"episodes": "24",
	"seriesid": "1"
	}
	var ss1season2 = {
	"id": "2",
	"episodes": "16",
	"seriesid": "1"
	}
	var ss2season1 = {
	"id": "1",
	"episodes": "21",
	"seriesid": "2"
	}
	var ss2season2 = {
	"id": "2",
	"episodes": "12",
	"seriesid": "2"
	}
	var ss2season3 = {
	"id": "3",
	"episodes": "16",
	"seriesid": "2"
	}
	var ss3season1 = {
	"id": "1",
	"episodes": "21",
	"seriesid": "3"
	}
	var ss3season2 = {
	"id": "2",
	"episodes": "26",
	"seriesid": "3"
	}
	var ss4season1 = {
	"id": "1",
	"episodes": "32",
	"seriesid": "4"
	}
	var ss4season2 = {
	"id": "2",
	"episodes": "15",
	"seriesid": "4"
	}
	var ss4season3 = {
	"id": "3",
	"episodes": "11",
	"seriesid": "4"
	}
	var ss5season1 = {
	"id": "1",
	"episodes": "16",
	"seriesid": "5"
	}
	var ss5season2 = {
	"id": "2",
	"episodes": "21",
	"seriesid": "5"
	}
	var ss6season1 = {
	"id": "1",
	"episodes": "12",
	"seriesid": "6"
	}
	var ss6season2 = {
	"id": "2",
	"episodes": "18",
	"seriesid": "6"
	}
	var ss6season3 = {
	"id": "3",
	"episodes": "12",
	"seriesid": "6"
	}
	var ss6season4 = {
	"id": "4",
	"episodes": "16",
	"seriesid": "6"
	}
	var ss7season1 = {
	"id": "1",
	"episodes": "21",
	"seriesid": "7"
	}
	var ss7season2 = {
	"id": "2",
	"episodes": "16",
	"seriesid": "7"
	}
	var ss7season3 = {
	"id": "3",
	"episodes": "12",
	"seriesid": "7"
	}
	var ss7season4 = {
	"id": "4",
	"episodes": "21",
	"seriesid": "7"
	}
	db.set("ss:1:season:1", JSON.stringify(ss1season1));
	db.set("ss:1:season:2", JSON.stringify(ss1season2));
	db.set("ss:2:season:1", JSON.stringify(ss2season1));
	db.set("ss:2:season:2", JSON.stringify(ss2season2));
	db.set("ss:2:season:3", JSON.stringify(ss2season3));
	db.set("ss:3:season:1", JSON.stringify(ss3season1));
	db.set("ss:3:season:2", JSON.stringify(ss3season2));
	db.set("ss:4:season:1", JSON.stringify(ss4season1));
	db.set("ss:4:season:2", JSON.stringify(ss4season2));
	db.set("ss:4:season:3", JSON.stringify(ss4season3));
	db.set("ss:5:season:1", JSON.stringify(ss5season1));
	db.set("ss:5:season:2", JSON.stringify(ss5season2));
	db.set("ss:6:season:1", JSON.stringify(ss6season1));
	db.set("ss:6:season:2", JSON.stringify(ss6season2));
	db.set("ss:6:season:3", JSON.stringify(ss6season3));
	db.set("ss:6:season:4", JSON.stringify(ss6season4));
	db.set("ss:7:season:1", JSON.stringify(ss7season1));
	db.set("ss:7:season:2", JSON.stringify(ss7season2));
	db.set("ss:7:season:3", JSON.stringify(ss7season3));
	db.set("ss:7:season:4", JSON.stringify(ss7season4));

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
