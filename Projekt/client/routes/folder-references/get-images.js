function getImages(app) {
	return function(req, res, next) {		
  		var options = {
    		root: __dirname + "../../../img/",
    		dotfiles: "deny",
    		headers: {
        		"x-timestamp": Date.now(),
        		"x-sent": true
    		}
  		};

  		var fileName = req.params.imgname;
  		res.sendFile(fileName, options, function (err) {
    		if (err) {
      			console.log(err);
      			res.status(err.status).end();
    		} else {
      			//console.log('Sent:', fileName);
    		}
  		});
	};
}
module.exports = getImages;