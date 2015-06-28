function postUser(app, db) {
	return function(req, res) {
		var newSeries = req.body;

		db.incr('id:u', function(err, rep){
			newSeries.id = rep;

			db.set('user:'+newSeries.id, JSON.stringify(newSeries), function(err, rep){
			res.json(newSeries);
			});
		});
	};
}
module.exports = postUser;