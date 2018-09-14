// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("@awesomeeng/awesome-cli").AbstractCommand;


class WordSplitCommand extends AbstractCommand {
	constructor() {
		super();
	}

	get title() {
		return "textutils > word > split";
	}

	get usage() {
		return "textutils [global options] word split";
	}

	get description() {
		return "Display all the words in the given content.";
	}

	execute(args,options) {
		let words = (options.content||"").replace(/[^-\w\d\x20\t]+/g," ").split(" ");
		words.forEach((word)=>{
			if (word) console.log(word);
		});
	}
}

module.exports = WordSplitCommand;
