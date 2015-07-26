var smartsheetapi = require('../API/smartsheetapi');

var getSheetByName = function(sheetName, onComplete){
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
};

var getSheetColumns = function(sheetName, onComplete){
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
};

var getWorkspaceIdByName = function(workspaceName, onComplete){
	smartsheetapi.getWorkspaces(function(workspaces){
		var id;
		workspaces.forEach(function(workspace){
			if(workspace.name === workspaceName){
				id = workspace.id;
				onComplete(id);
			}
		});
	});
};

var getTemplateIdByName = function(templateName, onComplete){
	smartsheetapi.getTemplates(function(templates){
		var id;
		templates.forEach(function(template){
			if(template.name === templateName){
				id = template.id;
				onComplete(id);
			}
		});
	});
};

var getWorkspaceByName = function(workspaceName, onComplete){
	smartsheetapi.getWorkspaces(function(workspaces){
		var id;
		workspaces.forEach(function(workspace){
			if(workspace.name === workspaceName){
				id = workspace.id;
				smartsheetapi.getWorkspace(id, function(workspaceData){
					onComplete(workspaceData);
				});
			}
		});
	});
};

var getSheetRows = function(sheetName, onComplete){
	getSheetByName(sheetName, function(sheet){
		onComplete(sheet.rows);
	});
};

var getSheet = function(sheetId, onComplete){
	smartsheetapi.getSheet(sheetId, onComplete);
};

var getCellData = function(sheetId, rowId, columnId, onComplete){
	smartsheetapi.getSheet(sheetId, function(sheetData){
		sheetData.rows.forEach(function(row){
			if(row.id === rowId){
				row.cells.forEach(function(cell){
					if(cell.columnId === columnId){
						onComplete(cell);
					}
				});
			}
		});
	});
};

module.exports = {
	getSheetByName: getSheetByName,
	getSheetColumns: getSheetColumns,
	getWorkspaceIdByName: getWorkspaceIdByName,
	getTemplateIdByName: getTemplateIdByName,
	getWorkspaceByName: getWorkspaceByName,
	getSheetRows: getSheetRows,
	getSheet: getSheet,
	getCellData: getCellData
};