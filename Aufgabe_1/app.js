var fs = require('fs');

fs.readFile(__dirname+"/wolkenkratzer.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());
		}

		
 });