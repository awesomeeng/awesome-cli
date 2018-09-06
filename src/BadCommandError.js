// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when a command fails to compile or execute properly.
 * 
 * @extends Error
 */
class BadCommandError extends Error {
	constructor(name) {
		super("Bad command '"+name+"'.");
	}
}

module.exports = BadCommandError;
