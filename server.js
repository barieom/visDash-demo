var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var favicon = require('serve-favicon');
var url = require("url");
var xml2js = require('xml2js');

// Include functions for to set up EVR pertaining data
var read = require('./modules/readFiles.js');
var getData = require('./modules/storeData.js');

var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/evr'));

var roomPath = path.join(__dirname, '/static/assets/data/rooms/');
var fygoalPath = path.join(__dirname, '/static/assets/data/fygoals/');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, '/static/assets/favicon/visDash.ico')));


// read file all xml in file and store... what to do with store?
var parser = new xml2js.Parser({explicitArray: false});

// retrieve all xml data
function getXML() {
	getData.data.getFYG(fygoalPath).then(function(result) {
		app.locals.fyg = result;
	});
	getData.data.getOutcome(roomPath).then(function(result) {
		app.locals.outcome = result;
	});
	getData.data.getRoom(roomPath).then(function(result) {
		app.locals.room = result;
	});
}

getXML();


app.get('/', function(req, res) {
	var path = "home";
	res.render('L1_hub', {path: path});
});

app.get('/faq', function(req, res) {
	var path = "home";
	res.render('faq', {path: path});
});

app.get('/valuestreams', function(req, res) {
	var path = "vs_hub";
	res.render('L2_hub', {path: path});
});

app.get('/:valuestream_name', function(req, res) {
	var id = app.locals.room.findIndex(function(item) {
		return item.room.name.toLowerCase().replace(/\s/g, "") == req.params.valuestream_name;
	});
	var path = "vs";
	var vs   = req.params.valuestream_name;
	res.render('valuestream', {id: id, path: path, vs: vs});
});

app.get('/:vs_name/:outcome_name', function(req, res) {
	var id = app.locals.outcome.findIndex(function(item) {
		// path extension for outcomes restricted to 16 letters because some are 30+
		var outcome_temp = item.outcome.name.toLowerCase().replace(/\s/g, "").replace(/[^a-zA-Z ]/g, "").substring(0, 16);
		return ((outcome_temp == req.params.outcome_name) && (item.outcome.room.toLowerCase().replace(/\s/g, "") == req.params.vs_name));			
	});
	var path = "outcome";
	var vs   = req.params.vs_name;
	res.render('outcome', {id: id, path: path, vs: vs});
});

module.exports = router;

app.listen(process.env.PORT || 5000);