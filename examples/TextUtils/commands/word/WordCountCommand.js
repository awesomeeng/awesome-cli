// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("@awesomeeng/awesome-cli").AbstractCommand;


class WordCountCommand extends AbstractCommand {
	constructor() {
		super();
	}

	get title() {
		return "textutils > word > count";
	}

	get usage() {
		return "textutils [global options] word count";
	}

	get description() {
		return "Count the number of lines in the input.";
	}

	execute(args,options) {
		let words = (options.content||"").replace(/[^\w\d-\s]/g,"").split(" ");
		console.log(words.length-1);
	}
}

module.exports = WordCountCommand;
