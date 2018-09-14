## Classes

<dl>
<dt><a href="#AbstractCLI">AbstractCLI</a></dt>
<dd><p>Defines the shape of the root CLI including title, description, usage, help, and
options/switches. Additionally this contains all of the functionality of
running a CLI such as init, parseOptions, and run methods.</p>
<p>This class is the base class for <code>AwesomeCLI.CLI</code> and <code>AwesomeCLI.CommandCLI</code>.</p>
</dd>
<dt><a href="#AbstractCommand">AbstractCommand</a> ⇐ <code><a href="#AbstractCLI">AbstractCLI</a></code></dt>
<dd><p>Defines the shape of a command, be it a sub-command, or the root command
overloaded from <code>AwesomeCLI.CLI</code> or <code>AwesomeCLI.CommandCLI</code>.  While
root commands should inherit from <code>AwesomeCLI.CLI</code> or <code>AwesomeCLI.CommandCLI</code>
any sub-commands below those would inherit directly from <code>AbstractCommand</code>.</p>
<p>AbstractCommand inherits from AbstractCLI and thus has access to all of its
methods such as title, usage, desriptino, addOption, addOptionShortcut, etc.</p>
</dd>
<dt><a href="#BadCommandError">BadCommandError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when a command fails to compile or execute properly.</p>
</dd>
<dt><a href="#CLI">CLI</a> ⇐ <code><a href="#AbstractCLI">AbstractCLI</a></code></dt>
<dd><p>The root command for a singular CLI that is not using
sub-commands.</p>
</dd>
<dt><a href="#CLIUtils">CLIUtils</a></dt>
<dd><p>A selection of utilities to speed CLI development.</p>
</dd>
<dt><a href="#CommandCLI">CommandCLI</a> ⇐ <code><a href="#AbstractCommand">AbstractCommand</a></code></dt>
<dd><p>THe root command for a command based CLI that uses sub-commands.</p>
</dd>
<dt><a href="#InvalidCommandError">InvalidCommandError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown if a command that is being added is not a Function,
AbstractCommand, or filename string.</p>
</dd>
<dt><a href="#InvalidOptionError">InvalidOptionError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when an option is used when executing the CLI but that option does
not exist or is otherwise not allowed.</p>
</dd>
<dt><a href="#InvalidOptionValueError">InvalidOptionValueError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when a user of the CLI passes in a value to the CLI
that does not match the given type for the option, for example
passing a string when a number is required.</p>
</dd>
<dt><a href="#InvalidTypeError">InvalidTypeError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when an option is being added but the given type is not
&quot;*&quot; or &quot;string&quot; or &quot;number&quot; or &quot;boolean&quot;.</p>
</dd>
<dt><a href="#MissingCommandError">MissingCommandError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when a command CLI gets a command it does not have
a command mapped to.</p>
</dd>
<dt><a href="#MissingOptionValueError">MissingOptionValueError</a> ⇐ <code>Error</code></dt>
<dd><p>Thrown when a user of the CLI gives a specific option but
does not follow it with a required argument.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#AbstractCLI">AbstractCLI</a></dt>
<dd><p>Defines the AwesomeCLI main object, whcih returns pointer to the
various AwesomeCLI classes.</p>
</dd>
</dl>

<a name="AbstractCLI"></a>

## AbstractCLI
Defines the shape of the root CLI including title, description, usage, help, and
options/switches. Additionally this contains all of the functionality of
running a CLI such as init, parseOptions, and run methods.

This class is the base class for `AwesomeCLI.CLI` and `AwesomeCLI.CommandCLI`.

**Kind**: global class  

