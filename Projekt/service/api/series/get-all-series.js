function getAllSeries(db) {
	return function(req, res){
		db.keys("series:*", function(err, rep) {
			var seriesList = [];
			if(rep.length == 0) {
				res.json(seriesList);
				return;
			}
			console.log(rep);
			db.mget(rep, function(err, rep) {
				rep.forEach(function(val){
					seriesList.push(JSON.parse(val));
				});
				seriesList = seriesList.map(function(series) {
					return {
						id: series.id,
						name: series.name,
						description: series.description,
						genre: series.genre
					};
				});

				var currentReply = seriesList;
				var reply = {
    			series: currentReply
				};



				res.json(reply);
			});
		});
	}
}
module.exports = getAllSeries;