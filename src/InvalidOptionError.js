// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when an option is used when executing the CLI but that option does
 * not exist or is otherwise not allowed.
 * 
 * @extends Error
 */
class InvalidOptionError extends Error {
	constructor(name) {
		super(name ? "Invalid option '"+name+"' used." : "Invalid option used.");
	}
}

module.exports = InvalidOptionError;
