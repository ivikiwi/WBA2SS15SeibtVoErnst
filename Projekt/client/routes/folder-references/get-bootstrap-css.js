function getBootstrapCSS(app) {
	return function(req, res, next) {		
  		var options = {
    		root: __dirname + "../../../../bower_components/bootstrap/dist/css",
    		dotfiles: "deny",
    		headers: {
        		"x-timestamp": Date.now(),
        		"x-sent": true
    		}
  		};
  		var fileName = req.params.stylesheetname;
  		res.sendFile(fileName, options, function (err) {
    		if (err) {
    		  	console.log(err);
      			res.status(err.status).end();
    		} else {
      			//console.log('Sent:', options.root + "" +fileName);
   	 		}
  		});
	};
}
module.exports = getBootstrapCSS;