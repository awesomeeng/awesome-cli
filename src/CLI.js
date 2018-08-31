// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCLI = require("./AbstractCLI");

class CLI extends AbstractCLI {
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

	execute(/*args,options*/) {
	}
}

module.exports = CLI;
