function RedashResults(id){
  this.Spreadsheet = SpreadsheetApp.openById(id);
  this.Reasons = this.Spreadsheet.getSheetByName('RedashTargetList').getDataRange().getValues().slice(1)
  .map(function(record){
    var sheetName = record[4];
    if(sheetName !== 'sheetName'){ return sheetName }
  });
  return this;
}

RedashResults.prototype.getReasons = function(){ return this.Reasons; }

RedashResults.prototype.getValues = function(sheetName){
  if(this.Spreadsheet.getSheetByName(sheetName)){
    return this.Spreadsheet.getSheetByName(sheetName).getDataRange().getValues();
  }
}
RedashResults.prototype.getEvidences = function(sheetName,cause){
  var i;
  var data = this.getValues(sheetName);
  data[0].forEach(function(header,index){
    if(header == 'company_id'){ i = index; }
  });
  
  if(i !== undefined){
    return data.slice(1).map(function(record){ return [record[i],cause]; })
  } else {
    return false
  }
}

function test_RedashResults(){
  var results = new RedashResults('17XqNi1zEwYxI3ft-dr-BMU7r2_shyeMuDVCX3kr1EVs');
  Logger.log(results.getEvidences('JIRA_Happy','JIRA'));
}