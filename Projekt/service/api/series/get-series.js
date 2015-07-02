function getSeries(app, db) {
	return function(req, res) {
		
		db.get("series:" + req.params.id, function(err, seriesDataRep) {
			var seriesData = seriesDataRep;
			db.get(req.params.id+":sssincr", function(error, seasonsCountRep ) {
				var seasonsCount = seasonsCountRep;
				console.log(seasonsCount);
				var episodeCounts = [];
				for(var i=0; i < seasonsCount; i++) {
					db.get("ss:"+req.params.id+":season:"+i, function(episodeCounterr, episodeCountRep) {
							episodeCounts.push(JSON.parse(episodeCountRep));
						if (seasonsCountRep) {
							res.type("json").send({
								episodes: episodeCounts,
								seriesdata: JSON.parse(seriesData),
								seasons: seasonsCount
							});
						}
						else {
				//res.status(404).type("text").send("Die Serie mit der ID " + req.params.id + " wurde nicht gefunden");
						}
					});
				}

			


			});
		});
	};
}
module.exports = getSeries;