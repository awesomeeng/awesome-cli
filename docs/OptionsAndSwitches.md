# [AwesomeCLI](../README.md) > Options/Switches

Any command that you implement, including the root command, can have its own options/switches. These are arguments, specificed with a option/switch delimiter ("--" or "-" by default) that provide additional clues to how your CLI works.

# Scope

In CommandCLIs each level of your CLI can have its own set of options/switches that will be propagated to its sub-command, but not to its ancestor or sibling commands.  This makes for a very powerful CLI strucutre.

# Adding Options

You add options in the constructor of any class that inherits from `AbstractCommand` which includes `AwesomeCLI.CLI` and `AwesomeCLI.CommandCLI`.

```
const AwesomeCLI = require("@awesomeeng/awesome-cli");

class MyCommand extends AwesomeCLI.AbstractCommand {
	constructor() {
		super();

		... add options here ...
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

## Options Parsing

The `AbstractCommand` class takes care of parsing options out of the arguments.  Any switch/option delimiter ("--" or "-" by default) that comes before any sub-command is parsed as an option.  For example in the command `npm -g install -xyz @AwesomeEng/AwesomeLog` the "-g" option is parsed out and applied to the "npm" command class (the root command in this case). "-xyz" is parsed out and applied to the "install" sub-command.

In your `execute(args,options)` method, the options you define and parsed into the `options` object, and the remaining arguments are in the `args` array.

## Option Types

When you define an option you specify a type for that option.  The following types can be used:

 - **boolean** - Boolean options do not take any additional values. They are true/false values and if the option/switch is present in the command line, the invert of the defaultValue is returned. (`!defaultValue`).

 - **number** - Number options take an additional number argument immediately following it. There is no special validation done, other than tot ake the next command line argument, so you should validate these on your own when you use them.

 - **string** - String options take an additional string argument immediately following it. There is no special validation done, other than tot ake the next command line argument, so you should validate these on your own when you use them.

## Default Values

When you add an option you provide a default value. This value is what is provided in the `options` object. If a particular options/switch is given, the default value is overridden with the option/switch value.

## Description

When you add an option you may provide a description as the last argument. These descriptions are used if the default help method is called, or if a parent command needs to know about its child sub-commands.
