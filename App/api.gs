function readFromSheet(sheetId,sheetName){
  console.log('[+] - API called! sheetId=' + sheetId + ' sheetName=' + sheetName);
  var data = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName).getDataRange().getValues();
  var headers = data[0];
  var records = [];
  for(var i=1;i < data.length;i++){
    var record = {}
    headers.forEach(function(header,index){
      record[header] = data[i][index];
    })
    records.push(record);
  }
  return records;
}

function writeToSheet(records,sheetId,sheetName){
  console.log('[+] - Data recieved! sheetId=' + sheetId + ' sheetName=' + sheetName);
  
  try { 
    var outputRecords = [];
    if(Array.isArray(records)){
      var headers = [];
      for(var key in records[0]){
        headers.push(key);
      }
      outputRecords.push(headers);
      
      records.forEach(function(record){
        var outputRecord = [];
        headers.forEach(function(header){
          outputRecord.push(record[header]);
        })
        outputRecords.push(outputRecord);
      })
    }
    var ss = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    if(ss){
      ss = ss.clear();
    } else {
      var ss = SpreadsheetApp.openById(sheetId).insertSheet(sheetName);
    }
    ss.getRange(1,1,outputRecords.length,outputRecords[0].length).setValues(outputRecords);
    return true;
  } catch (error) {
    Logger.log(error);
    console.error(error);
    return false;
  }
}