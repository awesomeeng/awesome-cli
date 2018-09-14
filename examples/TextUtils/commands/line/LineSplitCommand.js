// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("@awesomeeng/awesome-cli").AbstractCommand;


class LineSplitCommand extends AbstractCommand {
	constructor() {
		super();

		this.addOption("number","boolean",false,"Add line numbers before each line.");
		this.addOptionShortcut("n","number");
		this.addOptionShortcut("ln","number");
	}

	get title() {
		return "textutils > line > split";
	}

	get usage() {
		return "textutils [global options] line split [options]";
	}

	get description() {
		return "Split content into separate lines.";
	}

	execute(args,options) {
		let content = (options.content||"");
		let lines = content && content.split(/\r\n|\n|\r|\f|\v/g) || [];
		let size = (""+lines.length).length;
		lines.forEach((line,i)=>{
			console.log((options.number?(""+i).padStart(size,"0")+": ":"")+line);
		});
	}
}

module.exports = LineSplitCommand;
