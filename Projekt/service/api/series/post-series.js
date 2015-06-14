function postSeries(db) {
	return function(req, res) {
		var newSeries = req.body;
		db.incr("id:ss", function(err, rep) {
			newSeries.id = rep;
			db.set("series:" + newSeries.id, JSON.stringify(newSeries), function(err, rep) {
				res.json(newSeries);
			});
		});
	};
}
module.exports = postSeries;