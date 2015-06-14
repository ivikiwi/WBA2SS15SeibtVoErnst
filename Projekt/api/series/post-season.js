function postSeason(db) {
	return function(req, res){
		var newSeason = req.body;
		db.incr(req.params.sid + ":sssincr", function(err, rep) {
		newSeason.id = rep;
			db.set("ss:" + req.params.sid + ":season:" + newSeason.id, JSON.stringify(newSeason), function(err, rep) {
				res.json(newSeason);
			});
		});
	}
}
module.exports = postSeason;