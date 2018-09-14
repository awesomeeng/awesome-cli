// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

// Require AwesomeCLI.
const AwesomeCLI = require("@awesomeeng/awesome-cli");
const AwesomeUtils = require("@awesomeeng/awesome-utils");

class CLI extends AwesomeCLI.CommandCLI {
	constructor() {
		super();

		this.addCommand("line",AwesomeUtils.Module.resolve(module,"./commands/LineCommand.js"));
		this.addCommand("word",AwesomeUtils.Module.resolve(module,"./commands/WordCommand.js"));

		this.addOption("source","string",null,"Specify a source file.");
		this.addOptionShortcut("src","source");
		this.addOptionShortcut("s","source");
	}

	get title() {
		return "textutils";
	}

	get description() {
		return "A set of text file utilities for getting more from the text content.";
	}

	get usage() {
		return "textutils [global options] [command]";
	}

	before(args,options) {
		return new Promise(async (resolve,reject)=>{
			try {
				options.content = null;

				if (options.help) {
					this.help();
					process.exit(0);
					return;
				}

				if (options.source) {
					options.content = await AwesomeCLI.CLIUtils.readFile(options.source);
				}
				else {
					options.content = await AwesomeCLI.CLIUtils.readSTDIN();
				}

				resolve();
			}
			catch (ex) {
				return reject(ex);
			}
		});
	}
}

const cli = new CLI();
cli.run();
