function getAllSeriesSeasons(app, db) {
	return function(req, res) {
		db.keys("ss:*:season:*", function(err, rep) {
			var seasonList = [];
			if (rep.length == 0) {
				res.json(seasonList);
				return;
			}
			console.log(rep);
			db.mget(rep, function(err, rep) {
				rep.forEach(function(val) {
					console.log(val);
					seasonList.push(JSON.parse(val));
				});
				seasonList = seasonList.map(function(season) {
					return {
						id: season.id,
						episodes: season.episodes,
						seriesid: season.seriesid
					};
				});
				var currentReply = seasonList;
				var reply = {
    			seasons: currentReply
				};

				res.json(reply);
			});
		});
	};
}
module.exports = getAllSeriesSeasons;