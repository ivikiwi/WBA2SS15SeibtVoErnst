function getSeries(app, db) {
	return function(req, res) {
		
		db.get("series:" + req.params.id, function(err, seriesDataRep) {
			var seriesData = seriesDataRep;
			db.get(req.params.id+":sssincr", function(error, seasonsCountRep ) {
				var seasonsCount = seasonsCountRep;
				console.log(seasonsCount);
			if (seasonsCountRep) {
				res.type("json").send({
					seriesdata: JSON.parse(seriesData),
					seasons: seasonsCount
				});
			}
			else {
			//	res.status(404).type("text").send("Die Serie mit der ID " + req.params.id + " wurde nicht gefunden");
			}


			});
		});
	};
}
module.exports = getSeries;