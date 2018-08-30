// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("AwesomeCLI").AbstractCommand;


class LineStripCommand extends AbstractCommand {
	constructor() {
		super();
	}

	get title() {
		return "textutils > line > strip";
	}

	get usage() {
		return "textutils [global options] line strip";
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
