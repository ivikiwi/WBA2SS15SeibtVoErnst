function deleteUser(app, db) {
	return function(req, res) {
		db.del('user:'+req.params.id, function(err, rep){
			if(rep==1){
				res.status(200).type('text').send('OK');
			}
			else {
				res.status(404).type('text').send('Der User mit der ID '+req.params.id+' wurde nicht gefunden');
			}
		});
	};
}
module.exports = deleteUser;