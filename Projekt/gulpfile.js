var gulp = require("gulp");
var eslint = require("gulp-eslint");
var jsFiles = "**/*.js";
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