function getAllUsers(db) {
	return function(req, res) {
		db.keys('user:*', function(err, rep){
			var userlist = [];

			if(rep.length == 0){
				res.json(userlist);
				return;
			}

			db.mget(rep, function(err, rep){
				rep.forEach(function(val){
					userlist.push(JSON.parse(val));
				});

				userlist = userlist.map(function(user){
					return {id: user.id, name: user.name};
				});
				res.json(userlist);
			});
		});
	};
}
module.exports = getAllUsers;