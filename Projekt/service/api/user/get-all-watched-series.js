function getAllWatchedSeries(app, db) {
	return function(req, res) {
		db.keys("uu:" + req.params.uid + ":watched:*", function(err, rep) {
			var watchedList = [];
			if (rep.length === 0) {
				res.json(watchedList);
				return;
			}
			db.mget(rep, function(err, rep) {
				rep.forEach(function(val) {
					watchedList.push(JSON.parse(val));
				});
				var replies = [];
				watchedList.forEach(function(series) {
					db.get("series:" + series.seriesid, function(seriesError, seriesReply) {
						if (seriesReply) {
							replies.push(JSON.parse(seriesReply));
						}
						if (replies.length === watchedList.length) {
							res.type("json").send({
								replies: replies,
								watched: watchedList
							});
						}
					});
				});
			});
		});
	}
}
module.exports = getAllWatchedSeries;