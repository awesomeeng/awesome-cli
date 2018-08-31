// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class BadCommandError extends Error {
	constructor(name) {
		super("Bad command '"+name+"'.");
	}
}

module.exports = BadCommandError;
