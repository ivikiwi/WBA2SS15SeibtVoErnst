function getSeason(app, db) {
	return function(req, res) {
		db.get("ss:" + req.params.sid + ":season:" + req.params.id, function(err, rep) {
			if (rep) {
				res.type("json").send(rep);
			}
			else {
				res.status(404).type("text").send("Die Staffel mit der ID " + req.params.id + " wurde nicht gefunden");
			}
		});
	};
}
module.exports = getSeason;