* [AbstractCLI](#AbstractCLI)
    * [new AbstractCLI()](#new_AbstractCLI_new)
    * [.title](#AbstractCLI+title) ⇒ <code>string</code>
    * [.description](#AbstractCLI+description) ⇒ <code>string</code>
    * [.usage](#AbstractCLI+usage) ⇒ <code>string</code>
    * [.help()](#AbstractCLI+help) ⇒ <code>void</code>
    * [.init(command, parsed)](#AbstractCLI+init) ⇒ <code>Object</code>
    * [.run(command, parsed)](#AbstractCLI+run) ⇒ <code>Promise</code>
    * [.getOption(optionName)](#AbstractCLI+getOption) ⇒ <code>Object</code>
    * [.getOptions()](#AbstractCLI+getOptions) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOption(optionName, [type], [defaultValue], [description])](#AbstractCLI+addOption)
    * [.removeOption(optionName)](#AbstractCLI+removeOption) ⇒ <code>void</code>
    * [.getOptionShortcut(shortcut)](#AbstractCLI+getOptionShortcut) ⇒ <code>string</code>
    * [.getOptionShortcuts()](#AbstractCLI+getOptionShortcuts) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOptionShortcut(shortcut, optionName)](#AbstractCLI+addOptionShortcut)
    * [.removeOptionShortcut(shortcut)](#AbstractCLI+removeOptionShortcut) ⇒ <code>void</code>
    * [.parseOptions(command, initialOptions)](#AbstractCLI+parseOptions) ⇒ <code>Object</code>


* * *

<a name="new_AbstractCLI_new"></a>

### new AbstractCLI()
Constructs a new CLI.


* * *

<a name="AbstractCLI+title"></a>

### abstractCLI.title ⇒ <code>string</code>
Returns the title of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+description"></a>

### abstractCLI.description ⇒ <code>string</code>
Returns the description of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+usage"></a>

### abstractCLI.usage ⇒ <code>string</code>
Returns the usage of this root CLI. Should be overloaded
by sxtending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+help"></a>

### abstractCLI.help() ⇒ <code>void</code>
The default help implementation for a root CLI. Overload this
if you want to customize your help display.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+init"></a>

### abstractCLI.init(command, parsed) ⇒ <code>Object</code>
Called by the `run()` method to initiate the root command and
option parsing. Generally this doesn't need to be overloaded.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  
**Returns**: <code>Object</code> - the parsed arguments and options.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+run"></a>

### abstractCLI.run(command, parsed) ⇒ <code>Promise</code>
Called when you start your CLI, this takes care of initializing, parsing
arguments, and ensuring everything is run smoothly.

By and large there is zero reason to overload this. You should overload
`execute(args,options)`, `before(args,options)`, or `after(args,options)`
instead.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+getOption"></a>

### abstractCLI.getOption(optionName) ⇒ <code>Object</code>
Returns the object used to describe an option after it has been added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptions"></a>

### abstractCLI.getOptions() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the option names that have been added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+addOption"></a>

### abstractCLI.addOption(optionName, [type], [defaultValue], [description])
Adds a new options.

**optionName** must be unique to this command and any descendant commands.

**type** can be "*", "boolean", "number", or "string".

**defaultvalue** is the value used if the option is not prvided.

**description** is the help description for this option.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Default |
| --- | --- | --- |
| optionName | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;\&quot;*\&quot;&quot;</code> | 
| [defaultValue] | <code>\*</code> |  | 
| [description] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 


* * *

<a name="AbstractCLI+removeOption"></a>

### abstractCLI.removeOption(optionName) ⇒ <code>void</code>
Removes a given option.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcut"></a>

### abstractCLI.getOptionShortcut(shortcut) ⇒ <code>string</code>
Returns the Shortcut object for a given shortcut.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcuts"></a>

### abstractCLI.getOptionShortcuts() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the shortcut names added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+addOptionShortcut"></a>

### abstractCLI.addOptionShortcut(shortcut, optionName)
Adds a new option shortcut which maps the `shortcut` to a
specific `optionName`.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+removeOptionShortcut"></a>

### abstractCLI.removeOptionShortcut(shortcut) ⇒ <code>void</code>
Removes an option shortcut.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+parseOptions"></a>

### abstractCLI.parseOptions(command, initialOptions) ⇒ <code>Object</code>
Responsible for parsing the command line arguments and determining
what is an option and what is an argument.

Generally there is no reason to overload this.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| initialOptions | <code>Object</code> |  |


* * *

<a name="AbstractCommand"></a>

## AbstractCommand ⇐ [<code>AbstractCLI</code>](#AbstractCLI)
Defines the shape of a command, be it a sub-command, or the root command
overloaded from `AwesomeCLI.CLI` or `AwesomeCLI.CommandCLI`.  While
root commands should inherit from `AwesomeCLI.CLI` or `AwesomeCLI.CommandCLI`
any sub-commands below those would inherit directly from `AbstractCommand`.

AbstractCommand inherits from AbstractCLI and thus has access to all of its
methods such as title, usage, desriptino, addOption, addOptionShortcut, etc.

**Kind**: global class  
**Extends**: [<code>AbstractCLI</code>](#AbstractCLI)  

* [AbstractCommand](#AbstractCommand) ⇐ [<code>AbstractCLI</code>](#AbstractCLI)
    * [new AbstractCommand()](#new_AbstractCommand_new)
    * [.title](#AbstractCommand+title) ⇒ <code>string</code>
    * [.description](#AbstractCommand+description) ⇒ <code>string</code>
    * [.usage](#AbstractCommand+usage) ⇒ <code>string</code>
    * [.help()](#AbstractCommand+help) ⇒ <code>void</code>
    * [.addCommand(name, command, description)](#AbstractCommand+addCommand)
    * [.removeCommand(name)](#AbstractCommand+removeCommand) ⇒ <code>void</code>
    * [.getCommand(name)](#AbstractCommand+getCommand) ⇒ <code>Object</code>
    * [.getCommands()](#AbstractCommand+getCommands) ⇒ <code>Array.&lt;string&gt;</code>
    * [.run(args, options)](#AbstractCommand+run) ⇒ <code>Promise</code>
    * [.init(command, parsed)](#AbstractCLI+init) ⇒ <code>Object</code>
    * [.getOption(optionName)](#AbstractCLI+getOption) ⇒ <code>Object</code>
    * [.getOptions()](#AbstractCLI+getOptions) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOption(optionName, [type], [defaultValue], [description])](#AbstractCLI+addOption)
    * [.removeOption(optionName)](#AbstractCLI+removeOption) ⇒ <code>void</code>
    * [.getOptionShortcut(shortcut)](#AbstractCLI+getOptionShortcut) ⇒ <code>string</code>
    * [.getOptionShortcuts()](#AbstractCLI+getOptionShortcuts) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOptionShortcut(shortcut, optionName)](#AbstractCLI+addOptionShortcut)
    * [.removeOptionShortcut(shortcut)](#AbstractCLI+removeOptionShortcut) ⇒ <code>void</code>
    * [.parseOptions(command, initialOptions)](#AbstractCLI+parseOptions) ⇒ <code>Object</code>


* * *

<a name="new_AbstractCommand_new"></a>

### new AbstractCommand()
Constructs a new AbstractCommand.


* * *

<a name="AbstractCommand+title"></a>

### abstractCommand.title ⇒ <code>string</code>
Returns the title of this AbstractCommand. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
**Overrides**: [<code>title</code>](#AbstractCLI+title)  

* * *

<a name="AbstractCommand+description"></a>

### abstractCommand.description ⇒ <code>string</code>
Returns the description of this AbstractCommand. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
**Overrides**: [<code>description</code>](#AbstractCLI+description)  

* * *

<a name="AbstractCommand+usage"></a>

### abstractCommand.usage ⇒ <code>string</code>
Returns the usage of this AbstractCommand. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
**Overrides**: [<code>usage</code>](#AbstractCLI+usage)  

* * *

<a name="AbstractCommand+help"></a>

### abstractCommand.help() ⇒ <code>void</code>
The default help implementation for a AbstractCommand. Overload this
if you want to customize your help display.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  
**Overrides**: [<code>help</code>](#AbstractCLI+help)  

* * *

<a name="AbstractCommand+addCommand"></a>

### abstractCommand.addCommand(name, command, description)
Add a new sub-command to this command.

**name** the name of the command, as it would be used.

**command** the command itself, which can be the following:

 - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".

 - **filenane** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**

	- **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.

**description** Help descriptive text for this command.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| command | <code>function</code> \| [<code>AbstractCommand</code>](#AbstractCommand) \| <code>string</code> | 
| description | <code>string</code> | 


* * *

<a name="AbstractCommand+removeCommand"></a>

### abstractCommand.removeCommand(name) ⇒ <code>void</code>
Remove a command by name.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 


* * *

<a name="AbstractCommand+getCommand"></a>

### abstractCommand.getCommand(name) ⇒ <code>Object</code>
Get the command object for a given command name.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 


* * *

<a name="AbstractCommand+getCommands"></a>

### abstractCommand.getCommands() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all command names for this particular command. Does
not return commands defined by ancestor commands.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

* * *

<a name="AbstractCommand+run"></a>

### abstractCommand.run(args, options) ⇒ <code>Promise</code>
Executes the given command. Generally speaking you should not
overload this function but instead overload `execute(args,options)` or
`before(args,options)` or `after(args,options)`.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  
**Overrides**: [<code>run</code>](#AbstractCLI+run)  

| Param | Type |
| --- | --- |
| args | <code>Array</code> | 
| options | <code>Object</code> | 


* * *

<a name="AbstractCLI+init"></a>

### abstractCommand.init(command, parsed) ⇒ <code>Object</code>
Called by the `run()` method to initiate the root command and
option parsing. Generally this doesn't need to be overloaded.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  
**Returns**: <code>Object</code> - the parsed arguments and options.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+getOption"></a>

### abstractCommand.getOption(optionName) ⇒ <code>Object</code>
Returns the object used to describe an option after it has been added.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptions"></a>

### abstractCommand.getOptions() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the option names that have been added.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

* * *

<a name="AbstractCLI+addOption"></a>

### abstractCommand.addOption(optionName, [type], [defaultValue], [description])
Adds a new options.

**optionName** must be unique to this command and any descendant commands.

**type** can be "*", "boolean", "number", or "string".

**defaultvalue** is the value used if the option is not prvided.

**description** is the help description for this option.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type | Default |
| --- | --- | --- |
| optionName | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;\&quot;*\&quot;&quot;</code> | 
| [defaultValue] | <code>\*</code> |  | 
| [description] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 


* * *

<a name="AbstractCLI+removeOption"></a>

### abstractCommand.removeOption(optionName) ⇒ <code>void</code>
Removes a given option.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcut"></a>

### abstractCommand.getOptionShortcut(shortcut) ⇒ <code>string</code>
Returns the Shortcut object for a given shortcut.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcuts"></a>

### abstractCommand.getOptionShortcuts() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the shortcut names added.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

* * *

<a name="AbstractCLI+addOptionShortcut"></a>

### abstractCommand.addOptionShortcut(shortcut, optionName)
Adds a new option shortcut which maps the `shortcut` to a
specific `optionName`.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+removeOptionShortcut"></a>

### abstractCommand.removeOptionShortcut(shortcut) ⇒ <code>void</code>
Removes an option shortcut.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+parseOptions"></a>

### abstractCommand.parseOptions(command, initialOptions) ⇒ <code>Object</code>
Responsible for parsing the command line arguments and determining
what is an option and what is an argument.

Generally there is no reason to overload this.

**Kind**: instance method of [<code>AbstractCommand</code>](#AbstractCommand)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| initialOptions | <code>Object</code> |  |


* * *

<a name="BadCommandError"></a>

## BadCommandError ⇐ <code>Error</code>
Thrown when a command fails to compile or execute properly.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="CLI"></a>

## CLI ⇐ [<code>AbstractCLI</code>](#AbstractCLI)
The root command for a singular CLI that is not using
sub-commands.

**Kind**: global class  
**Extends**: [<code>AbstractCLI</code>](#AbstractCLI)  

* [CLI](#CLI) ⇐ [<code>AbstractCLI</code>](#AbstractCLI)
    * [new CLI()](#new_CLI_new)
    * [.title](#CLI+title) ⇒ <code>string</code>
    * [.description](#CLI+description) ⇒ <code>string</code>
    * [.usage](#CLI+usage) ⇒ <code>string</code>
    * [.execute(args, options)](#CLI+execute) ⇒ <code>void</code> \| <code>Promise</code>
    * [.help()](#AbstractCLI+help) ⇒ <code>void</code>
    * [.init(command, parsed)](#AbstractCLI+init) ⇒ <code>Object</code>
    * [.run(command, parsed)](#AbstractCLI+run) ⇒ <code>Promise</code>
    * [.getOption(optionName)](#AbstractCLI+getOption) ⇒ <code>Object</code>
    * [.getOptions()](#AbstractCLI+getOptions) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOption(optionName, [type], [defaultValue], [description])](#AbstractCLI+addOption)
    * [.removeOption(optionName)](#AbstractCLI+removeOption) ⇒ <code>void</code>
    * [.getOptionShortcut(shortcut)](#AbstractCLI+getOptionShortcut) ⇒ <code>string</code>
    * [.getOptionShortcuts()](#AbstractCLI+getOptionShortcuts) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOptionShortcut(shortcut, optionName)](#AbstractCLI+addOptionShortcut)
    * [.removeOptionShortcut(shortcut)](#AbstractCLI+removeOptionShortcut) ⇒ <code>void</code>
    * [.parseOptions(command, initialOptions)](#AbstractCLI+parseOptions) ⇒ <code>Object</code>


* * *

<a name="new_CLI_new"></a>

### new CLI()
Constructs a new CLI.


* * *

<a name="CLI+title"></a>

### clI.title ⇒ <code>string</code>
Returns the title of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>CLI</code>](#CLI)  
**Overrides**: [<code>title</code>](#AbstractCLI+title)  

* * *

<a name="CLI+description"></a>

### clI.description ⇒ <code>string</code>
Returns the description of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>CLI</code>](#CLI)  
**Overrides**: [<code>description</code>](#AbstractCLI+description)  

* * *

<a name="CLI+usage"></a>

### clI.usage ⇒ <code>string</code>
Returns the usage of this root CLI. Should be overloaded
by sxtending classes.

**Kind**: instance property of [<code>CLI</code>](#CLI)  
**Overrides**: [<code>usage</code>](#AbstractCLI+usage)  

* * *

<a name="CLI+execute"></a>

### clI.execute(args, options) ⇒ <code>void</code> \| <code>Promise</code>
Overload `execute(args,options)` to do your work.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| args | <code>Array</code> | 
| options | <code>Object</code> | 


* * *

<a name="AbstractCLI+help"></a>

### clI.help() ⇒ <code>void</code>
The default help implementation for a root CLI. Overload this
if you want to customize your help display.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

* * *

<a name="AbstractCLI+init"></a>

### clI.init(command, parsed) ⇒ <code>Object</code>
Called by the `run()` method to initiate the root command and
option parsing. Generally this doesn't need to be overloaded.

**Kind**: instance method of [<code>CLI</code>](#CLI)  
**Returns**: <code>Object</code> - the parsed arguments and options.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+run"></a>

### clI.run(command, parsed) ⇒ <code>Promise</code>
Called when you start your CLI, this takes care of initializing, parsing
arguments, and ensuring everything is run smoothly.

By and large there is zero reason to overload this. You should overload
`execute(args,options)`, `before(args,options)`, or `after(args,options)`
instead.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+getOption"></a>

### clI.getOption(optionName) ⇒ <code>Object</code>
Returns the object used to describe an option after it has been added.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptions"></a>

### clI.getOptions() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the option names that have been added.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

* * *

<a name="AbstractCLI+addOption"></a>

### clI.addOption(optionName, [type], [defaultValue], [description])
Adds a new options.

**optionName** must be unique to this command and any descendant commands.

**type** can be "*", "boolean", "number", or "string".

**defaultvalue** is the value used if the option is not prvided.

**description** is the help description for this option.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type | Default |
| --- | --- | --- |
| optionName | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;\&quot;*\&quot;&quot;</code> | 
| [defaultValue] | <code>\*</code> |  | 
| [description] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 


* * *

<a name="AbstractCLI+removeOption"></a>

### clI.removeOption(optionName) ⇒ <code>void</code>
Removes a given option.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcut"></a>

### clI.getOptionShortcut(shortcut) ⇒ <code>string</code>
Returns the Shortcut object for a given shortcut.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcuts"></a>

### clI.getOptionShortcuts() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the shortcut names added.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

* * *

<a name="AbstractCLI+addOptionShortcut"></a>

### clI.addOptionShortcut(shortcut, optionName)
Adds a new option shortcut which maps the `shortcut` to a
specific `optionName`.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+removeOptionShortcut"></a>

### clI.removeOptionShortcut(shortcut) ⇒ <code>void</code>
Removes an option shortcut.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+parseOptions"></a>

### clI.parseOptions(command, initialOptions) ⇒ <code>Object</code>
Responsible for parsing the command line arguments and determining
what is an option and what is an argument.

Generally there is no reason to overload this.

**Kind**: instance method of [<code>CLI</code>](#CLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| initialOptions | <code>Object</code> |  |


* * *

<a name="CLIUtils"></a>

## CLIUtils
A selection of utilities to speed CLI development.

**Kind**: global class  

* [CLIUtils](#CLIUtils)
    * [.resolve(filename)](#CLIUtils+resolve) ⇒ <code>string</code>
    * [.readFile(filename, [encoding])](#CLIUtils+readFile) ⇒ <code>string</code>
    * [.readSTDIN([encoding])](#CLIUtils+readSTDIN) ⇒ <code>string</code>


* * *

<a name="CLIUtils+resolve"></a>

### cliUtils.resolve(filename) ⇒ <code>string</code>
Given some filename, resolve that filename relative to your current working directory, or
if that fails, against the directory of the calling module.

**Kind**: instance method of [<code>CLIUtils</code>](#CLIUtils)  

| Param | Type |
| --- | --- |
| filename | <code>string</code> | 


* * *

<a name="CLIUtils+readFile"></a>

### cliUtils.readFile(filename, [encoding]) ⇒ <code>string</code>
Given some filename, read the contents of that file from the file
system and return it as a string.

**Kind**: instance method of [<code>CLIUtils</code>](#CLIUtils)  

| Param | Type | Default |
| --- | --- | --- |
| filename | <code>string</code> |  | 
| [encoding] | <code>string</code> | <code>&quot;\&quot;utf-8\&quot;&quot;</code> | 


* * *

<a name="CLIUtils+readSTDIN"></a>

### cliUtils.readSTDIN([encoding]) ⇒ <code>string</code>
If your CLI had data piped to it, this command will read that data from
the stdin pipe and return it as a string.  Subsequent calls to this
function will return a cached copy of the stdin data.

Note, that this command is not intended to be used to read user
input from stdin. Please use node.js' `readline` library.

**Kind**: instance method of [<code>CLIUtils</code>](#CLIUtils)  

| Param | Type | Default |
| --- | --- | --- |
| [encoding] | <code>string</code> | <code>&quot;\&quot;utf-8\&quot;&quot;</code> | 


* * *

<a name="CommandCLI"></a>

## CommandCLI ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
THe root command for a command based CLI that uses sub-commands.

**Kind**: global class  
**Extends**: [<code>AbstractCommand</code>](#AbstractCommand)  

* [CommandCLI](#CommandCLI) ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
    * [new CommandCLI()](#new_CommandCLI_new)
    * [.title](#CommandCLI+title) ⇒ <code>string</code>
    * [.description](#CommandCLI+description) ⇒ <code>string</code>
    * [.usage](#CommandCLI+usage) ⇒ <code>string</code>
    * [.help()](#AbstractCommand+help) ⇒ <code>void</code>
    * [.addCommand(name, command, description)](#AbstractCommand+addCommand)
    * [.removeCommand(name)](#AbstractCommand+removeCommand) ⇒ <code>void</code>
    * [.getCommand(name)](#AbstractCommand+getCommand) ⇒ <code>Object</code>
    * [.getCommands()](#AbstractCommand+getCommands) ⇒ <code>Array.&lt;string&gt;</code>
    * [.run(args, options)](#AbstractCommand+run) ⇒ <code>Promise</code>
    * [.init(command, parsed)](#AbstractCLI+init) ⇒ <code>Object</code>
    * [.getOption(optionName)](#AbstractCLI+getOption) ⇒ <code>Object</code>
    * [.getOptions()](#AbstractCLI+getOptions) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOption(optionName, [type], [defaultValue], [description])](#AbstractCLI+addOption)
    * [.removeOption(optionName)](#AbstractCLI+removeOption) ⇒ <code>void</code>
    * [.getOptionShortcut(shortcut)](#AbstractCLI+getOptionShortcut) ⇒ <code>string</code>
    * [.getOptionShortcuts()](#AbstractCLI+getOptionShortcuts) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOptionShortcut(shortcut, optionName)](#AbstractCLI+addOptionShortcut)
    * [.removeOptionShortcut(shortcut)](#AbstractCLI+removeOptionShortcut) ⇒ <code>void</code>
    * [.parseOptions(command, initialOptions)](#AbstractCLI+parseOptions) ⇒ <code>Object</code>


* * *

<a name="new_CommandCLI_new"></a>

### new CommandCLI()
Constructs a new CLI.


* * *

<a name="CommandCLI+title"></a>

### commandCLI.title ⇒ <code>string</code>
Returns the title of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>CommandCLI</code>](#CommandCLI)  
**Overrides**: [<code>title</code>](#AbstractCommand+title)  

* * *

<a name="CommandCLI+description"></a>

### commandCLI.description ⇒ <code>string</code>
Returns the description of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>CommandCLI</code>](#CommandCLI)  
**Overrides**: [<code>description</code>](#AbstractCommand+description)  

* * *

<a name="CommandCLI+usage"></a>

### commandCLI.usage ⇒ <code>string</code>
Returns the usage of this root CLI. Should be overloaded
by sxtending classes.

**Kind**: instance property of [<code>CommandCLI</code>](#CommandCLI)  
**Overrides**: [<code>usage</code>](#AbstractCommand+usage)  

* * *

<a name="AbstractCommand+help"></a>

### commandCLI.help() ⇒ <code>void</code>
The default help implementation for a AbstractCommand. Overload this
if you want to customize your help display.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

* * *

<a name="AbstractCommand+addCommand"></a>

### commandCLI.addCommand(name, command, description)
Add a new sub-command to this command.

**name** the name of the command, as it would be used.

**command** the command itself, which can be the following:

 - **function** commands, are simple functions that get passed the signature `(args,options)` when the command is executed. This approach is great for very simple "command CLIs".

 - **filenane** commands will, if the file exists and exports a sub-class of the `AwesomeCLI.AbstractCommand` class, load it as javascript, and create an instance of it.  This lets you write sub-commands in their own class space and easily load them into AwesomeCLI. **This is the best approach to doing commands and highly recommended.**

	- **AbstractCommmand** commands, are similar to **filename** commands, but they dont do the loading as you are already providing the loaded instance to AwesomeCLI.

**description** Help descriptive text for this command.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| command | <code>function</code> \| [<code>AbstractCommand</code>](#AbstractCommand) \| <code>string</code> | 
| description | <code>string</code> | 


* * *

<a name="AbstractCommand+removeCommand"></a>

### commandCLI.removeCommand(name) ⇒ <code>void</code>
Remove a command by name.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 


* * *

<a name="AbstractCommand+getCommand"></a>

### commandCLI.getCommand(name) ⇒ <code>Object</code>
Get the command object for a given command name.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 


* * *

<a name="AbstractCommand+getCommands"></a>

### commandCLI.getCommands() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all command names for this particular command. Does
not return commands defined by ancestor commands.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

* * *

<a name="AbstractCommand+run"></a>

### commandCLI.run(args, options) ⇒ <code>Promise</code>
Executes the given command. Generally speaking you should not
overload this function but instead overload `execute(args,options)` or
`before(args,options)` or `after(args,options)`.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| args | <code>Array</code> | 
| options | <code>Object</code> | 


* * *

<a name="AbstractCLI+init"></a>

### commandCLI.init(command, parsed) ⇒ <code>Object</code>
Called by the `run()` method to initiate the root command and
option parsing. Generally this doesn't need to be overloaded.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  
**Returns**: <code>Object</code> - the parsed arguments and options.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+getOption"></a>

### commandCLI.getOption(optionName) ⇒ <code>Object</code>
Returns the object used to describe an option after it has been added.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptions"></a>

### commandCLI.getOptions() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the option names that have been added.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

* * *

<a name="AbstractCLI+addOption"></a>

### commandCLI.addOption(optionName, [type], [defaultValue], [description])
Adds a new options.

**optionName** must be unique to this command and any descendant commands.

**type** can be "*", "boolean", "number", or "string".

**defaultvalue** is the value used if the option is not prvided.

**description** is the help description for this option.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type | Default |
| --- | --- | --- |
| optionName | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;\&quot;*\&quot;&quot;</code> | 
| [defaultValue] | <code>\*</code> |  | 
| [description] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 


* * *

<a name="AbstractCLI+removeOption"></a>

### commandCLI.removeOption(optionName) ⇒ <code>void</code>
Removes a given option.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcut"></a>

### commandCLI.getOptionShortcut(shortcut) ⇒ <code>string</code>
Returns the Shortcut object for a given shortcut.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcuts"></a>

### commandCLI.getOptionShortcuts() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the shortcut names added.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

* * *

<a name="AbstractCLI+addOptionShortcut"></a>

### commandCLI.addOptionShortcut(shortcut, optionName)
Adds a new option shortcut which maps the `shortcut` to a
specific `optionName`.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+removeOptionShortcut"></a>

### commandCLI.removeOptionShortcut(shortcut) ⇒ <code>void</code>
Removes an option shortcut.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+parseOptions"></a>

### commandCLI.parseOptions(command, initialOptions) ⇒ <code>Object</code>
Responsible for parsing the command line arguments and determining
what is an option and what is an argument.

Generally there is no reason to overload this.

**Kind**: instance method of [<code>CommandCLI</code>](#CommandCLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| initialOptions | <code>Object</code> |  |


* * *

<a name="InvalidCommandError"></a>

## InvalidCommandError ⇐ <code>Error</code>
Thrown if a command that is being added is not a Function,
AbstractCommand, or filename string.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="InvalidOptionError"></a>

## InvalidOptionError ⇐ <code>Error</code>
Thrown when an option is used when executing the CLI but that option does
not exist or is otherwise not allowed.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="InvalidOptionValueError"></a>

## InvalidOptionValueError ⇐ <code>Error</code>
Thrown when a user of the CLI passes in a value to the CLI
that does not match the given type for the option, for example
passing a string when a number is required.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="InvalidTypeError"></a>

## InvalidTypeError ⇐ <code>Error</code>
Thrown when an option is being added but the given type is not
"*" or "string" or "number" or "boolean".

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="MissingCommandError"></a>

## MissingCommandError ⇐ <code>Error</code>
Thrown when a command CLI gets a command it does not have
a command mapped to.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="MissingOptionValueError"></a>

## MissingOptionValueError ⇐ <code>Error</code>
Thrown when a user of the CLI gives a specific option but
does not follow it with a required argument.

**Kind**: global class  
**Extends**: <code>Error</code>  

* * *

<a name="AbstractCLI"></a>

## AbstractCLI
Defines the AwesomeCLI main object, whcih returns pointer to the
various AwesomeCLI classes.

**Kind**: global constant  

* [AbstractCLI](#AbstractCLI)
    * [new AbstractCLI()](#new_AbstractCLI_new)
    * [.title](#AbstractCLI+title) ⇒ <code>string</code>
    * [.description](#AbstractCLI+description) ⇒ <code>string</code>
    * [.usage](#AbstractCLI+usage) ⇒ <code>string</code>
    * [.help()](#AbstractCLI+help) ⇒ <code>void</code>
    * [.init(command, parsed)](#AbstractCLI+init) ⇒ <code>Object</code>
    * [.run(command, parsed)](#AbstractCLI+run) ⇒ <code>Promise</code>
    * [.getOption(optionName)](#AbstractCLI+getOption) ⇒ <code>Object</code>
    * [.getOptions()](#AbstractCLI+getOptions) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOption(optionName, [type], [defaultValue], [description])](#AbstractCLI+addOption)
    * [.removeOption(optionName)](#AbstractCLI+removeOption) ⇒ <code>void</code>
    * [.getOptionShortcut(shortcut)](#AbstractCLI+getOptionShortcut) ⇒ <code>string</code>
    * [.getOptionShortcuts()](#AbstractCLI+getOptionShortcuts) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addOptionShortcut(shortcut, optionName)](#AbstractCLI+addOptionShortcut)
    * [.removeOptionShortcut(shortcut)](#AbstractCLI+removeOptionShortcut) ⇒ <code>void</code>
    * [.parseOptions(command, initialOptions)](#AbstractCLI+parseOptions) ⇒ <code>Object</code>


* * *

<a name="new_AbstractCLI_new"></a>

### new AbstractCLI()
Constructs a new CLI.


* * *

<a name="AbstractCLI+title"></a>

### abstractCLI.title ⇒ <code>string</code>
Returns the title of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+description"></a>

### abstractCLI.description ⇒ <code>string</code>
Returns the description of this root CLI. Should be overloaded
by extending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+usage"></a>

### abstractCLI.usage ⇒ <code>string</code>
Returns the usage of this root CLI. Should be overloaded
by sxtending classes.

**Kind**: instance property of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+help"></a>

### abstractCLI.help() ⇒ <code>void</code>
The default help implementation for a root CLI. Overload this
if you want to customize your help display.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+init"></a>

### abstractCLI.init(command, parsed) ⇒ <code>Object</code>
Called by the `run()` method to initiate the root command and
option parsing. Generally this doesn't need to be overloaded.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  
**Returns**: <code>Object</code> - the parsed arguments and options.  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+run"></a>

### abstractCLI.run(command, parsed) ⇒ <code>Promise</code>
Called when you start your CLI, this takes care of initializing, parsing
arguments, and ensuring everything is run smoothly.

By and large there is zero reason to overload this. You should overload
`execute(args,options)`, `before(args,options)`, or `after(args,options)`
instead.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| parsed | <code>Object</code> | options and their values. |


* * *

<a name="AbstractCLI+getOption"></a>

### abstractCLI.getOption(optionName) ⇒ <code>Object</code>
Returns the object used to describe an option after it has been added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptions"></a>

### abstractCLI.getOptions() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the option names that have been added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+addOption"></a>

### abstractCLI.addOption(optionName, [type], [defaultValue], [description])
Adds a new options.

**optionName** must be unique to this command and any descendant commands.

**type** can be "*", "boolean", "number", or "string".

**defaultvalue** is the value used if the option is not prvided.

**description** is the help description for this option.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Default |
| --- | --- | --- |
| optionName | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;\&quot;*\&quot;&quot;</code> | 
| [defaultValue] | <code>\*</code> |  | 
| [description] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 


* * *

<a name="AbstractCLI+removeOption"></a>

### abstractCLI.removeOption(optionName) ⇒ <code>void</code>
Removes a given option.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcut"></a>

### abstractCLI.getOptionShortcut(shortcut) ⇒ <code>string</code>
Returns the Shortcut object for a given shortcut.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+getOptionShortcuts"></a>

### abstractCLI.getOptionShortcuts() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of all the shortcut names added.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

* * *

<a name="AbstractCLI+addOptionShortcut"></a>

### abstractCLI.addOptionShortcut(shortcut, optionName)
Adds a new option shortcut which maps the `shortcut` to a
specific `optionName`.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 
| optionName | <code>string</code> | 


* * *

<a name="AbstractCLI+removeOptionShortcut"></a>

### abstractCLI.removeOptionShortcut(shortcut) ⇒ <code>void</code>
Removes an option shortcut.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type |
| --- | --- |
| shortcut | <code>string</code> | 


* * *

<a name="AbstractCLI+parseOptions"></a>

### abstractCLI.parseOptions(command, initialOptions) ⇒ <code>Object</code>
Responsible for parsing the command line arguments and determining
what is an option and what is an argument.

Generally there is no reason to overload this.

**Kind**: instance method of [<code>AbstractCLI</code>](#AbstractCLI)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | line arguments. |
| initialOptions | <code>Object</code> |  |


* * *

