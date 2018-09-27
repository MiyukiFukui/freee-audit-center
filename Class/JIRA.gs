var JIRA_ENV = JSON.parse(PropertiesService.getScriptProperties().getProperty('JIRA_ENV'));

function JIRA(domain){
  this.url = 'https://' + domain + '/rest/api/latest/';
  this.username = JIRA_ENV.username;
  this.password = JIRA_ENV.password;
  this.creds = Utilities.base64Encode(this.username+":"+this.password);
  return this;
}

JIRA.prototype.search = function(jql){
  return this.get('search?jql='+jql);
}
JIRA.prototype.get = function(path){
  if(!path){ var path = ''; };
  var fetchArgs = {
    contentType: "application/json",
    headers: {"Authorization":"Basic "+this.creds},
    muteHttpExceptions : true
  };
  var httpResponse = UrlFetchApp.fetch(this.url + path, fetchArgs);
  if (httpResponse) {
    try {
      return JSON.parse(httpResponse.getContentText());
    } catch(e){
      return httpResponse.getContentText();
    }
  } else {
    return false;
  }
}

function test_JIRA(){
  jira = new JIRA('jira-freee.atlassian.net');
  Logger.log(jira.search("project = AASREQUEST"));
}