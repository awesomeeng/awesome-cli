# [AwesomeCLI](../README.md) > Help

Each Command, including the root command, provides a default help() function. Here's how it works.

## How Help Gets Called

Help is mostly called by your app, when it wants to display help. This could be done with the "--help" option...

```
	this.addOption("help","boolean",false,"Show help.");
	...
	if (options.help) {
		this.help();
		return;
	}
```

Or if you have a Command CLI, the default behavior is to show help if the "help" argument is passed at the end of the arguments. For example in `npm -g install help`

Of course, you are free to come up with your own ways to show help, simply call the `this.help()` function from your `execute(Args,options)` method.

## Default Help

By default AwesomeCLI provides a basic help display. If you do nothing you get this for free.  I looks like this:

```
textutils

A set of text file utilities for getting more from the text content.

Usage:

  textutils [global options] [command]

Options:

   --source | --src | --s [string] : Specify a source file.

Commands:

  line : Text utilities for working with lines.
  word : Text utilities for working with words.

```

It starts with the title of the command you are displaying help about, or the title of your root application.

Next, the description of your command or root application is shown.

Next, the usage of your command or root application is shown.

Next, all of the options that you defined along with their shortcuts are shown.

Finally, if you have any sub-commands they are shown.

## Overloading Help

You are free to overload the `help()` method of any `AbstractCommand` including `AwesomeCLI.CLI` and `AwesomeCLI.CommandCLI`. Just overload the method and print out whatever help message you want.
