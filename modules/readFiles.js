var fs = require('mz/fs');
var path = require('path');
var express = require('express');
var app = express();

var methods = {

	openFYG: function(dirname) {
		return fs.readdir(dirname).then((filenames) => {
			return Promise.all(filenames.map((filename) => {
				return fs.readFile(path.join(dirname, filename));
			}));
		});

	},

	openOutcome: async function(dirname) {
		return await fs.readdir(dirname).then((roomnames) => {
			return Promise.all(roomnames.map((roomname) => {
				return fs.readdir(path.join(dirname, roomname)).then((filenames) => {
					return Promise.all((filenames.filter((filename) => { return filename != "room.xml" })).map((filename) => {
						return fs.readFile(path.join(dirname, roomname, filename));
					}));
				});
			}));
		});
	},

	openRoom: async function(dirname) {
		return await fs.readdir(dirname).then((roomnames) => {
			return Promise.all(roomnames.map((roomname) => {
				return fs.readdir(path.join(dirname, roomname)).then((filenames) => {
					return Promise.all((filenames.filter((filename) => { return filename == "room.xml" })).map((filename) => {
						return fs.readFile(path.join(dirname, roomname, filename));
					}));
				});
			}));
		});
	},

	preprocessXML: async function(buffer) {
		var bufferArr = [].concat.apply([], (buffer));
		return await Promise.all(bufferArr.map(function(item) {
			return Buffer.from(((item.toString('utf8')).replace(/&/g,"&amp;").replace(/-/g,"&#45;")), 'utf8');
		}));
	}
};

exports.data = methods;