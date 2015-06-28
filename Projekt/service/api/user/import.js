function register(app, db) {
	app.post("/user", require("./post-user")(app, db));
	app.get("/user/:id", require("./get-user")(app, db));
	app.put("/user/:id", require("./put-user")(app, db));
	app.delete("/user/:id", require("./delete-user")(app, db));
	app.get("/user", require("./get-all-users")(app, db));
	app.post("/user/:uid/watched", require("./post-watched-series")(app, db));
	app.get("/user/:uid/watched/:id", require("./get-watched-series")(app, db));
	app.put("/user/:uid/watched/:id", require("./put-watched-series")(app, db));
	app.delete("/user/:uid/watched/:id", require("./delete-watched-series")(app, db));
	app.get("/user/:uid/watched", require("./get-all-watched-series")(app, db));
}
module.exports = {
	register: register
};