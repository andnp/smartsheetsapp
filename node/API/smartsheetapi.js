var http = require('http');
var request = require('request');
var fs = require('fs');

var sheet = require('./smartsheets/sheet');
var column = require('./smartsheets/column');
var workspace = require('./smartsheets/workspace');
var template = require('./smartsheets/template');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

module.exports = {
	getSheets: sheet.getSheets,
	getSheet: sheet.getSheet,
	createSheetInWorkspaceFromTemplate: sheet.createSheetInWorkspaceFromTemplate,
	getColumns: column.getColumns,
	getWorkspaces: workspace.getWorkspaces,
	getTemplates: template.getTemplates,
	getWorkspace: workspace.getWorkspace
};