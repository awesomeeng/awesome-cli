// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class MissingCommandError extends Error {
	constructor() {
		super("Missing command.");
	}
}

module.exports = MissingCommandError;
