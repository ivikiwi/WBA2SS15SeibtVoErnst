function register(app) {
	app.get("/cover/:id", require("./get-cover")(app));
	app.get("/css/:stylesheetname", require("./get-css")(app));
	app.get("/js/:jsname", require("./get-js")(app));
	app.get("/bower_components/Chartjs/:fileName", require("./get-bower-chart.js")(app));
	app.get("/bower_components/bootstrap/dist/fonts/:bfonts", require("./get-bootstrap-fonts.js")(app));
	app.get("/bower_components/bootstrap/dist/js/:jsname", require("./get-bootstrap-js.js")(app));
	app.get("/bower_components/bootstrap/dist/css/:stylesheetname", require("./get-bootstrap-css.js")(app));
	app.get("/img/:imgname", require("./get-images.js")(app));
	app.get("/bower_components/jquery/dist/:jsname", require("./get-jquery.js")(app));
	
}
module.exports = {
	register: register
};