var express = require('express');
var smartsheet = require('./node/data/smartsheet');
var smartsheetapi = require('./node/API/smartsheetapi');
var trelloapi = require('./node/API/trelloapi');
var populateWorkspaces = require('./node/API/app/populateWorkspaces');



var app = express();

var id = "55b3e7d0d3d1b6158b9e176b";

trelloapi.getBoard(id, function(){});