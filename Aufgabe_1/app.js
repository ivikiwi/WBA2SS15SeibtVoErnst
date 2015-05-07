var fs = require('fs');
var chalk = require('chalk');

fs.readFile(__dirname+"/wolkenkratzer.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());

		for(var i in emulated.wolkenkratzer){
			console.log(chalk.green("Name:" + emulated.wolkenkratzer[i].name));
			console.log(chalk.yellow("Stadt:" + emulated.wolkenkratzer[i].stadt));
			console.log(chalk.red("Hoehe:" + emulated.wolkenkratzer[i].hoehe));
			console.log("--------------------------------------")
		}
 });