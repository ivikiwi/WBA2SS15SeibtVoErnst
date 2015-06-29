function getSeries(app, db) {
	return function(req, res) {
		
		db.get("series:" + req.params.id, function(err, seriesDataRep) {
			var seriesData = seriesDataRep;
			db.get(req.params.id+":sssincr", function(error, seasonsCountRep){
					var seasonsCount = seasonsCountRep;
					console.log(seasonCount);

			if(seasonsCountRep) {
				res.type("json").send({
					seriesdata: JSON.parse(seriesData),
					seasons: seasonsCount
				});
			}
			});
		});
	}
}
			
module.exports = getSeries;