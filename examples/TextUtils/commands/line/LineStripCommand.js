// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class LineStripCommand extends CLICommand {
	constructor() {
		super();
	}

	get description() {
		return "Split content into separate lines.";
	}

	execute(args,options) {
		let content = (options.content||"");
		let lines = content && content.split(/\r\n|\n|\r|\f|\v/g) || [];
		lines = lines.filter((line)=>{
			return !!line;
		});
		lines.forEach((line)=>{
			console.log(line);
		});
	}
}

module.exports = LineStripCommand;
