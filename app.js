var express = require('express');
var smartsheet = require('./node/data/smartsheet');
var smartsheetapi = require('./node/API/smartsheetapi');
var trelloapi = require('./node/API/trelloapi');
var populateWorkspaces = require('./node/app/populateWorkspaces');

var app = express();

setInterval(populateWorkspaces.run, 1 * 60 * 1000);