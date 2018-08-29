// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const Path = require("path");
const FS = require("fs");

const AwesomeUtils = require("AwesomeUtils");

const $COMMANDS = Symbol("commands");

class CLICommand {
	constructor() {
		this[$COMMANDS] = null;
	}

	get title() {
		// to be implemented as needed.
		return null;
	}

	get usage() {
		// to be implemented as needed.
		return null;
	}

	get description() {
		// to be implemented as needed.
		return null;
	}

	before(/*args,options*/) {
		// to be implemented as needed.
	}

	after(/*args,options*/) {
		// to be implemented as needed.
	}

	execute(/*args,options*/) {
		this.help();
	}

	help() {
		console.log();

		let title = this.parent && this.parent.config && this.parent.config.title || this.config && this.config.title || this.title;
		if (title) {
			console.log(title);
			console.log();

		}

		let description = this.parent && this.parent.config && this.parent.config.description || this.config && this.config.description || this.description;
		if (description) {
			console.log(description);
			console.log();
		}

		let usage = this.parent && this.parent.config && this.parent.config.usage || this.config && this.config.usage || this.usage;
		if (usage) {
			console.log("Usage:");
			console.log();
			console.log("  "+usage);
			console.log();
		}

		if (this.getCommands()) {
			console.log("Commands: ");
			console.log();

			let cmds = Object.values(this[$COMMANDS]);
			cmds = cmds.map((command)=>{
				return {
					name: command.name,
					instance: getCommandInstance(command)
				};
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

	static get InvalidCommand() {
		return InvalidCommand;
	}

	static get BadCommand() {
		return BadCommand;
	}

	static get MissingCommand() {
		return MissingCommand;
	}

	/**
	 * Execute this command. Note, that generally this is called by the underlying
	 * CLI container, and never directly.
	 *
	 * @param  {[type]}  args    [description]
	 * @param  {[type]}  options [description]
	 * @return {Promise}         [description]
	 */
	start(args,options) {
		return _start.call(this,args,options);
	}

	addCommand(name,command,description="") {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");
		if (!command) throw new Error("Missing command.");
		if (typeof command!=="string" && !(command instanceof Function)) throw new Error("Invalid command.");

		if (typeof command==="string") {
			let resolved = this.resolve(command);
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

	removeCommand(name) {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");

		delete this[$COMMANDS][name];
		if (Object.keys(this[$COMMANDS]).length<1) this[$COMMANDS] = null;
	}

	getCommand(name) {
		if (!name) throw new Error("Missing name.");
		if (typeof name!=="string") throw new Error("Invalid name.");

		return this[$COMMANDS][name] || null;
	}

	getCommands() {
		return Object.keys(this[$COMMANDS]);
	}

	resolve(filename) {
		const getStat = (f)=>{
			try {
				return FS.statSync(f);
			}
			catch (ex) {
				return null;
			}
		};

		let path,stat;

		// try the filename relative to the module parent
		if (module && module.parent) {
			path = AwesomeUtils.Module.resolve(module.parent,filename);
			stat = getStat(path);
			if (stat) return {
				filename: path,
				stat
			};
		}

		// try the filename relative to process.cwd()
		path = Path.resolve(process.cwd(),filename);
		stat = getStat(path);
		if (stat) return {
			filename: path,
			stat
		};

		// fail
		return null;
	}
}

const _start = function _start(args,options) {
	if (!args) throw new Error("Missing args.");
	if (!(args instanceof Array)) throw new Error("Invalid args.");
	if (!options) throw new Error("Missing options.");

	return new Promise(async (resolve,reject)=>{
		try {
			// before
			if (this.before && this.before instanceof Function) {
				let prom = this.before.call(this,args,options);
				if (prom instanceof Promise) await prom;
			}

			// execute
			if (this.execute && this.execute instanceof Function) {
				let prom = this.execute.call(this,args,options);
				if (prom instanceof Promise) await prom;
			}
			if (this[$COMMANDS]) {
				let prom = _commander.call(this,args,options);
				if (prom instanceof Promise) await prom;
			}

			// after
			if (this.after && this.after instanceof Function) {
				let prom = this.after.call(this,args,options);
				if (prom instanceof Promise) await prom;
			}

			resolve();
		}
		catch (ex) {
			console.log(10,ex);
			reject(ex);
		}
	});
};

const _commander = function _commander(args,options) {
	if (args.length<1) return _start.call(this,args,options);

	let name = args[0];
	let remainder = args.slice(1);

	if (name.toLowerCase()==="help") {
		this.help();
		return;
	}

	let command = this.getCommand(name);
	if (!command) return _start.call(this,args,options);

	if (!command.command) throw new InvalidCommand(name);

	let instance = getCommandInstance.call(this,command);
	if (!instance && command instanceof Function) instance = command;
	if (!instance) throw new BadCommand(name);

	if (instance instanceof CLICommand) return instance.start(remainder,options);
	else if (instance instanceof Function) return instance(remainder,options);
	else throw new InvalidCommand(name);
};

const getCommandInstance = function getCommandInstance(command) {
	let exported = null;
	if (command instanceof Function) return null;
	else exported = require(command.command);
	if (!exported) throw new BadCommand(command.name);

	let instance = null;
	if (!AwesomeUtils.Class.isClass(exported) && exported instanceof CLICommand) instance = exported;
	else if (AwesomeUtils.Class.isClass(exported) && CLICommand.isPrototypeOf(exported)) instance = new exported();

	return instance;
};

class InvalidCommand extends Error {
	constructor(name) {
		super("Invalid command '"+name+"'.");
	}
}

class BadCommand extends Error {
	constructor(name) {
		super("Bad command '"+name+"'.");
	}
}

class MissingCommand extends Error {
	constructor() {
		super("Missing command.");
	}
}

module.exports = CLICommand;
