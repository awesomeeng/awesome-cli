// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("AwesomeCLI").AbstractCommand;


class WordCommand extends AbstractCommand {
	constructor() {
		super();

		this.addCommand("count","./commands/word/WordCountCommand.js");
		this.addCommand("freq","./commands/word/WordFrequencyCommand.js");
		this.addCommand("frequency","./commands/word/WordFrequencyCommand.js");
		this.addCommand("split","./commands/word/WordSplitCommand.js");
		this.addCommand("unique","./commands/word/WordUniqueCommand.js");
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
