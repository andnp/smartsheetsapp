var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

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

module.exports = {
	getTemplates: getTemplates
}