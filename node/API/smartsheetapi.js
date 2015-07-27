var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

var getSheets = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err,data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		};
		request(options, function(error, response, body){
			onComplete(JSON.parse(body).data);
		});
	});
};

var getSheet = function(sheetId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets/' + sheetId,
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getColumns = function(sheetId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets/' + sheetId + "/columns/",
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var createSheetInWorkspaceFromTemplate = function(workspaceId, sheetName, templateId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/' + workspaceId + "/sheets/?include=data,attachments,discussions,cellLinks,forms",
			method: 'POST',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN,
				'Content-Type' : 'application/json'
			},
			json: {
				name: sheetName,
				fromId: templateId
			}

		}; 
		request(options, function(error, response, body){
			console.log(error);
			console.log(body);
			//onComplete(JSON.parse(body));
		});
	});
};

var getWorkspaces = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err,data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		};
		request(options, function(error, response, body){
			onComplete(JSON.parse(body).data);
		});
	});
};

var getTemplates = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err,data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/templates/',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		};
		request(options, function(error, response, body){
			onComplete(JSON.parse(body).data);
		});
	});
};

var getWorkspace = function(workspaceId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/' + workspaceId,
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

module.exports = {
	getSheets: getSheets,
	getSheet: getSheet,
	getColumns: getColumns,
	createSheetInWorkspaceFromTemplate: createSheetInWorkspaceFromTemplate,
	getWorkspaces: getWorkspaces,
	getTemplates: getTemplates,
	getWorkspace: getWorkspace
};