var JIRA_ENV = JSON.parse(PropertiesService.getScriptProperties().getProperty('JIRA_ENV'));

function JIRA(domain){
  this.url = 'https://' + domain + '/rest/api/latest/';
  this.username = JIRA_ENV.username;
  this.password = JIRA_ENV.password;
  this.creds = Utilities.base64Encode(this.username+":"+this.password);
  return this;
}

JIRA.prototype.search = function(jql){
  return this.get('search',{'jql' : jql });
}
JIRA.prototype.get = function(path,param){
  if(!path){ var path = ''; };
  if(!param){ var param = {} } else { var param = param };
  param.startAt = 0;
  param.maxResults = 100;
  var issues = [];

  do {
    var option = {
      method : "post",
      contentType: "application/json",
      headers: {"Authorization":"Basic "+this.creds},
      payload : JSON.stringify(param),
      muteHttpExceptions : true
    }

    try {
      var httpResponse = JSON.parse(UrlFetchApp.fetch(this.url + path, option).getContentText());
      issues = issues.concat(httpResponse.issues);
      param.startAt = httpResponse.startAt + httpResponse.maxResults;
    } catch (e) {
      throw e.message;
    }
  } while (param.startAt < httpResponse.total);
  return issues;
}

JIRA.prototype.getEvidences = function(project,from,to){
  if(Object.prototype.toString.call(from).slice(8, -1) == 'Date'){ var from = Utilities.formatDate(from, "JST", "yyyy/MM/dd"); } else { throw "arg 'from' is not Date type"; }
  if(Object.prototype.toString.call(to).slice(8, -1) == 'Date'){ var to = Utilities.formatDate(to, "JST", "yyyy/MM/dd"); } else { throw "arg 'to' is not Date type"; }
  var jql = 'project = ' + project + ' AND company_id != NULL AND company_id != 0'
  + "AND updatedDate >= '" + from +" 00:00' AND updatedDate <= '" + to + " 23:59' ORDER BY company_id ASC";
  var result = this.search(jql);
  if(result['issues']){
    result.issues.map(function(issue){
      return [issue.]
    })
  }

}
function test_JIRA(){
  jira = new JIRA('jira-freee.atlassian.net');
  Logger.log(jira.search("project = AASREQUEST"));
}