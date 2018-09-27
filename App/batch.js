var reportRootFolderId = '1tg9sINmmTN8gcWMkAojVdWyg17x3Q_Gp';
var templeteFileId = '1sfIywNiwjRbFMZ_YFx8qGkNJ59-CVKWy2djUym1UJZ4';
var freeeWhoisSheetId = '1Jkk0lMLSDrzpA7qdDebIKD2Ts2ILaaPMyW7P2e1bycY';
var employeesSheetId = '1TPkSgsf1DstpdIHfiyfulXwV7hWvqItzR1s6KbIVfJY';
var auditSheetId = '17XqNi1zEwYxI3ft-dr-BMU7r2_shyeMuDVCX3kr1EVs';

function generateReport(){
  // YYYY-MM-DD, means today
  var aggregate_date = new Date(new Date().toLocaleString()+' UTC').toISOString().split('T')[0];
  // YYYY-MM-DD, means yesterday
  var audit_date = new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toLocaleString()+' UTC').toISOString().split('T')[0];
  var audit_year = audit_date.split('-')[0];
  var audit_month = audit_date.split('-')[1];
  
  // Generate folders
  var ReportFolder = new ReportFolder(reportRootFolderId).setYear(audit_year).setMonth(audit_month).getReportFolder();
  Logger.log('Making Audit Report into ' + ReportFolder.getName() + '(id = ' + ReportFolder.getId() + ' )' );

  // Copy template
  var newReportSheet = SpreadsheetApp.openById(DriveApp.getFileById(templeteFileId).makeCopy(audit_date, ReportFolder).getId());

  // 従業員情報を流し込む
  insertEmployeeInfo(newReport);
  
  // 監査
  

}


//特定列を特定シートに入れる
function insertEmployeeInfo(newReport){
  var employeeSheetFileId = '1TPkSgsf1DstpdIHfiyfulXwV7hWvqItzR1s6KbIVfJY';

  var employeeSheet = SpreadsheetApp.openById(employeeSheetFileId).getSheetByName('全員');
  var employeeData = employeeSheet.getRange(3, 1, employeeSheet.getLastRow(), employeeSheet.getLastColumn()).getValues();

  var insertData = [];
  for(var i = 0; i < employeeData.length; i++){
    var email = employeeData[i][5];
    var name = employeeData[i][2];
    var layer1 = employeeData[i][17];
    var layer2 = employeeData[i][18];
    var layer3 = employeeData[i][19];
    var layer4 = employeeData[i][20];
    insertData.push([email, name, layer1, layer2, layer3, layer4]);
  }

  var writeSheet = newReport.getSheetByName('従業員情報').getRange(2, 1, insertData.length, insertData[0].length).setValues(insertData);
}
