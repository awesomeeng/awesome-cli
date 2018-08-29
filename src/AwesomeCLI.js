// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const Path = require("path");
const FS = require("fs");

const CLICommand = require("./CLICommand");

const $OPTIONS = Symbol("options");
const $SHORTCUTS = Symbol("shortcuts");
const $ARGS = Symbol("args");
const $ORIGINAL = Symbol("original");
const $OPTS = Symbol("opts");
const $CONFIG = Symbol("config");
const $STDIN_DATA = Symbol("stdin_data");

class AwesomeCLI extends CLICommand {
	constructor(config) {
		super();

		this[$CONFIG] = Object.assign({
			title: null,
			description: null,
			usage: null,
			optionDelimiter: "--",
			debug: true
		},config || {});

		this[$OPTIONS] = {};
		this[$SHORTCUTS] = {};
		this[$ARGS] = null;
		this[$OPTS] = null;
		this[$STDIN_DATA] = null;
	}

	static get CLICommand() {
		return CLICommand;
	}

	static get InvalidOption() {
		return InvalidOption;
	}

	static get InvalidOptionValue() {
		return InvalidOptionValue;
	}

	static get MissingOptionValue() {
		return MissingOptionValue;
	}

	static get InvalidType() {
		return InvalidType;
	}

	get config() {
		return Object.assign({},this[$CONFIG]);
	}

	get args() {
		if (!this[$OPTS]) this.init();
		return [].concat(this[$ARGS]);
	}

	get options() {
		if (!this[$OPTS]) this.init();
		return this[$OPTS];
	}

	get originalArgs() {
		return [].concat(this[$ORIGINAL]);
	}

	getOption(optionName) {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		return this[$OPTIONS][optionName] && Object.assign({},this[$OPTIONS][optionName]) || null;
	}

	getOptions() {
		return Object.keys(this[$OPTIONS]);
	}

	addOption(optionName,type="*",defaultValue=undefined,description="") {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		if (!type) throw new Error("Missing type.");
		if (!isValidType(type)) throw new Error("Invalid type.");

		if (type==="boolean" || type==="bool") defaultValue = defaultValue===undefined && true || defaultValue===null && true || defaultValue==="" && true || defaultValue;

		this[$OPTIONS][optionName] = {optionName,type,defaultValue,description};
	}

	removeOption(optionName) {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		delete this[$OPTIONS][optionName];
	}

	getOptionShortcut(shortcut) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		return this[$SHORTCUTS][shortcut];
	}

	getOptionShortcuts() {
		return Object.keys(this[$SHORTCUTS]);
	}

	addOptionShortcut(shortcut,optionName) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");
		if (!this.getOption(optionName)) throw new Error("Unknown optionName. You must specify the option via addOption() before using addOptionShortcut.");

		this[$SHORTCUTS][shortcut] = optionName;
	}

	removeOptionShortcut(shortcut) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		delete this[$SHORTCUTS][shortcut];
	}

	fileRead(filename) {
		filename = Path.resolve(process.cwd(),filename);

		try {
			let stat = FS.statSync(filename);
			if (!stat.isFile()) throw new Error("Source must be a valid file: "+filename);
		}
		catch (ex) {
			throw new Error("Source file not found: "+filename);
		}

		try {
			return FS.readFileSync(filename,"utf-8");
		}
		catch (ex) {
			throw new Error("Error reading file: "+filename);
		}
	}

	stdinRead() {
		if (this[$STDIN_DATA]) return Promise.resolve(this[$STDIN_DATA]);

		return new Promise((resolve,reject)=>{
			try {
				let content = "";
				process.stdin.once("data",(chunk)=>{
					content += chunk;
				});
				process.stdin.once("end",()=>{
					this[$STDIN_DATA] = content;
					resolve(content);
				});
				process.stdin.once("error",(err)=>{
					reject(err);
				});
			}
			catch (ex) {
				return reject(ex);
			}
		});
	}

	init() {
		let args = process.argv.slice(2);
		let options = {};

		try {
			this[$ORIGINAL] = [].concat(args);

			let opts = Object.assign({},options);
			Object.keys(this[$OPTIONS]).forEach((key)=>{
				let option = this[$OPTIONS][key];
				opts[key] = option.defaultValue;
			});

			let free = [];
			while (args.length>0) {
				let optionName = args.shift();
				if (!optionName.startsWith("-")) {
					free.push(optionName);
					continue;
				}

				optionName = optionName.replace(/^--?/,"");
				if (this.getOptionShortcut(optionName)) optionName = this.getOptionShortcut(optionName);

				let option = this.getOption(optionName);
				if (!option) throw new InvalidOption(this.config.optionDelimiter+optionName);
				if (!isValidType(option.type)) throw new InvalidType(option.type);

				let types = option.type.toLowerCase().split(/\|/g);
				let value = undefined;

				types.forEach((type)=>{
					if (value!==undefined) return;
					else if (type==="string") {
						if (args.length<1) throw new MissingOptionValue(this.config.optionDelimiter+optionName);
						value = args.shift();
					}
					else if (type==="number") {
						if (args.length<1) throw new MissingOptionValue(this.config.optionDelimiter+optionName);
						try {
							value = parseInt(args.shift());
						}
						catch (ex) {
							throw new InvalidOptionValue(this.config.optionDelimiter+optionName);
						}
					}
					else if (type==="boolean" || type==="bool") {
						value = !option.defaultValue;
					}
					else {
						throw new InvalidType(type);
					}
				});

				if (value!==undefined) opts[optionName] = value;
			}

			this[$ARGS] = free;
			this[$OPTS] = opts;
		}
		catch (ex) {
			throw ex;
		}
	}

	start(args,options) {
		if (!args) args = this.args;
		if (!options) options = this.options;

		return super.start(args,options);
	}
}

const isValidType = function isValidType(type) {
	if (!type) return false;
	if (typeof type!=="string") return false;

	let types = type.toLowerCase().split(/\|/g);

	return types.every((type)=>{
		if (!type) return false;
		if (type==="*") return true;
		if (type==="string") return true;
		if (type==="number") return true;
		if (type==="boolean" || type==="bool") return true;
		return false;
	});
};

class InvalidOption extends Error {
	constructor(name) {
		super(name ? "Invalid option '"+name+"' used." : "Invalid option used.");
	}
}

class InvalidOptionValue extends Error {
	constructor() {
		super("Invalid option value.");
	}
}

class MissingOptionValue extends Error {
	constructor(name) {
		super(name ? "Missing option value for '"+name+"'." : "Missing option value.");
	}
}

class InvalidType extends Error {
	constructor(name) {
		super(name ? "Invalid option type '"+name+"' used." : "Invalid option type used.");
	}
}

module.exports = AwesomeCLI;
