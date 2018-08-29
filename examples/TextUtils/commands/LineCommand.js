// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class LineCommand extends CLICommand {
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
		return "line [command]";
	}

	get description() {
		return "Text utilities for working with lines.";
	}

}

module.exports = LineCommand;
