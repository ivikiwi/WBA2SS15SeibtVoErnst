function getCover(app) {
	return function(req, res, next) {
		var options = {
    		root: __dirname + "../../../img/series/cover/",
    		dotfiles: "deny",
   		 	headers: {
        	"x-timestamp": Date.now(),
        	"x-sent": true
    		}
  		};

  		var fileName = req.params.id+'.jpg';
  		res.sendFile(fileName, options, function (err) {
    		if (err) {
      		console.log(err);
      		res.status(err.status).end();
    		} else {
     	 		console.log('Sent:', fileName);
    		}
  		});

	};
}
module.exports = getCover;