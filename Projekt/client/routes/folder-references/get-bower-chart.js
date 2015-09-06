function getChartJS(app) {
	return function(req, res, next) {		
  		var options = {
      		root: __dirname + "../../../../bower_components/Chart.js",
    		dotfiles: "deny",
    		headers: {
    		    "x-timestamp": Date.now(),
    		    "x-sent": true
    		}
  		};


  		var fileName = req.params.fileName;
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
module.exports = getChartJS;