// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class WordCountCommand extends CLICommand {
	constructor() {
		super();
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
