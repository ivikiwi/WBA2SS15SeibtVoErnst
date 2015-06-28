function postWatchedSeries(app, db) {
	return function(req, res) {
		var newWatchedSeries = req.body;

		db.incr('uzaehler:'+req.params.uid+':watched', function(err, rep){
		newWatchedSeries.id = rep;

			db.set('uu:'+req.params.uid+':watched:'+newWatchedSeries.id, JSON.stringify(newWatchedSeries), function(err, rep){
				res.json(newWatchedSeries);
			});
		});
	};
}
module.exports = postWatchedSeries;