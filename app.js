var express = require('express');
var smartsheet = require('./node/data/smartsheet');
var smartsheetapi = require('./node/API/smartsheetapi');

var app = express();

//smartsheet.getWorkspaceByName("Project Checklists", function(workspaces){
//	console.log(workspaces.sheets[0].name.split(":")[0]);
//});

[1,2,3,4,5,6].diff( [3,4,5] );
