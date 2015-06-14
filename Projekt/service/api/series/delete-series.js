function deleteSeries(db) {
	return function(req, res) {
		db.del("series:" + req.params.id, function(err, rep) {
			if (rep == 1) {
				res.status(200).type("text").send("OK");
			}
			else {
				res.status(404).type("text").send("Die Serie mit der ID " + req.params.id + " wurde nicht gefunden");
			}
		});
	};
}
module.exports = deleteSeries;