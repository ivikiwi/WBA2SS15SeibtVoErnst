function getWatchedSeries(db) {
	return function(req, res) {
		db.get('uu:'+req.params.uid+':watched:'+req.params.id, function(err, rep){
			if(rep) {
				res.type('json').send(rep);
			}
			else {
				res.status(404).type('text').send('Die watched Serie mit der ID '+req.params.id+' wurde nicht gefunden');
			}
		});
	};
}
module.exports = getWatchedSeries;