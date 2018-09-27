var SALESFORCE_ENV = JSON.parse(PropertiesService.getScriptProperties().getProperty('SALESFORCE_ENV'));
var SALESFORCE_OPT = {
  Service : 'Salesforce',
  AuthorizationBaseUrl : 'https://login.salesforce.com/services/oauth2/authorize',
  TokenUrl : 'https://login.salesforce.com/services/oauth2/token',
  ClientId : SALESFORCE_ENV.client_id,
  ClientSecret : SALESFORCE_ENV.client_secret,
  CallbackFunction : 'SalesforceAuthCallback',
  PropertyStore : PropertiesService.getUserProperties(),
  Scope : 'api id profile email address phone refresh_token offline_access'
}


function Salesforce(uri){
  var Service = new OAuthService(SALESFORCE_OPT);
  return Service.run(uri);
}

function SalesforceAuthCallback(request){
  var service = new OAuthService(SALESFORCE_OPT).service;
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

function test_Salesforce(){
  Logger.log(Salesforce('/services/data/v24.0/chatter/users/me'));
}