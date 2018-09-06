# [AwesomeCLI](../README.md) > Commands

Command mode is great way to build a CLI tool. Your CLI takes a series of commands, which describe the path through your CLI you want the user to take.  Each command can have its own set of options and its own set of sub-commands.

## The Root Command

It all begins with the root command, which is the entry point for your CLI application. Here we defined all of the sub-commands that the root may accept and any global options that will be used by all the sub-commands.

The root command begins by extending the `AwesomeCLI.CommandCLI` class, like this:

```
const AwesomeCLI = require("AwesomeCLI");

class MyCommandCLI extends AwesomeCLI.CommandCLI {
	...
}
```

You add global options for all of your commands in the constructor of your root command:

```
const AwesomeCLI = require("AwesomeCLI");

class MyLeafCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		super();

		... add your options here, if any ...
	}
}
```

Options are added with the `addOptions(name,type,defaultValue,description)` command, for example:

```
this.addOption("source","string",null,"Provide the source value.");
```

You may also provide shortcut (aka aliases) at this time. Note that you must add the alises AFTER the option they are aliasing or you will get an exception.

```
this.addOptionShortcut("s","source"); // maps --s to ---source
```

Once you have add your options, then you add your sub-commands to the constructor as well, as shown here:

```
const AwesomeCLI = require("AwesomeCLI");

class MyLeafCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		super();

		... add your options here, if any ...

		... add your sub-commands here ...
	}
}
```

Commands are added with the 'addCommand(name,command)' function. The `addCommand(name,command)` method can take as it second argument, a function, a filename, or an implementation of the `AwesomeCLI.AbstractCommand` class.

 - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".

 - **filenane** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**

 - **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.

That's pretty much it for your root command.

You could, if needed, also implement the `before(Args,options)` or `after(args,options)` methods to run before/after your sub-commands

## Sub-Commands

When building each sub-command ask yourself if that command accepts further sub-commands or is it an endpoint, or leaf; does it do something?  If the former and it takes further sub-commands, we build a sub-command command. If the latter, and it does some work, we build a leaf command.

## A Sub-Command Command

A sub-command command is a command that takes further sub-commands. The root command itself is a sub-command command, and building further ones is pretty straight-forward.

First, you build a sub-class of the AbstractCommand class:

```
const AwesomeCLI = require("AwesomeCLI");

class MySubCommand extends AwesomeCLI.AbstractCommand {
	...
}
```

In your constructor you may have options. Options here are applied and passed to each sub-command, but do not effect the global options structure.

```
const AwesomeCLI = require("AwesomeCLI");

class MySubCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		super();

		... add your options here, if any ...
	}
}
```

Options are added with the `addOptions(name,type,defaultValue,description)` command, for example:

```
this.addOption("source","string",null,"Provide the source value.");
```

You may also provide shortcut (aka aliases) at this time. Note that you must add the alises AFTER the option they are aliasing or you will get an exception.

```
this.addOptionShortcut("s","source"); // maps --s to ---source
```

Once you have add your options, then you add your sub-commands to the constructor as well using the `addCommand(name,command)` method. The `addCommand(name,command)` method can take as it second argument, a function, a filename, or an implementation of the `AwesomeCLI.AbstractCommand` class.

 - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".

 - **filenane** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**

 - **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.

That's it. Your sub-command command is ready to go!

## A Leaf Sub-Command

Leaf commands are where you CLI does its work. It has all the information to do exactly what it needs to do and now it's time to get down to implementing.

You implement a Leaf Command, but overloading the `execute(args,options)` method, as shown here:

```
const AwesomeCLI = require("AwesomeCLI");

class MyLeafCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		super();

		... add your options here, if any ...
	}

	execute(args,options) {
		... implement what your command does here ...
	}
}
```

You could, if needed, also implement the `before(Args,options)` or `after(args,options)` methods to run before/after your sub-commands

## Sub-command Help

Each instance of AbstractCommand, whether a sub-command command or a leaf command, has a number of overloadable getters that will fill in the details when using the default help system. These make is super simple to easily add help to your CLI without worrying about all the underlying details.  The methods are:

 - `get title() {}` - Returns the [string] title of this Command. When dsipalyed this title is all by itself, so if you want to show heirarchy, include it here.

 - `get usage() {}` - Returns the [string] usage pattern for this command. Note that when displayed as part of help, this does not include the parent usage, so you will need to include it here.

 - `get description() {}` - Returns the [string] description about this command. This does not need to include options/switches as those are covered in the `addOption()` calls you made in the constructor.

If you fill out these three getters, your help will produce a defula thelp screen that should be enough for most cases. It includes the `title`, `usage`, `description` your provided; it also will provide help about any switches or sub-commands that you created in the construtor.

## Before/After

Each command may implement the `before(args,options)` method or the `after(args,options)` method.  These methods are not required, but if you do implement them they will be executed before or after (respectively) the `execute(args,options)` method.

Before/After is useful for doing setup work that might be required, such as pre-loading information specified by a switch.  Like `execute(args,options)` before/after may return a Promise if you need to do asyncronous work.
