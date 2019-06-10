<a href="https://www.npmjs.com/package/@awesomeeng/awesome-cli">![npm](https://img.shields.io/npm/v/@awesomeeng/awesome-cli.svg "npm Details")</a>
<a href="./LICENSE">![GitHub](https://img.shields.io/github/license/awesomeeng/awesome-cli.svg "License Details")</a>
<a href="http://npm-stats.com/~packages/@awesomeeng/awesome-cli">![npm](https://img.shields.io/npm/dt/@awesomeeng/awesome-cli.svg "npm download stats")</a>
<a href="https://github.com/awesomeeng/awesome-cli/graphs/contributors">![GitHub contributors](https://img.shields.io/github/contributors-anon/awesomeeng/awesome-cli.svg "Github Contributors")</a>
<a href="https://github.com/awesomeeng/awesome-cli/commits/master">![GitHub last commit](https://img.shields.io/github/last-commit/awesomeeng/awesome-cli.svg "Github Commit Log")</a>
<br/><a href="https://nodejs.org/en/">![node](https://img.shields.io/node/v/@awesomeeng/awesome-cli.svg "NodeJS")</a>
<a href="https://github.com/awesomeeng/awesome-cli/issues">![GitHub issues](https://img.shields.io/github/issues/awesomeeng/awesome-cli.svg "Github Issues")</a>
<a href="https://snyk.io/vuln/search?type=npm&q=@awesomeeng/awesome-cli">![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/awesomeeng/awesome-cli.svg "Synk Vulnerabilities Database")</a>
<a href="https://www.npmjs.com/package/@awesomeeng/awesome-cli">![David](https://img.shields.io/david/awesomeeng/awesome-cli.svg)</a>

# AwesomeCLI

AwesomeCLI is a simple framework for building enterprise Command Line Interface (CLI) tools. It supports standard or command based CLI interaction, global and local switches/options, and useful utilities to speed your tool development time.  It's all your cLI needs in one.

## Features

AwesomeCLI provides...
 - Ease of development;
 - Singular CLI usage pattern support;
 - or Command driven CLI usage pattern support;
 - Options/Switches for configurable CLIs;
 - Nested Options with Commands for fine grained control;
 - Default but extensible help output;
 - Useful CLI utilities to speed development;
 - Extensiblity for expanding needs.

## Contents
 - [Installation](#installation)
 - [Singular CLIs](#singular-clis)
 - [Command CLIs](#command-clis)
 - [Documentation](#documentation)
 - [Examples](#examples)
 - [Awesome Engineering](#the-awesome-engineering-company)
 - [Support and Help](#support-and-help)
 - [License](#license)

## Installation

Couldn't be easier.
```
npm install --save @awesomeeng/awesome-cli
```

## Singular CLIs

A "singular CLI" is one that does one thing and does it well.  `cat` for example, is a singluar CLI. Contrast that with a "command CLI" which takes one or more commands as arguments, which change the functionality of the CLI. `git` for example, is a command CLI; it relies on the user passing additional commands to it to function (e.g. `git commit` where `commit` is the command).

To use AwesomeCLI in "singular" mode is super simple...

1). Require AwesomeCLI...

```
const AwesomeCLI = require("@awesomeeng/awesome-cli");
```

2). Extend `AwesomeCLI.CLI` with your own class...

```
class MyCLI extends AwesomeCLI.CLI {
	...
}
```

3). Add any options/switches you need in the constructor...

You use `addOption(name,type,defaultValue,description)` to add options/switches. AwesomeCLI will parse the command line arguments for these switches and translate them into the options argument that is passsed to your `execute(args,options)` method.

```
class MyCLI extends AwesomeCLI.CLI {
	constructor() {
		super();

		this.addOption("something","boolean",true,"Toggles something on/off.");
		this.addOption("another","string",null,"Provides input to your CLI.");

		this.addOptionShortcut("a","another"); // maps --a to --another
	}
}
```

You can also add shortcuts (aka "aliases") to your options/switches to provide easier usage for your users.  Adding a shortcut uses the `addShortcutOption(shortcut,optionName)` method where `shortcut` is the shortcut to add, and `optionName` is the option it maps to.  Note that the `optionName` you use must already have been defined prior to calling `addShortcutOption()`.

4). Overload the `execute()` method...

Execute is where you do your work, so overloading is key...

```
	execute(args,options) {
		... do your work here ...
	}
```

Execute gets your arguments `args` and options `options` as parameters that contain the command line arguments passed in, but parsed for any options/switches that were included.

Execute can return a `Promise`, if you need to do asyncronous work.

You also may implement `before(args,options)` and `after(args,options)` if you want to do pre or post work.

5). Instantiate and run your class...

Once your class is defined, create an instance of it and then execute its `run()` method.

```
const mycli = new MyCLI();
mycli.run()
```

So, altogether it looks something like this taken from our

```
"use strict";

const AwesomeCLI = require("@awesomeeng/awesome-cli");

class CLI extends AwesomeCLI.CLI {
	constructor() {
		super({
			title: "line2words",
			usage: "line2words [options] <text>",
			description: "A simple tool to split the given <text> into words, printing one on word each line."
		});

		this.addOption("help","boolean",false,"Show command help.");
		this.addOption("prefix","string","","Prefix each line with the given string.");
		this.addOption("suffix","string","","Suffix each line with the given string.");

		this.addOptionShortcut("p","prefix");
		this.addOptionShortcut("s","suffix");
	}

	execute(args,options) {
		if (options.help) {
			this.help();
		}
		else {
			let s = args.join(" ").replace(/[^\w\d-\s]/g,"").split(" ");
			s.forEach((word)=>{
				console.log(options.prefix+word+options.suffix);
			});
		}
	}
}

const cli = new CLI();
cli.run();

```

## Command CLIs

A "command CLI" is one that takes one or more commands as arguments. Contrast that with a "singular CLI" which does one thing and does it well.  `git` for example, is a command CLI; it relies on the user passing additional commands to it to function (e.g. `git commit` where `commit` is the command).

To use AwesomeCLI in "command" mode is super simple...

1). Require AwesomeCLI...

```
const AwesomeCLI = require("@awesomeeng/awesome-cli");
```

2). Extend `AwesomeCLI.CommandCLI` with your own class...

```
class MyCLI extends AwesomeCLI.CommandCLI {
	...
}
```

3). Add any options/switches you need in the constructor...

In "command CLIs" each command has its own set of options.  Options you specify in your root class (that which extends `AwesomeCLI.CommandCLI`) are considered "global options" and modify the options object passed to each of your commands. Note that each command gets its own `args` and `options` passed to if; modifying either of these in a command will only expose those to descendant commands, not to sibling commands.

You use `addOption(name,type,defaultValue,description)` to add options/switches. AwesomeCLI will parse the command line arguments for these switches and translate them into the options argument that is passsed to your `execute(args,options)` method.t
```
class MyCLI extends AwesomeCLI.CommandCLI {
	constructor() {
		super();

		this.addOption("something","boolean",true,"Toggles something on/off.");
		this.addOption("another","string",null,"Provides input to your CLI.");

		this.addOptionShortcut("a","another"); // maps --a to --another
	}
}
```

4). Add the next level of commands to the constructor as well...

```
class MyCLI extends AwesomeCLI.CommandCLI {
	constructor() {
		super();

		this.addOption("something","boolean",true,"Toggles something on/off.");
		this.addOption("another","string"null,"Provides input to your CLI.");

		this.addOptionShortcut("a","another"); // maps --a to --another

		this.addCommand("somecommand","./SomeCommand.js");
		this.addCommand("anothercommand","./AnotherCommand.js");
	}
}
```

The `addCommand(name,command)` method can take as it second argument, a function, a filename, or an implementation of the `AwesomeCLI.AbstractCommand` class.

 - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".

 - **filename** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**

 - **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.

5). Implement your `AwesomeCLI.AbstractCommand` classes as needed:

```
// SomeCommand.js

const AwesomeCLI = require("@awesomeeng/awesome-cli");

class SomeCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		... Add options and sub-commands here ...
	}

	execute() {
		... do your work here ...
	}
}

```

Just like in your root class, the `construtor()` is where you add options and commands. You implement the actual execution in the `execute(args,options)` method. **If creating a command which just houses other commands, implementing `execute()` should not be done. Only implement `execute(args,options)` in your end/leaf commands.**

6). Instantiate and run your class...

Once everything is defined and your sub-command classes setup, create an instance of your root class and then execute its `run()` method.

```
const mycli = new MyCLI();
mycli.run()
```

## Documentation

 - [Options/Switches](./docs/OptionsAndSwitches.md)
 - [Commands](./docs/Commands.md)
 - [Providing Help](./docs/Help.md)
 - [CLI Utilities](./docs/Utilities.md)

 - [API Documentation](./docs/API.md)

## Examples

AwesomeCLI ships with a set of examples for your reference.

 - [Line2Words](./examples/Line2Words): An example of a "singular CLI" which takes a number of arguments and splits them into lines.

 - [TextUtils](./examples/TextUtils): An example of a "command CLI" which has a number of different text related commands. Ask it for help! `textutils help`

## The Awesome Engineering Company

AwesomeCLI is written and maintained by The Awesome Engineering Company. We belive in building clean, configurable, creative software for engineers and architects and customers.

To learn more about The Awesome Engineering Company and our suite of products, visit us on the web at https://awesomeeng.com.

## Support and Help

This product is maintained and supported by The Awesome Engineering Company.  For support please [file an issue](./issues) or contact us via our Webiste at [https://awesomeeng.com](https://awesomeeng.com).  We will do our best to respond to you in a timely fashion.

## License

AwesomeCLI is released under the MIT License. Please read the  [LICENSE](./LICENSE) file for details.
