// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class MissingOptionValueError extends Error {
	constructor(name) {
		super(name ? "Missing option value for '"+name+"'." : "Missing option value.");
	}
}

module.exports = MissingOptionValueError;
