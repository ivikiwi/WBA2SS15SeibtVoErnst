var fs = require('fs');

fs.readFile(__dirname+"/wolkenkratzer.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());

		for(var i in emulated.wolkenkratzer){
			console.log("Name"+emulated.wolkenkratzer[i].name);
			console.log("Stadt:"+emulated.wolkenkratzer[i].stadt);
			console.log("Hoehe:"+emulated.wolkenkratzer[i].hoehe);
			console.log("--------------------------------------")
		}
 });