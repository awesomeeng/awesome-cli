// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const InvalidOptionError = require("./InvalidOptionError");
const InvalidTypeError = require("./InvalidTypeError");
const MissingOptionValueError = require("./MissingOptionValueError");
const InvalidOptionValueError = require("./InvalidOptionValueError");
const InvalidCommandError = require("./InvalidCommandError");
const BadCommandError = require("./BadCommandError");
const MissingCommandError = require("./MissingCommandError");

const $OPTIONS = Symbol("options");
const $SHORTCUTS = Symbol("shortcuts");

/**
 * Defines the shape of the root CLI including title, description, usage, help, and
 * options/switches. Additionally this contains all of the functionality of
 * running a CLI such as init, parseOptions, and run methods.
 *
 * This class is the base class for `AwesomeCLI.CLI` and `AwesomeCLI.CommandCLI`.
 */
class AbstractCLI {
	/**
	 * Constructs a new CLI.
	 */
	constructor() {
		this[$OPTIONS] = {};
		this[$SHORTCUTS] = {};
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
	 * The default help implementation for a root CLI. Overload this
	 * if you want to customize your help display.
	 *
	 * @return {void}
	 */
	help() {
		if (this.title) {
			console.log(this.title);
			console.log();

		}

		if (shis.description) {
			console.log(this.description);
			console.log();
		}

		if (this.usage) {
			console.log("Usage:");
			console.log();
			console.log("  "+this.usage);
			console.log();
		}

		if (this.getOptions().length>0) {
			let opts = {};
			this.getOptions().forEach((optionName)=>{
				let option = this.getOption(optionName);
				opts[optionName] = {
					optionName,
					type: option.type,
					description: option.description,
					shortcuts: []
				};
			});
			this.getOptionShortcuts().forEach((shortcut)=>{
				let optionName = this.getOptionShortcut(shortcut);
				opts[optionName].shortcuts.push(shortcut);
			});

			let order = Object.keys(opts);
			order.sort();

			let size = 0;
			order.forEach((optionName)=>{
				let option = opts[optionName];
				let s = "--"+optionName;
				if (option.shortcuts.length>0) {
					option.shortcuts.forEach((shortcut)=>{
						s += (s?" | ":"")+"--"+shortcut;
					});
				}
				if (option.type!=="boolean" && option.type!=="bool") s+= " ["+option.type+"]";
				size = Math.max(size,s.length);
			});

			console.log("Options:");
			console.log();

			order.forEach((optionName)=>{
				let option = opts[optionName];
				let s = "--"+optionName;
				if (option.shortcuts.length>0) {
					option.shortcuts.forEach((shortcut)=>{
						s += (s?" | ":"")+"--"+shortcut;
					});
				}
				if (option.type!=="boolean" && option.type!=="bool") s+= " ["+option.type+"]";
				console.log("  ",s.padEnd(size),":",option.description);
			});

			console.log();
		}
	}

	/**
	 * Called by the `run()` method to initiate the root command and
	 * option parsing. Generally this doesn't need to be overloaded.
	 *
	 * @param  {Array} command line arguments.
	 * @param  {Object} parsed options and their values.
	 * @return {Object} the parsed arguments and options.
	 */
	init(args,options) {
		args = args || process.argv.slice(2);
		let parsed = this.parseOptions(args,options);
		args = parsed.args;
		options = parsed.options;

		return {args,options};
	}

	/**
	 * Called when you start your CLI, this takes care of initializing, parsing
	 * arguments, and ensuring everything is run smoothly.
	 *
	 * By and large there is zero reason to overload this. You should overload
	 * `execute(args,options)`, `before(args,options)`, or `after(args,options)`
	 * instead.
	 *
	 * @param  {Array} command line arguments.
	 * @param  {Object} parsed options and their values.
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

				// execute
				if (this.execute && this.execute instanceof Function) {
					let prom = this.execute.call(this,args,options);
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
				if (
					ex instanceof BadCommandError ||
					ex instanceof InvalidCommandError ||
					ex instanceof InvalidOptionError ||
					ex instanceof InvalidOptionValueError ||
					ex instanceof InvalidTypeError ||
					ex instanceof MissingCommandError ||
					ex instanceof MissingOptionValueError
				) {
					console.error(ex.message);
				}
				else {
					console.error(ex);
				}
				process.exit(255);
			}
		});
	}

	/**
	 * Returns the object used to describe an option after it has been added.
	 *
	 * @param  {string} optionName
	 * @return {Object}
	 */
	getOption(optionName) {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		return this[$OPTIONS][optionName] && Object.assign({},this[$OPTIONS][optionName]) || null;
	}

	/**
	 * Returns an array of all the option names that have been added.
	 *
	 * @return {Array<string>}
	 */
	getOptions() {
		return Object.keys(this[$OPTIONS]);
	}

	/**
	 * Adds a new options.
	 *
	 * **optionName** must be unique to this command and any descendant commands.
	 *
	 * **type** can be "*", "boolean", "number", or "string".
	 *
	 * **defaultvalue** is the value used if the option is not prvided.
	 *
	 * **description** is the help description for this option.
	 *
	 * @param {string} optionName
	 * @param {string} [type="*"]
	 * @param {*} [defaultValue=undefined]
	 * @param {string} [description=""]
	 */
	addOption(optionName,type="*",defaultValue=undefined,description="") {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		if (!type) throw new Error("Missing type.");
		if (!isValidType(type)) throw new Error("Invalid type.");

		if (type==="boolean" || type==="bool") defaultValue = defaultValue===undefined && true || defaultValue===null && true || defaultValue==="" && true || defaultValue;

		this[$OPTIONS][optionName] = {optionName,type,defaultValue,description};
	}

	/**
	 * Removes a given option.
	 *
	 * @param  {string} optionName
	 * @return {void}
	 */
	removeOption(optionName) {
		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");

		delete this[$OPTIONS][optionName];
	}

	/**
	 * Returns the Shortcut object for a given shortcut.
	 *
	 * @param  {string} shortcut
	 * @return {string}
	 */
	getOptionShortcut(shortcut) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		return this[$SHORTCUTS][shortcut];
	}

