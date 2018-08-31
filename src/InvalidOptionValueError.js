// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

class InvalidOptionValueError extends Error {
	constructor() {
		super("Invalid option value.");
	}
}

module.exports = InvalidOptionValueError;
