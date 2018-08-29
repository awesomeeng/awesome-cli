// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

// Require AwesomeCLI.
const AwesomeCLI = require("AwesomeCLI");


// Extends AwesomeCLI with your own class. Make sure to...
//
//   1). Provide a config with details about your CLI application.
//
//   2). Add options and shortcuts for user interaction.
//
//   3). Overload the execute method with guts of what you are
//   doing. Note that if you were doing a sub-command CLI
//   application, you wouldn't need to overload execute here.
//
class CLI extends AwesomeCLI {
	constructor() {
		// Here we configure our overall CLI tool.
		super({
			title: "line2words",
			usage: "line2words [options] <text>",
			description: "A simple tool to split the given <text> into words, printing one on word each line."
		});

		// Next we define our user allowed options.
		this.addOption("help","boolean",false,"Show command help.");
		this.addOption("prefix","string","","Prefix each line with the given string.");
		this.addOption("suffix","string","","Suffix each line with the given string.");

		// And we give some easy to use shortcuts.
		this.addOptionShortcut("p","prefix");
		this.addOptionShortcut("s","suffix");
	}

	execute() {
		// We overload the execute method if we are not using sub-commands.
		if (this.options.help) {
			// We need to call help ourselves if the user asks for it.
			this.help();
		}
		else {
			// otherwise, run our command.
			let s = this.args.join(" ").replace(/[^\w\d-\s]/g,"").split(" ");
			s.forEach((word)=>{
				console.log(this.options.prefix+word+this.options.suffix);
			});
		}
	}
}


// Now, we instantiate our new CLI class.
const cli = new CLI();

// We call init to parse the arguments and set the options.
cli.init();

// Finally, we execute() to run our command.
cli.execute();
