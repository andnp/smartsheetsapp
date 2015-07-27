var smartsheet = require('../data/smartsheet');
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
	console.log(arrayCompleteCount);
	if (arrayCompleteCount === 3){
		console.log("finding missing sheets");
		var arrayMissingTimeLines;
		var arrayMissingIssues;
	
    	arrayMissingTimeLines = arrayProjectChecklists.filter(function(i) {
    		return arrayProjectTimelines.indexOf(i) < 0;
    	});
		arrayMissingIssues = arrayProjectChecklists.filter(function(i) {
    		return arrayIssueTrackers.indexOf(i) < 0;
    	});
    	console.log(arrayMissingTimeLines);
    	console.log(arrayMissingIssues);
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

setInterval(populateWorkspaces, 1 * 60 * 1000)


// if either is missing a project name, create a sheet from template and give it the correct name
// 
// 
// repeat every (?) 5 minutes (?)

