// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class InvalidCommandError extends Error {
	constructor(name) {
		super("Invalid command '"+name+"'.");
	}
}

module.exports = InvalidCommandError;
