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

var createSheetInWorkspaceFromTemplate = function(workspaceId, sheetName, templateId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/' + workspaceId + "/sheets/",
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
			onComplete(JSON.parse(body));
		});
	});
};

module.exports = {
	getSheets: getSheets,
	getSheet: getSheet,
	createSheetInWorkspaceFromTemplate: createSheetInWorkspaceFromTemplate
}