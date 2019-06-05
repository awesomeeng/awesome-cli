# [AwesomeCLI](../README.md) > Introducing AwesomeCLI

AwesomeCLI is a library for rapidly building Command Line Interface (CLI) tools for usage with enterprise nodejs applications. It provides a basic CLI scaffold around which you can create either Singular CLIs or Command-Driven CLIs.  AwesomeCLI handles all the details of a CLI for you such as parsing commands, options/switches, help, etc.

A "singular CLI" is one that does one thing and does it well. `cat` for example, is a singluar CLI. A "command CLI" is one that takes one or more commands as arguments and each command provides a separate behavior. `git` for example, is a command CLI; it relies on the user passing additional commands to it to function (e.g. `git commit` where commit is the command).

AwesomeCLI allows you to build either.  In your CLI entry point you simple extend `AwesomeCLI.CLI` for singular CLI applications, or `AwesomeCLI.CommandCLI` for command driven CLI applications.  Of course, there's a little more to it, so be sure to keep reading to learn how.

## Key Features

 - **Easy**. Writing a CLI with AwesomeCLI is super easy and fast.

 - **Singular or Command CLIs**. Choose if you want to build a singular CLI or a command-driven CLI.

 - **Options/Switches**. AwesomeCLI handles options and switches for you, including types, default values, aliases, help, and nested options.

 - **Help**. Builtin basic help screens for your users that can be easily overloaded for custom help screens.

 - **CLI Utilities**. Useful CLI utilities to speed development such as reading a file or reading from STDIN.

 - **Extensiblity**. For all your CLI needs no matter how simple or how complex.

 - **No External Dependencies**. AwesomeConfig is written and maintained by The Awesome Engineering Company and has no dependency that was not written by us. This means consistency of code throughout the product and zero dependencies that were not written by us.  This means safer code and better support for you and your product.

 - **Free and Open**. AwesomeCLI is released under the MIT License and complete free to use and modify.

## Getting Started

AwesomeCLI is super easy to use.

#### 1). Install It.

```shell
npm install @awesomeeng/awesome-cli
```

#### 2). Build it.

At this point you will need to determine what type of CLI you want to build.  Will it be a singular CLI or do you want to support nested sub-commands?  The choice is yours to make but how you proceed programmatically depends on which choice you select.

## Singular CLIs

A "singular CLI" is one that does one thing and does it well.  `cat` for example, is a singluar CLI. Contrast that with a "command CLI" which takes one or more commands as arguments, which change the functionality of the CLI. `git` for example, is a command CLI; it relies on the user passing additional commands to it to function (e.g. `git commit` where `commit` is the command).

To use AwesomeCLI in "singular" mode is super simple...

#### 1). Require AwesomeCLI...

```
const AwesomeCLI = require("@awesomeeng/awesome-cli");
```

#### 2). Extend `AwesomeCLI.CLI` with your own class...

```
class MyCLI extends AwesomeCLI.CLI {
	...
}
```

#### 3). Add any options/switches you need in the constructor...

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

#### 4). Overload the `execute()` method...

Execute is where you do your work, so overloading is key...

```
execute(args,options) {
	... do your work here ...
}
```

Execute gets your arguments `args` and options `options` as parameters that contain the command line arguments passed in, but parsed for any options/switches that were included.

Execute can return a `Promise`, if you need to do asyncronous work.

You also may implement `before(args,options)` and `after(args,options)` if you want to do pre or post work.

#### 5). Instantiate and run your class...

Once your class is defined, create an instance of it and then execute its `run()` method.

```
const mycli = new MyCLI();
mycli.run()
```

So, altogether it looks something like this...

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

To use AwesomeCLI in "command" mode is also pretty easy...

#### 1). Require AwesomeCLI...

```
const AwesomeCLI = require("@awesomeeng/awesome-cli");
```

#### 2). Extend `AwesomeCLI.CommandCLI` with your own class...

```
class MyCLI extends AwesomeCLI.CommandCLI {
	...
}
```

#### 3). Add any options/switches you need in the constructor...

In "command CLIs" each command has its own set of options.  Options you specify in your root class (that which extends `AwesomeCLI.CommandCLI`) are considered "global options" and modify the options object passed to each of your commands. Note that each command gets its own `args` and `options` passed to if; modifying either of these in a command will only expose those to descendant commands, not to sibling commands.

You use `addOption(name,type,defaultValue,description)` to add options/switches. AwesomeCLI will parse the command line arguments for these switches and translate them into the options argument that is passsed to your `execute(args,options)` method.
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

#### 4). Add the next level of commands to the constructor as well...

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

#### 5). Implement your `AwesomeCLI.AbstractCommand` classes as needed:

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

Just like in your root class, the `construtor()` is where you add options and commands. You implement the actual execution in the `execute(args,options)` method.

**If creating a command which just houses other commands, implementing `execute()` should not be done. Only implement `execute(args,options)` in your end/leaf commands.**

#### 6). Instantiate and run your class...

Once everything is defined and your sub-command classes setup, create an instance of your root class and then execute its `run()` method.

```
const mycli = new MyCLI();
mycli.run()
```

## Documentation

That's the basics of AwesomeCLI, but there is of course a lot more to it.

At this point, we suggest you check the [project readme](https://github.com/awesomeeng/awesome-cli) out. Additionally there is specific documentation for options/switches, commands, help, and CLI utilities.

 - [Read Me First!](https://github.com/awesomeeng/awesome-cli)
 - [Options/Switches](https://github.com/awesomeeng/awesome-cli/blob/master/docs/OptionsAndSwitches.md)
 - [Commands](https://github.com/awesomeeng/awesome-cli/blob/master/docs/Commands.md)
 - [Providing Help](https://github.com/awesomeeng/awesome-cli/blob/master/docs/Help.md)
 - [CLI Utilities](https://github.com/awesomeeng/awesome-cli/blob/master/docs/Utilities.md)

## AwesomeStack

AwesomeCLI is one part of the free and open source set of libraries called AwesomeStack for rapidly building enterprise nodejs applications.  Each library is written to provide a stable, performant, part of your application stack that can be used on its own or as part of the greater AwesomeStack setup.

AwesomeStack includes...

 - **[AwesomeServer](https://github.com/awesomeeng/awesome-server)** - A HTTP/HTTPS/HTTP2 API Server focused on implementing API endpoints.

 - **[AwesomeLog](https://github.com/awesomeeng/awesome-log)** - Performant Logging for your application needs.

 - **[AwesomeConfig](https://github.com/awesomeeng/awesome-config)** - Powerful configuration for your application.

 - **[AwesomeCLI](https://github.com/awesomeeng/awesome-cli)** - Rapidly implement Command Line Interfaces (CLI) for your application.

All AwesomeStack libraries and AwesomeStack itself is completely free and open source (MIT license) and has zero external dependencies. This means you can have confidence in your stack and not spend time worrying about licensing and code changing out from under you. Additionally, AwesomeStack and all of is components are maintained by The Awesome Engineering Company ensuring you a single point of contact and responsibility and unified support for your entire application.

You can learn more about AwesomeStack here: https://github.com/awesomeeng/awesome-stack
