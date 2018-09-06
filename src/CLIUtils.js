// (c) 2018, The Awesome Engineering Company, https://awesomeneg.com

"use strict";

const Path = require("path");
const FS = require("fs");

const AwesomeUtils = require("AwesomeUtils");

const $STDIN_DATA = Symbol("stdin_data");

class CLIUtils{
	resolve(filename) {
		const getStat = (f)=>{
			try {
				return FS.statSync(f);
			}
			catch (ex) {
				return null;
			}
		};

		let path,stat;

		// try the filename relative to process.cwd()
		path = Path.resolve(process.cwd(),filename);
		stat = getStat(path);
		if (stat) return {
			filename: path,
			stat
		};

		// try the filename relative to the module parent
		if (module && module.parent) {
			path = AwesomeUtils.Module.resolve(module.parent,filename);
			stat = getStat(path);
			if (stat) return {
				filename: path,
				stat
			};
		}

		// fail
		return null;
	}

	readFile(filename,encoding="utf-8") {
		if (!filename) throw new Error("Missing filename.");
		if (typeof filename!=="string") throw new Error("Invalid filename.");
		if (!encoding) throw new Error("Missing encoding.");
		if (typeof encoding!=="string") throw new Error("Invalid encoding.");

		return new Promise(async (resolve,reject)=>{
			try {
				filename = Path.resolve(process.cwd(),filename);

				try {
					let stat = await new Promise((resolve,reject)=>{
						try {
							FS.stat(filename,(err,stat)=>{
								if (err) reject(err);
								resolve(stat);
							});
						}
						catch (ex) {
							return reject(ex);
						}
					});
					if (!stat.isFile()) return reject(new Error("Filename must be a valid file: "+filename));
				}
				catch (ex) {
					return reject(new Error("File not found: "+filename));
				}

				FS.readFile(filename,{encoding},(err,content)=>{
					if (err) return reject(new Error("Error reading file: "+filename));
					resolve(content);
				});

			}
			catch (ex) {
				return reject(ex);
			}
		});
	}

	readSTDIN(encoding="utf-8") {
		if (this[$STDIN_DATA]) return Promise.resolve(this[$STDIN_DATA]);
		if (!process || !process.stdin || process.stdin.isTTY) return Promise.resolve("");

		return new Promise((resolve,reject)=>{
			try {
				let content = "";
				process.stdin.on("data",(chunk)=>{
					content += chunk;
				});
				process.stdin.once("end",()=>{
					this[$STDIN_DATA] = content.toString(encoding);
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
}

module.exports = new CLIUtils();
