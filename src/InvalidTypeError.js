// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Thrown when an option is being added but the given type is not
 * "*" or "string" or "number" or "boolean".
 * 
 * @extends Error
 */
class InvalidTypeError extends Error {
	constructor(name) {
		super(name ? "Invalid option type '"+name+"' used." : "Invalid option type used.");
	}
}

module.exports = InvalidTypeError;
