// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class InvalidTypeError extends Error {
	constructor(name) {
		super(name ? "Invalid option type '"+name+"' used." : "Invalid option type used.");
	}
}

module.exports = InvalidTypeError;
