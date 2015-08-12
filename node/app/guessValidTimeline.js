var smartsheet = require('../API/smartsheetsapi/smartsheet');
var fs = require('fs');

var events = require('events');
var eventEmitter = new events.EventEmitter();

var getColumnByName = function(columnName, sheetData){
	for(var i = 0; i < sheetData.columns.length; i++){
		if(sheetData.columns[i].title.indexOf(columnName) > -1){
			return sheetData.columns[i];
		}
	}
}

var getSheetByName = function(sheetName, workspace){
	for(var i = 0; i < workspace.sheets.length; i++){
		if(workspace.sheets[i].name === sheetName){
			return workspace.sheets[i];
		}
	}
}

var getCellData = function(sheetData, rowId, columnId){
	for(var i = 0; i < sheetData.rows.length; i++){
		var row = sheetData.rows[i];
		if(row.id === rowId){
			for(var j = 0; j < row.cells.length; j++){
				var cell = row.cells[j];
				if(cell.columnId === columnId){
					return cell;
				}
			}
		}
	}
}

var updateFile = function(){
	console.log("Starting update Project timelines data");
	smartsheet.getWorkspaceByName("Project Timelines", function(workspace){
		var sheet = getSheetByName("Test Timeline", workspace);
		smartsheet.getSheet(sheet.id, function(testSheet){
			var taskColumn = getColumnByName("Task Name", testSheet);
			var durationColumn = getColumnByName("Duration", testSheet);
			var rowDataList = [];
			for(var i = 0; i < testSheet.rows.length; i++){
				var row = testSheet.rows[i];
				var taskName = getCellData(testSheet, row.id, taskColumn.id).value;
				var duration = getCellData(testSheet, row.id, durationColumn.id).value;
				duration = duration === undefined ? '0' : duration.replace(/^\D+|\D+$/g, "");
				if(taskName !== undefined){
					rowDataList.push({
						name: taskName, 
						duration: duration,
						times: 1
					});
				}
			}
			fs.readFile('./datafiles/timelines.json', 'utf8', function(err, data){
				var prevData = JSON.parse(data);
				for(var i = 0; i < prevData.length; i++){
					rowDataList.forEach(function(rowData, index, array){
						if(prevData[i].name === rowData.name){
							var prevDur = parseInt(prevData[i].duration);
							var prevTimes = parseInt(prevData[i].times);
							var dur = parseInt(rowData.duration);
							var avg = ((prevDur * prevTimes) + dur) / (prevTimes + 1);
							console.log((prevData[i].duration * prevData[i].times) + " = " + prevData[i].duration + "*" + prevData[i].times)
							var obj = {
								name: rowData.name,
								duration: avg,
								times: prevData[i].times + 1
							}
							array[index] = obj;
						}
					});
				}




				fs.writeFile('./datafiles/timelines.json', JSON.stringify(rowDataList), function(err){
					if(err) console.error('Error writing file "timelines.json": ' + err);
				});
			});
		});
	});
}
updateFile();
// setInterval(function(){updateFile();}, 1 * 60 * 1000); // update file every 1 minute