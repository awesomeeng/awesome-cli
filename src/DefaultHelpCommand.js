// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const CLICommand = require("AwesomeCLI").CLICommand;

class DefaultHelpCommand extends CLICommand {
	constructor(parent) {
		super(parent);
	}

	get description() {
		return "This help screen.";
	}

	execute(/*args,options*/) {
		/* eslint no-console: off */
		if (this.parent.config.title) {
			console.log(this.parent.config.title);
			console.log();
		}

		if (this.parent.config.description) {
			console.log(this.parent.config.description);
			console.log();
		}

		if (this.parent.config.usage) {
			console.log("Usage: ");
			console.log();
			console.log("  ",this.parent.config.usage);
			console.log();
		}

		// if (Object.keys(this[$COMMANDS]).length>0) {
		// 	console.log("Commands: ");
		// 	console.log();
		//
		// 	let cmds = _helpCommands.call(this);
		//
		// 	let size = 0;
		// 	cmds.forEach((cmd)=>{
		// 		let initial = "  "+" ".repeat(cmd.indent)+cmd.name;
		// 		size = Math.max(size,initial.length);
		// 	});
		//
		// 	cmds.forEach((cmd)=>{
		// 		let initial = "  "+" ".repeat(cmd.indent)+cmd.name;
		// 		console.log(initial.padEnd(size)+" : "+cmd.description);
		// 	});
		//
		// 	console.log();
		// }

		if (this.parent.getOptions().length>0) {
			let opts = {};
			this.parent.getOptions().forEach((optionName)=>{
				let option = this.parent.getOption(optionName);
				opts[optionName] = {
					optionName,
					type: option.type,
					description: option.description,
					shortcuts: []
				};
			});
			this.parent.getOptionShortcuts().forEach((shortcut)=>{
				let optionName = this.parent.getOptionShortcut(shortcut);
				opts[optionName].shortcuts.push(shortcut);
			});

			let order = Object.keys(opts);
			order.sort();

			let size = 0;
			order.forEach((optionName)=>{
				let option = opts[optionName];
				let s = this.parent.config.optionDelimiter+optionName;
				if (option.shortcuts.length>0) {
					option.shortcuts.forEach((shortcut)=>{
						s += (s?" | ":"")+this.parent.config.optionDelimiter+shortcut;
					});
				}
				if (option.type!=="boolean" && option.type!=="bool") s+= " ["+option.type+"]";
				size = Math.max(size,s.length);
			});

			console.log("Options:");
			console.log();

			order.forEach((optionName)=>{
				let option = opts[optionName];
				let s = this.parent.config.optionDelimiter+optionName;
				if (option.shortcuts.length>0) {
					option.shortcuts.forEach((shortcut)=>{
						s += (s?" | ":"")+this.parent.config.optionDelimiter+shortcut;
					});
				}
				if (option.type!=="boolean" && option.type!=="bool") s+= " ["+option.type+"]";
				console.log("  ",s.padEnd(size),":",option.description);
			});

			console.log();
		}
	}
}

module.exports = DefaultHelpCommand;
