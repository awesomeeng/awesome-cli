// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

/**
 * Defines the AwesomeCLI main object, whcih returns pointer to the
 * various AwesomeCLI classes.
 */

const AbstractCLI = require("./AbstractCLI");
const AbstractCommand = require("./AbstractCommand");

const CLI = require("./CLI");
const CommandCLI = require("./CommandCLI");

const CLIUtils = require("./CLIUtils");

const BadCommandError = require("./BadCommandError");
const InvalidCommandError = require("./InvalidCommandError");
const InvalidOptionError = require("./InvalidOptionError");
const InvalidOptionValueError = require("./InvalidOptionValueError");
const InvalidTypeError = require("./InvalidTypeError");
const MissingCommandError = require("./MissingCommandError");
const MissingOptionValueError = require("./MissingOptionValueError");

module.exports = {
	AbstractCLI,
	AbstractCommand,
	CLI,
	CommandCLI,
	CLIUtils,
	BadCommandError,
	InvalidCommandError,
	InvalidOptionError,
	InvalidOptionValueError,
	InvalidTypeError,
	MissingCommandError,
	MissingOptionValueError
};
