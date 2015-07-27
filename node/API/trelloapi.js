var http = require('http');
var request = require('request');
var fs = require('fs');

var TRELLO_URL = "https://api.trello.com/1";

var getBoards = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var TOKEN = JSON.parse(data).trello.token;
		var KEY = JSON.parse(data).trello.accesskey;
		var options = {
			url: TRELLO_URL + "/members/me/boards?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

var getBoard = function(boardId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var KEY = JSON.parse(data).trello.accesskey;
		var TOKEN = JSON.parse(data).trello.token;
		var options = {
			url: TRELLO_URL + "/boards/" + boardId + "?token=" + TOKEN + "&key=" + KEY
		};
		request(options, function(err, response, body){
			onComplete(JSON.parse(body));
		});
	});
}

module.exports = {
	getBoards: getBoards,
	getBoard: getBoard
}