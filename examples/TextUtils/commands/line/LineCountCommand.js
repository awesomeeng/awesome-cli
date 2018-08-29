// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class LineCountCommand extends CLICommand {
	constructor() {
		super();
	}

	get description() {
		return "Count the number of lines in the input.";
	}

	execute(args,options) {
		let content = (options.content||"");
		let lines = content && content.split(/\r\n|\n|\r|\f|\v/g) || [];
		console.log(lines.length);
	}
}

module.exports = LineCountCommand;
