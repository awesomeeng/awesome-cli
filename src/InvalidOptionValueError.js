// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when a user of the CLI passes in a value to the CLI
 * that does not match the given type for the option, for example
 * passing a string when a number is required.
 * 
 * @extends Error
 */
class InvalidOptionValueError extends Error {
	constructor() {
		super("Invalid option value.");
	}
}

module.exports = InvalidOptionValueError;
