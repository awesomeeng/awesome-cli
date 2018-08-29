// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class WordUniqueCommand extends CLICommand {
	constructor() {
		super();
	}

	get description() {
		return "Display all unique words in the given content.";
	}

	execute(args,options) {
		let words = (options.content||"").replace(/[^-\w\d\x20\t]+/g," ").split(" ");
		let unique = {};
		words.forEach((word)=>{
			word = word.toLowerCase().trim();
			if (!word) return;

			unique[word] = unique[word] && unique[word] + 1 || 1;
		});
		Object.keys(unique).sort().forEach((word)=>{
			console.log(word);
		});
	}
}

module.exports = WordUniqueCommand;
