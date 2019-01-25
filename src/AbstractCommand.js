// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const AwesomeUtils = require("@awesomeeng/awesome-utils");

const AbstractCLI = require("./AbstractCLI");
const CLIUtils = require("./CLIUtils");

const InvalidOptionError = require("./InvalidOptionError");
const InvalidTypeError = require("./InvalidTypeError");
const MissingOptionValueError = require("./MissingOptionValueError");
const InvalidOptionValueError = require("./InvalidOptionValueError");
const InvalidCommandError = require("./InvalidCommandError");
const BadCommandError = require("./BadCommandError");
const MissingCommandError = require("./MissingCommandError");

const $COMMANDS = Symbol("commands");

/**
 * Defines the shape of a command, be it a sub-command, or the root command
 * overloaded from `AwesomeCLI.CLI` or `AwesomeCLI.CommandCLI`.  While
 * root commands should inherit from `AwesomeCLI.CLI` or `AwesomeCLI.CommandCLI`
 * any sub-commands below those would inherit directly from `AbstractCommand`.
 *
 * AbstractCommand inherits from AbstractCLI and thus has access to all of its
 * methods such as title, usage, desriptino, addOption, addOptionShortcut, etc.
 *
 * @extends AbstractCLI
 */
class AbstractCommand extends AbstractCLI {
	/**
	 * Constructs a new AbstractCommand.
	 */
	constructor() {
		super();

		this[$COMMANDS] = null;
	}

	/**
	 * Returns the title of this AbstractCommand. Should be overloaded
	 * by extending classes.
	 *
	 * @return {string}
	 */
	get title() {
		return null;
	}

	/**
	 * Returns the description of this AbstractCommand. Should be overloaded
	 * by extending classes.
	 *
	 * @return {string}
	 */
	get description() {
		return null;
	}

	/**
	 * Returns the usage of this AbstractCommand. Should be overloaded
	 * by extending classes.
	 *
	 * @return {string}
	 */
	get usage() {
		return null;
	}

	/**
	 * The default help implementation for a AbstractCommand. Overload this
	 * if you want to customize your help display.
	 *
	 * @return {void}
	 */
	help() {
		super.help();

		let cmds = this.getCommands();
		if (cmds.length>0) {
			console.log("Commands: ");
			console.log();

			cmds = cmds.map((name)=>{
				let command = this.getCommand(name);
				let instance = getCommandInstance(command);
				return { name,instance,command };
			});

			let size = 0;
			cmds.forEach((command)=>{
				size = Math.max(size,command.name.length+2);
			});

			cmds.forEach((command)=>{
				let initial = "  "+command.name;
				console.log(initial.padEnd(size)+(command && command.instance && command.instance.description && " : "+command.instance.description|| ""));
			});

			console.log();
		}
	}

	/**
	 * Add a new sub-command to this command.
	 *
	 * **name** the name of the command, as it would be used.
	 *
	 * **command** the command itself, which can be the following:
	 *
	 *  - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".
	 *
	 *  - **filenane** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**
	 *
	 * 	- **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.
	 *
	 * **description** Help descriptive text for this command.
	 *
	 * @param {string} name
	 * @param {(Function|AbstractCommand|string)} command
	 * @param {string}
	 */
	addCommand(name,command,description="") {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");
		if (!command) throw new Error("Missing command.");
		if (typeof command!=="string" && !(command instanceof Function)) throw new Error("Invalid command.");

		if (typeof command==="string") {
			let resolved = CLIUtils.resolve(command);
			if (!resolved) throw new Error("File not found for command: "+command+".");
			if (!resolved.stat.isFile()) throw new Error("Invalid file: "+resolved.filename+".");
			command = resolved.filename;
		}

		this[$COMMANDS] = this[$COMMANDS] || {};
		this[$COMMANDS][name] = {
			name,
			command,
			description
		};
	}

	/**
	 * Remove a command by name.
	 *
	 * @param  {string} name
	 * @return {void}
	 */
	removeCommand(name) {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");

		if (!this[$COMMANDS]) return null;
		delete this[$COMMANDS][name];
		if (Object.keys(this[$COMMANDS]).length<1) this[$COMMANDS] = null;
	}

	/**
	 * Get the command object for a given command name.
	 *
	 * @param  {string} name
	 * @return {Object}
	 */
	getCommand(name) {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");

		if (!this[$COMMANDS]) return null;
		return this[$COMMANDS][name] || null;
	}

	/**
	 * Returns an array of all command names for this particular command. Does
	 * not return commands defined by ancestor commands.
	 *
	 * @return {Array<string>}
	 */
	getCommands() {
		if (!this[$COMMANDS]) return [];
		return Object.keys(this[$COMMANDS]);
	}

	/**
	 * Executes the given command. Generally speaking you should not
	 * overload this function but instead overload `execute(args,options)` or
	 * `before(args,options)` or `after(args,options)`.
	 *
	 * @param  {Array} args
	 * @param  {Object} options
	 * @return {Promise}
	 */
	run(args,options) {
		return new Promise(async (resolve)=>{
			try {
				({args,options} = this.init(args,options));

				// before
				if (this.before && this.before instanceof Function) {
					let prom = this.before.call(this,args,options);
					if (prom instanceof Promise) await prom;
				}

				// command or execute
				let ranCommand = false;

				// look for a command, run if found
				if (args.length>0) {
					let name = args[0];
					let remainder = args.slice(1);

					let command = this.getCommand(name);
					if (!command && name.toLowerCase()==="help") {
						this.help();
						ranCommand = true;
					}
					else if (command) {
						if (!command.command) throw new this.InvalidCommandError(name);

						let instance = getCommandInstance.call(this,command);
						if (!instance && command instanceof Function) instance = command;
						if (!instance) throw new BadCommandError(name);

						if (instance instanceof AbstractCommand) {
							await instance.run(remainder,options);
							ranCommand = true;
						}
						else if (instance instanceof Function) {
							let prom = instance(remainder,options);
							if (prom instanceof Promise) await prom;
							ranCommand = true;
						}
						else {
							throw new InvalidCommandError(name);
						}
					}
				}

				// no command, then execute
				if (!ranCommand && this.execute && this.execute instanceof Function) {
					let prom = this.execute.call(this,args,options);
					if (prom instanceof Promise) await prom;
				}
				else if (!ranCommand) {
					throw new InvalidCommandError(args[0]||"");
				}

				// after
				if (this.after && this.after instanceof Function) {
					let prom = this.after.call(this,args,options);
					if (prom instanceof Promise) await prom;
				}

				resolve();
			}
			catch (ex) {
				if (
					ex instanceof BadCommandError ||
					ex instanceof InvalidCommandError ||
					ex instanceof InvalidOptionError ||
					ex instanceof InvalidOptionValueError ||
					ex instanceof InvalidTypeError ||
					ex instanceof MissingCommandError ||
					ex instanceof MissingOptionValueError
				) {
					console.error(ex);
				}
				else {
					console.error(ex);
				}
				process.exit(255);
			}
		});
	}
}

const getCommandInstance = function getCommandInstance(command) {
	let exported = null;
	if (command instanceof Function) return null;
	else exported = require(command.command);
	if (!exported) throw new BadCommandError(command.name);

	let instance = null;
	if (!AwesomeUtils.Class.isClass(exported) && exported instanceof AbstractCommand) instance = exported;
	else if (AwesomeUtils.Class.isClass(exported) && AbstractCommand.isPrototypeOf(exported)) instance = new exported();

	return instance;
};

module.exports = AbstractCommand;
