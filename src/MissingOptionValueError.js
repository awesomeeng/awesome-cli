// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when a user of the CLI gives a specific option but
 * does not follow it with a required argument.
 * 
 * @extends Error
 */
class MissingOptionValueError extends Error {
	constructor(name) {
		super(name ? "Missing option value for '"+name+"'." : "Missing option value.");
	}
}

module.exports = MissingOptionValueError;
