// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class WordSplitCommand extends CLICommand {
	constructor() {
		super();
	}

	get description() {
		return "Display all the words in the given content.";
	}

	execute(args,options) {
		let words = (options.content||"").replace(/[^-\w\d\x20\t]+/g," ").split(" ");
		words.forEach((word)=>{
			console.log(word);
		});
	}
}

module.exports = WordSplitCommand;
