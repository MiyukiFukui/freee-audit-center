function ReportFolder(id){
  this.Year = Utilities.formatDate(new Date(), "JST", "yyyy");
  this.Month = Utilities.formatDate(new Date(), "JST", "MM");
  
  this.id = id;
  this.RootFolder = DriveApp.getFolderById(id);
  this.ReportFolder = this.getReportFolder();
  
  return this;
}

ReportFolder.prototype.setYear = function(year){
  if(yeay.match(/(\d{4})/)[0]){
    this.Year = year; 
  }
  return this;
}
ReportFolder.prototype.getYear = function(){ return this.Year; }

ReportFolder.prototype.setMonth = function(month){
  if(month.match(/(\d{2})/)[0]){
    this.Month = month; 
  }
  return this;
}
ReportFolder.prototype.getMonth = function(){ return this.Month; }

ReportFolder.prototype.getReportFolder = function(){
  this.YearFolder;
  this.MonthFolder;
  
  // Check Year Folder, and if undefined, generate it
  var YearsList = this.RootFolder.getFolders();
  while(YearsList.hasNext()){
    var YearFolder = YearsList.next();
    if(YearFolder.getName() == this.Year){
      this.YearFolder = DriveApp.getFolderById(YearFolder.getId());
      break;
    }
  }
  if(!this.YearFolder){
    this.YearFolder = this.RootFolder.createFolder(this.Year);
  }
  
  // Check Month Folder, and if undefined, generate it
  var MonthsList = this.YearFolder
  while(MonthsList.hasNext()){
    var MonthFolder = MonthsList.next();
    if(MonthFolder.getName() == this.Month){
      this.MonthFolder = DriveApp.getFolderById(MonthFolder.getId());
      break;
    }
  }
  if(!this.MonthFolder){
    this.MonthFolder = this.YearFolder.createFolder(this.Year);
  }
  return this.MonthFolder;
}

ReportFolder.prototype.getName = function(){ return this.MonthFolder.getName(); }
ReportFolder.prototype.getId = function(){ return this.MonthFolder.getId(); }