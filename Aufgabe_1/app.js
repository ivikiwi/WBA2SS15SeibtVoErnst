var fs = require('fs');
var chalk = require('chalk');

fs.readFile(__dirname+"/wolkenkratzer.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());

			emulated.wolkenkratzer.sort(function(a,b) {

				if (a.hoehe > b.hoehe) {
   					return 1;
  				}
  				if (a.hoehe < b.hoehe) {
    				return -1;
  				}
  				// a must be equal to b
  					return 0;
				}
			);

		for(var i in emulated.wolkenkratzer){
			console.log(chalk.green("Name:" + emulated.wolkenkratzer[i].name));
			console.log(chalk.yellow("Stadt:" + emulated.wolkenkratzer[i].stadt));
			console.log(chalk.red("Hoehe:" + emulated.wolkenkratzer[i].hoehe));
			console.log("--------------------------------------");
		}
 });