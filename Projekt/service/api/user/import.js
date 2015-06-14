function register(app, db) {
	app.post("/user", require("./post-user")(db));
	app.get("/user/:id", require("./get-user")(db));
	app.put("/user/:id", require("./put-user")(db));
	app.delete("/user/:id", require("./delete-user")(db));
	app.get("/user", require("./get-all-users")(db));
	app.post("/user/:uid/watched", require("./post-watched-series")(db));
	app.get("/user/:uid/watched/:id", require("./get-watched-series")(db));
	app.put("/user/:uid/watched/:id", require("./put-watched-series")(db));
	app.delete("/user/:uid/watched/:id", require("./delete-watched-series")(db));
	app.get("/user/:uid/watched", require("./get-all-watched-series")(db));
}
module.exports = {
	register: register
};