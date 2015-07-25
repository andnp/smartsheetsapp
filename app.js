var express = require('express');
var smartsheet = require('./node/data/smartsheet');
var smartsheetapi = require('./node/API/smartsheetapi');

var app = express();

smartsheetapi.getWorkspace("6090650006382468", function(workspaces){
	console.log(workspaces);
});