function getAllSeasons(app, db) {
	return function(req, res) {
		db.keys("ss:" + req.params.sid + ":season:*", function(err, rep) {
			var seasonList = [];
			if (rep.length == 0) {
				res.json(seasonList);
				return;
			}
			db.mget(rep, function(err, rep) {
				rep.forEach(function(val) {
					seasonList.push(JSON.parse(val));
				});
				seasonList = seasonList.map(function(season) {
					return {
						id: season.id,
						episodes: season.episodes
					};
				});
				res.json(seasonList);
			});
		});
	};
}
module.exports = getAllSeasons;