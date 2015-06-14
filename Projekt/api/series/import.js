function register(app, db) {
	app.post("/series", require("./post-series")(db));
	app.get("/series/:id", require("./get-series")(db));
	app.put("/series/:id", require("./change-series")(db));
	app.delete("/series/:id", require("./delete-series")(db));
	app.get("/series", require("./get-all-series")(db));
	app.get("/series/name/:id", require("./get-series-name")(db));
	app.get("/series/description/:id", require("./get-series-description")(db));
	app.post("/series/:sid/season", require("./post-season")(db));
	app.get("/series/:sid/season/:id", require("./get-season")(db));
	app.put("/series/:sid/season/:id", require("./change-season")(db));
	app.delete("/series/:sid/season/:id", require("./delete-season")(db));
	app.get("/series/:sid/season", require("./get-all-seasons")(db));
}
module.exports = {
	register: register
};