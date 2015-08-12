var express = require('express');
var bodyParser = require('body-parser');

var smartsheet = require('./node/API/smartsheetsapi/smartsheet');
var trello = require('./node/API/trelloapi/trello');
var smartsheetapi = require('./node/API/smartsheetsapi/smartsheetapi');
var trelloapi = require('./node/API/trelloapi/trelloapi');
var populateWorkspaces = require('./node/app/populateWorkspaces');

var app = express();
app.use(bodyParser.json()); 

// setInterval(populateWorkspaces.run, 1 * 60 * 1000);

var id = '55b3e7d0d3d1b6158b9e176b';
var listId = '55b3e7ee71f8f454202a4f99';

// trelloapi.getCardsInList("Smartsheets Application", "Blocked", function(data){
// 	console.log(data);
// });

trelloapi.setWebhook('', id, function(data){
});

app.head('/', function(req, res){
	console.log('HEAD');
	res.sendStatus(200);
});

var getBlockingChecklist = function(checklists){
	for(var i = 0; i < checklists.length; i++){
		if(checklists[i].name === "Blocked By"){
			return checklists[i];
		}
	}
};

var getCardsToCheck = function(checkitems){
	var ret = [];
	var bindingRegex = /{{.*?}}/g;
	for(var i = 0; i < checkitems.length; i++){
		var checkItem = checkitems[i];
		if(bindingRegex.test(checkItem.name)){
			checkItem.name = checkItem.name.replace('{{','').replace('}}','');
			ret.push(checkItem);
		}
	}
	console.log(ret);
	return ret;
};

var updateCardAction = function(newCard){
	trello.getCardsInList("Smartsheets Application", "Blocked", function(cards){
		for(var i = 0; i < cards.length; i++){
			var card = cards[i];
			trelloapi.getChecklistByCard(card.id, function(checklists){
				console.log(checklists);
				var checklist = getBlockingChecklist(checklists);
				var checkitems = checklist.checkItems;
				var possibleCards = getCardsToCheck(checkitems);
				for(var j = 0; j < possibleCards.length; j++){
					if(possibleCards[j].name.indexOf('...') > -1){
						if(newCard.name.indexOf(possibleCards[j].name.replace('...','')) === 0){
							trelloapi.checkCheckbox(card.id, checklist.id, possibleCards[j].id, function(){});
							console.log('check: ', possibleCards[j] );
						}
					}
				}
			});
		}
	});
};

var updateCheckItemState = function(checklist){
	trelloapi.getChecklist(checklist.id, function(checklist){
		console.log(checklist);
		var checkitems = checklist.checkItems;
		var allCompleted = true;
		for(var i = 0; i < checkitems.length; i++){
			var checkitem = checkitems[i];
			if(checkitem.state === 'incomplete'){
				allCompleted = false;
				break;
			}
		}
		if(allCompleted){
			trello.moveCardToList(checklist.idCard, "To Do", "Smartsheets Application", function(data){});
		}
	});
}

app.post('/', function(req, res){
	console.log('POST');
	var action = req.body.action;
	console.log(action);
	if(action.type === "updateCard"){
		var card = action.data.card;
		if(card.idList === '55b3e7d0d3d1b6158b9e176e'){
			updateCardAction(card);
		}
	} else if(action.type === "updateCheckItemStateOnCard"){
		var checklist = action.data.checklist;
		if(checklist.name === "Blocked By"){
			updateCheckItemState(checklist);
		}
	}
	res.sendStatus(200);
});

app.get('/', function(req, res){
	console.log('GET');
	res.sendStatus(200);	
})

var server = app.listen(3000, function(){

});