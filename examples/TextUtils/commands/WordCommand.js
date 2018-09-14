// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("@awesomeeng/awesome-cli").AbstractCommand;
const AwesomeUtils = require("@awesomeeng/awesome-utils");

class WordCommand extends AbstractCommand {
	constructor() {
		super();

		this.addCommand("count",AwesomeUtils.Module.resolve(module,"./word/WordCountCommand.js"));
		this.addCommand("freq",AwesomeUtils.Module.resolve(module,"./word/WordFrequencyCommand.js"));
		this.addCommand("frequency",AwesomeUtils.Module.resolve(module,"./word/WordFrequencyCommand.js"));
		this.addCommand("split",AwesomeUtils.Module.resolve(module,"./word/WordSplitCommand.js"));
		this.addCommand("unique",AwesomeUtils.Module.resolve(module,"./word/WordUniqueCommand.js"));
	}

	get title() {
		return "word";
	}

	get usage() {
		return "word [command]";
	}

	get description() {
		return "Text utilities for working with words.";
	}

	execute() {
		this.help();
	}
}

module.exports = WordCommand;
