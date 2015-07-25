var smartsheetapi = require('../API/smartsheetapi');

module.exports = {

	getSheetByName: function(sheetName, onComplete){
		smartsheetapi.getSheets(function(sheets){
			var id;
			sheets.forEach(function(sheet){
				if(sheet.name === sheetName){
					id = sheet.id;
					smartsheetapi.getSheet(id, function(sheetData){
						onComplete(sheetData);
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
						onComplete(columnData);
					});
				}
			});
		});
	},

	getWorkspaceIdByName: function(workspaceName, onComplete){
		smartsheetapi.getWorkspaces(function(workspaces){
			var id;
			workspaces.forEach(function(workspace){
				if(workspace.name === workspaceName){
					id = workspace.id;
					onComplete(id);
				}
			});
		});
	},
	getTemplateIdByName: function(templateName, onComplete){
		smartsheetapi.getTemplates(function(templates){
			var id;
			templates.forEach(function(template){
				if(template.name === templateName){
					id = template.id;
					onComplete(id);
				}
			});
		});
	}



};