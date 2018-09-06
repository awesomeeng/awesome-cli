// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown if a command that is being added is not a Function,
 * AbstractCommand, or filename string.
 * 
 * @extends Error
 */
class InvalidCommandError extends Error {
	constructor(name) {
		super("Invalid command '"+name+"'.");
	}
}

module.exports = InvalidCommandError;
