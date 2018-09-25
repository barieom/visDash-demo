var read = require('./readFiles.js');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray: false});
const {promisify} = require('util');
var parseAsync = promisify(parser.parseString);

var methods = {
	getFYGHelp: async function(dirname) {
		return await  read.data.preprocessXML(await read.data.openFYG(dirname));
	},

	getFYG: async function(dirname) {
		var arr =[];
		var bufferArr = await this.getFYGHelp(dirname);
		arr = await Promise.all(bufferArr.map(async function (item) {
			return await parseAsync(item)
		})).catch(console.log.bind(console));
		return arr;
	},

	getOutcomeHelp: async function(dirname) {
		return await read.data.preprocessXML(await read.data.openOutcome(dirname));
	},

	getOutcome: async function(dirname) {
		var arr = [];
		var bufferArr = await this.getOutcomeHelp(dirname);
		arr = await Promise.all(bufferArr.map(async function(item) {
			return await parseAsync(item);	
		})).catch(console.log.bind(console));
		return arr;
	},

	getRoomHelp: async function(dirname) {
		return await read.data.preprocessXML(await read.data.openRoom(dirname));
	},

	getRoom: async function(dirname) {
		var arr =[];
		var bufferArr = await this.getRoomHelp(dirname);
		arr = await Promise.all(bufferArr.map(async function (item) {
			return await parseAsync(item)
		})).catch(console.log.bind(console));
		return arr;

		// var arr =[];
		// this.getRoomHelp(dirname).then(function (data) {
		// 	Promise.all(data.map(function (item) {
		// 		parser.parseString(item, (function(err, result) {
		// 			// console.log(result)
		// 			var temp = await result;
		// 			 arr.push(temp);
		// 		}));
		// 	}));
		// }).catch(console.log.bind(console));
		// console.log(arr[0])
		// console.log(arr)
		// return arr;
	}
};

exports.data = methods;