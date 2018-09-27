function FCSReason(){

  //getFCSBecomeReason
  var reasonId = '1l4Bs-chrEhpFvbvI5SJEVK41YwtQNKsaiT5wDWMgiVU'
  var reasonSheet = SpreadsheetApp.openById(reasonId).getSheets()[0];
  var reasonAllData = reasonSheet.getRange(1, 1, reasonSheet.getLastRow(), reasonSheet.getLastColumn()).getValues();

  var withInThirtyBecome = [];

  var now       = new Date();
  var aggregate_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(),23, 59, 59).getTime();
  var thirty_before_date = new Date(now.getFullYear(), now.getMonth(), now.getDate()-30).getTime();

  //get withInThirtyBecomeData
  for(var i = 1; i < reasonAllData.length; i++){
    var reason_jst_date =　Utilities.formatDate(new Date(reasonAllData[i][0]), "JST", "yyyy/MM/dd");
    var reason_edt_date = new Date(reason_jst_date).getTime();

    var companyId = reasonAllData[i][2];
    var url = reasonAllData[i][3];

    if(thirty_before_date <= reason_edt_date && reason_edt_date <= aggregate_date){
      withInThirtyBecome.push([companyId, 'FCS', url]);
    }
  }
  return withInThirtyBecome;
}
