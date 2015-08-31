function register(app, db) {
	app.post("/series", require("./post-series")(app, db));
	app.get("/series/:id", require("./get-series")(app, db));
	app.put("/series/:id", require("./change-series")(app, db));
	app.delete("/series/:id", require("./delete-series")(app, db));
	app.get("/series", require("./get-all-series")(app, db));
	app.get("/series/name/:id", require("./get-series-name")(app, db));
	app.get("/series/description/:id", require("./get-series-description")(app, db));
	app.post("/series/:sid/season", require("./post-season")(app, db));
	app.get("/series/:sid/season/:id", require("./get-season")(app, db));
	app.put("/series/:sid/season/:id", require("./change-season")(app, db));
	app.delete("/series/:sid/season/:id", require("./delete-season")(app, db));
	app.get("/series/:sid/season", require("./get-all-seasons")(app, db));
	app.get("/allseasons", require("./get-all-series-seasons")(app, db));
}
module.exports = {
	register: register
};