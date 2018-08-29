// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

// Require AwesomeCLI.
const AwesomeCLI = require("AwesomeCLI");

class CLI extends AwesomeCLI {
	constructor() {
		super({
			title: "textutils",
			usage: "textutils [options] <command> [sub-command] <text>",
			description: "A more complex example of AwesomeCLI, this performs a number of text utility functions in one. You may either pipe content"
		});

		this.addCommand("line","./commands/LineCommand.js");
		this.addCommand("word","./commands/WordCommand.js");

		this.addOption("source","string",null,"Specify a source file.");
		this.addOptionShortcut("src","source");
		this.addOptionShortcut("s","source");
	}
}

(async function(){
	try {
		// Now, we instantiate our new CLI class.
		const cli = new CLI();

		// We call init to parse the arguments and set the options.
		cli.init();

		// do some pre-processing on our arguments.
		cli.options.content = null;

		if (cli.options.help) {
			cli.help();
			process.exit(0);
			return;
		}

		if (cli.options.source) {
			cli.options.content = cli.fileRead(cli.options.source);
		}
		else {
			cli.options.content = await cli.stdinRead();
		}

		// Finally, we execute() to run our command.
		cli.start();
	}
	catch (ex) {
		console.error(ex.message);
		process.exit(1);
	}
})();
