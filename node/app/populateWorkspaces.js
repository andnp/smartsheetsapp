var smartsheet = require('../API/smartsheetsapi/smartsheet');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var arrayCompleteCount = 0;
var arrayProjectChecklists = [];
var arrayProjectTimelines = [];
var arrayIssueTrackers = [];



// get list of all sheets inside the 'Project Checklists' workspace
// and make a list of the project names

var buildArraysComplete = function(){
	arrayCompleteCount = arrayCompleteCount + 1;
	if (arrayCompleteCount === 3){
		console.log("Finding missing sheets");
		var arrayMissingTimeLines;
		var arrayMissingIssues;
	
    	arrayMissingTimeLines = arrayProjectChecklists.filter(function(i) {
    		return arrayProjectTimelines.indexOf(i) < 0;
    	});
		arrayMissingIssues = arrayProjectChecklists.filter(function(i) {
    		return arrayIssueTrackers.indexOf(i) < 0;
    	});
    	if(arrayMissingTimeLines.length > 0) console.info(arrayMissingTimeLines);
    	if(arrayMissingIssues.length > 0) console.info(arrayMissingIssues);
    	arrayMissingTimeLines.forEach(function(sheetName){
	    	smartsheet.createSheetInWorkspaceFromTemplate("Project Timelines","14 Week",sheetName,function(){});
    	});
    	arrayMissingIssues.forEach(function(sheetName){
	    	smartsheet.createSheetInWorkspaceFromTemplate("Issue Trackers","Task List",sheetName,function(){});
    	});
    	arrayCompleteCount = 0;
	}
	
};

var populateWorkspaces = function(){
	smartsheet.getWorkspaceByName("Project Checklists", function(workspace){
		for(var i = 0; i < workspace.sheets.length; i++){
			var sheet = workspace.sheets[i];
			arrayProjectChecklists.push(sheet.name.split(":")[0]);
		}
		//console.log(arrayProjectChecklists);
		eventEmitter.emit('buildArrayComplete');
	});
	// get list of all sheets inside the 'Issue Trackers' workspace
	smartsheet.getWorkspaceByName("Issue Trackers", function(workspace){
		for(var i = 0; i < workspace.sheets.length; i++){
			var sheet = workspace.sheets[i];
			arrayIssueTrackers.push(sheet.name.split(":")[0]);
		}
		eventEmitter.emit('buildArrayComplete');
	});

	// get list of all sheets inside the 'Project Timelines' workspace
	smartsheet.getWorkspaceByName("Project Timelines", function(workspace){
		for(var i = 0; i < workspace.sheets.length; i++){
			var sheet = workspace.sheets[i];
			arrayProjectTimelines.push(sheet.name.split(":")[0]);
		}
		//console.log(arrayProjectTimelines);
		eventEmitter.emit('buildArrayComplete');
	});
	// check the Issue Trackers and Project Timelines workspaces and compare their lists of project names to ours
}
eventEmitter.on('buildArrayComplete', buildArraysComplete);

module.exports = {
	run: populateWorkspaces
}

