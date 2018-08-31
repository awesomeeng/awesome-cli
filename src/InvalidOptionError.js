// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class InvalidOptionError extends Error {
	constructor(name) {
		super(name ? "Invalid option '"+name+"' used." : "Invalid option used.");
	}
}

module.exports = InvalidOptionError;
