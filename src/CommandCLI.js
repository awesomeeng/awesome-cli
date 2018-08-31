// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("./AbstractCommand");

class CommandCLI extends AbstractCommand {
	constructor() {
		super();
	}

	get title() {
		return null;
	}

	get description() {
		return null;
	}

	get usage() {
		return null;
	}
}

module.exports = CommandCLI;
