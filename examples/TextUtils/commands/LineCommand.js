// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("@awesomeeng/awesome-cli").AbstractCommand;
const AwesomeUtils = require("@awesomeeng/awesome-utils");

class LineCommand extends AbstractCommand {
	constructor() {
		super();

		this.addCommand("count",AwesomeUtils.Module.resolve(module,"./line/LineCountCommand.js"));
		this.addCommand("split",AwesomeUtils.Module.resolve(module,"./line/LineSplitCommand.js"));
		this.addCommand("strip",AwesomeUtils.Module.resolve(module,"./line/LineStripCommand.js"));
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
