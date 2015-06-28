function getAllWatchedSeries(db) {
	return function(req, res) {
		db.keys('uu:'+req.params.uid+':watched:*', function(err, rep){
			var watchedlist = [];

			if(rep.length == 0){
				res.json(watchedlist);
				return;
			}

			db.mget(rep, function(err, rep){
				rep.forEach(function(val){
					watchedlist.push(JSON.parse(val));
				});

				watchedlist = watchedlist.map(function(series){
					return {id: series.id, seriesid: series.seriesid, season: series.season, episode: series.episode};
				});


				var currentReply = watchedlist;
				var reply = {
    			watchedseries: currentReply
				};


				res.json(reply);
			});
		});
	};
}
module.exports = getAllWatchedSeries;