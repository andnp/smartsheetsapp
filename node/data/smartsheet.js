var smartsheetapi = require('../API/smartsheetapi');

module.exports = {

	getSheetByName: function(sheetName, onComplete){
		smartsheetapi.getSheets(function(sheets){
			var id;
			sheets.forEach(function(sheet){
				if(sheet.name === sheetName){
					id = sheet.id;
					smartsheetapi.getSheet(id, function(sheetData){
						console.log(sheetData);
					});
				}
			});
		});
	},

	getSheetColumns: function(sheetName, onComplete){
		smartsheetapi.getSheets(function(sheets){
			var id;
			sheets.forEach(function(sheet){
				if(sheet.name === sheetName){
					id = sheet.id;
					smartsheetapi.getColumns(id, function(columnData){
						console.log(columnData);
					});
				}
			});
		});
	}

};