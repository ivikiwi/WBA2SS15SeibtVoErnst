function getSeriesDescription(db) {
	return function(req, res) {
		db.get("series:" + req.params.id, function(err, rep) {
			var serie = [];
			if (rep) {
				serie.push(JSON.parse(rep));
				serie = serie.map(function(series) {
					return {
						description: series.description
					};
				});
				res.json(serie);
			}
			else {
				res.status(404).type("text").send("Die Serie mit der ID " + req.params.id + " wurde nicht gefunden.");
			}
		});
	}
}
module.exports = getSeriesDescription;