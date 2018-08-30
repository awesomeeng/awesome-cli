// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("AwesomeCLI").AbstractCommand;


class LineCountCommand extends AbstractCommand {
	constructor() {
		super();

		this.addOption("skipEmpty","boolean",false,"Skip empty/blank lines when counting.");
		this.addOptionShortcut("skip","skipEmpty");
	}

	get title() {
		return "textutils > line > count";
	}

	get usage() {
		return "textutils [global options] line count [options]";
	}

	get description() {
		return "Count the number of lines in the input.";
	}

	execute(args,options) {
		let content = (options.content||"");
		let lines = content && content.split(/\r\n|\n|\r|\f|\v/g) || [];
		if (options.skipEmpty) {
			lines = lines.filter((line)=>{
				return !!line;
			});
		}
		console.log(lines.length);
	}
}

module.exports = LineCountCommand;
