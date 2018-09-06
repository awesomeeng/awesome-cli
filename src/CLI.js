// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCLI = require("./AbstractCLI");

/**
 * The root command for a singular CLI that is not using
 * sub-commands.
 *
 * @extends AbstractCLI
 */
class CLI extends AbstractCLI {
	/**
	 * Constructs a new CLI.
	 */
	constructor() {
		super();
	}

	/**
	 * Returns the title of this root CLI. Should be overloaded
	 * by extending classes.
	 *
	 * @return {string}
	 */
	get title() {
		return null;
	}

	/**
	 * Returns the description of this root CLI. Should be overloaded
	 * by extending classes.
	 *
	 * @return {string}
	 */
	get description() {
		return null;
	}

	/**
	 * Returns the usage of this root CLI. Should be overloaded
	 * by sxtending classes.
	 *
	 * @return {string}
	 */
	get usage() {
		return null;
	}

	/**
	 * Overload `execute(args,options)` to do your work.
	 *
	 * @return {[type]} [description]
	 */
	execute(/*args,options*/) {
	}
}

module.exports = CLI;
