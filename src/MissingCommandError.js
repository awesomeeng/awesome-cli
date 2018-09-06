// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when a command CLI gets a command it does not have
 * a command mapped to.
 * 
 * @extends Error
 */
class MissingCommandError extends Error {
	constructor() {
		super("Missing command.");
	}
}

module.exports = MissingCommandError;
