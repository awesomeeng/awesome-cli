// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AbstractCommand = require("./AbstractCommand");

/**
 * THe root command for a command based CLI that uses sub-commands.
 *
 * @extends AbstractCommand
 */
class CommandCLI extends AbstractCommand {
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
}

module.exports = CommandCLI;
