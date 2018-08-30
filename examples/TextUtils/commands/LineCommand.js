// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("AwesomeCLI").AbstractCommand;

class LineCommand extends AbstractCommand {
	constructor() {
		super();

		this.addCommand("count","./commands/line/LineCountCommand.js");
		this.addCommand("split","./commands/line/LineSplitCommand.js");
		this.addCommand("strip","./commands/line/LineStripCommand.js");
	}

	get title() {
		return "line";
	}

	get usage() {
		return "textutils [global options] line [command]";
	}

	get description() {
		return "Text utilities for working with lines.";
	}

	execute() {
		this.help();
	}
}

module.exports = LineCommand;
