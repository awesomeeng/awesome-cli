// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class LineSplitCommand extends CLICommand {
	constructor() {
		super();
	}

	get description() {
		return "Split content into separate lines.";
	}

	execute(args,options) {
		let content = (options.content||"");
		let lines = content && content.split(/\r\n|\n|\r|\f|\v/g) || [];
		let size = (""+lines.length).length;
		lines.forEach((line,i)=>{
			console.log((""+i).padStart(size,"0")+": "+line);
		});
	}
}

module.exports = LineSplitCommand;
