function getSeriesSearch(app, db) {
	return function(req, res){
		db.keys("series:*", function(err, rep) {
			var seriesList = [];
			var seriesListResults = [];
			if(rep.length == 0) {
				res.json(seriesList);
				return;
			}
			console.log("test"+rep);
			console.log(req.params.term);

			db.mget(rep, function(err, rep) {
				rep.forEach(function(val){
					seriesList.push(JSON.parse(val));
				});



				seriesList = seriesList.map(function(series) {
					var seriesname = series.name;
					seriesname = seriesname.replace(/\s/g, '');
					if( seriesname.toLowerCase().indexOf(req.params.term.toLowerCase()) > -1) {
						seriesListResults.push(series);
					}
				});
				console.log(seriesListResults);


				/*return {
							id: series.id,
							name: series.name,
							description: series.description,
							genre: series.genre,
							bewertung: series.bewertung,
							bewertungssumme: series.bewertungssumme,
							bewertungsanzahl: series.bewertungsanzahl
						};
				*/


				var currentReply = seriesListResults;
				var reply = {
    			series: currentReply
				};



				res.json(reply);
			});
		});
	}
}
module.exports = getSeriesSearch;