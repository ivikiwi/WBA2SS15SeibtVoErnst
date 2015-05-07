var fs = require('fs');

fs.readFile(__dirname+"/wolkenkratzer.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());

		for(var i in emulated.wolkenkratzer){
			console.log(emulated.wolkenkratzer[i].name);
			console.log(emulated.wolkenkratzer[i].stadt);
			console.log(emulated.wolkenkratzer[i].hoehe);
		}
 });