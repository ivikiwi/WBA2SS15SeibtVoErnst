function postUser(app, db) {
	return function(req, res) {
		var newUser = req.body;

		db.incr('id:u', function(err, rep){
			newUser.id = rep;

			db.set('user:'+newUser.id, JSON.stringify(newUser), function(err, rep){
			res.json(newUser);
			});
		});
	};
}
module.exports = postUser;