	/**
	 * Returns an array of all the shortcut names added.
	 *
	 * @return {Array<string>}
	 */
	getOptionShortcuts() {
		return Object.keys(this[$SHORTCUTS]);
	}

	/**
	 * Adds a new option shortcut which maps the `shortcut` to a
	 * specific `optionName`.
	 *
	 * @param {string} shortcut
	 * @param {string} optionName
	 */
	addOptionShortcut(shortcut,optionName) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		if (!optionName) throw new Error("Missing optionName.");
		if (typeof optionName!=="string") throw new Error("Invalid optionName.");
		if (!this.getOption(optionName)) throw new Error("Unknown optionName. You must specify the option via addOption() before using addOptionShortcut.");

		this[$SHORTCUTS][shortcut] = optionName;
	}

	/**
	 * Removes an option shortcut.
	 *
	 * @param  {string} shortcut
	 * @return {void}
	 */
	removeOptionShortcut(shortcut) {
		if (!shortcut) throw new Error("Missing shortcut.");
		if (typeof shortcut!=="string") throw new Error("Invalid shortcut.");

		delete this[$SHORTCUTS][shortcut];
	}

	/**
	 * Responsible for parsing the command line arguments and determining
	 * what is an option and what is an argument.
	 *
	 * Generally there is no reason to overload this.
	 *
	 * @param  {Array} command line arguments.
	 * @param  {Object} initialOptions
	 * @return {Object}
	 */
	parseOptions(args,initialOptions) {
		let options = Object.assign({},initialOptions);

		if (!args) throw new Error("Missing args.");
		if (!(args instanceof Array)) throw new Error("Invalid args.");

		let opts = Object.assign({},options);
		this.getOptions().forEach((optionName)=>{
			let option = this.getOption(optionName);
			opts[optionName] = option.defaultValue;
		});

		while (args.length>0) {
			let peek = args[0] || null;
			if (!peek || !peek.startsWith("-")) break;

			let optionName = args.shift();
			optionName = optionName.replace(/^--?/,"");
			if (this.getOptionShortcut(optionName)) optionName = this.getOptionShortcut(optionName);

			let option = this.getOption(optionName);
			if (!option) throw new InvalidOptionError("--"+optionName);
			if (!isValidType(option.type)) throw new InvalidTypeError(option.type);

			let types = option.type.toLowerCase().split(/\|/g);
			let value = undefined;

			types.forEach((type)=>{
				if (value!==undefined) return;
				else if (type==="string") {
					if (args.length<1) throw new MissingOptionValueError("--"+optionName);
					value = args.shift();
				}
				else if (type==="number") {
					if (args.length<1) throw new MissingOptionValueError("--"+optionName);
					try {
						value = parseInt(args.shift());
					}
					catch (ex) {
						throw new InvalidOptionValueError("--"+optionName);
					}
				}
				else if (type==="boolean" || type==="bool") {
					value = !option.defaultValue;
				}
				else {
					throw new InvalidTypeError(type);
				}
			});

			if (value!==undefined) opts[optionName] = value;
		}

		return {
			args: args,
			options: opts
		};
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

module.exports = AbstractCLI;
