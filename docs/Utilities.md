# [AwesomeCLI](../README.md) > Utilities

AwesomeCLI has some built in utilities to speed your CLI development.

## `AwesomeCLI.CLUUtils.resolve(filename)`

A utility to resolve some filename against the current working directory, or your current module directory. Resolution is first attempted against the current working directory, and then falls through to the module directory if te current working directory fails.

## `AwesomeCLI.CLUUtils.readFile(filename,encoding)`

A very quick way to read a file that may have been passed as an argument or option. Reads the given file, with the given encoding (defaulting to "utf-8" if not provided) and returns it as a string.

## `AwesomeCLI.CLUUtils.readSTDIN(encoding)`

Reads the STDIN pipe for content. Also caches that read content so subsquent calls can be made for the same content.

This will only read if STDIN was a pipe of content and should not be used for user input.
