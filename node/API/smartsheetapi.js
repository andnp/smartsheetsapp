var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

module.exports = {
	/**
	 * [getSheets gets all sheets from api]
	 * @param  {[function]} onComplete [function to be run on successful api call]
	 */
	getSheets: function(onComplete){
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
	},
	/**
	 * [getSheet gets sheet data from api]
	 * @param  {[String]} sheetId    [The id of a sheet]
	 * @param  {[function]} onComplete [function to be run on successful api call]
	 */
	getSheet: function(sheetId, onComplete){
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
	},
	getColumns: function(sheetId, onComplete){
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
	},
	createSheetInWorkspaceFromTemplate: function(workspaceId, sheetName, templateId, onComplete){
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
	},
	getWorkspaces: function(onComplete){
		fs.readFile('accesskeys.json', 'utf8', function(err,data){
			var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
			var options = {
				url: SMARTSHEET_URL + '/workspaces',
				headers:{
					'Authorization' : 'Bearer ' + ACCESS_TOKEN
				}
			};
			request(options, function(error, response, body){
				onComplete(JSON.parse(body).data);
			});
		});
	},
	getWorkspace: function(workspaceId, onComplete){
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
	},
};