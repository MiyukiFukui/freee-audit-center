function OAuthService(option){
  this.service = OAuth2.createService(option.Service)
  .setAuthorizationBaseUrl(option.AuthorizationBaseUrl)
  .setTokenUrl(option.TokenUrl)
  .setClientId(option.ClientId)
  .setClientSecret(option.ClientSecret)
  .setCallbackFunction(option.CallbackFunction)
  .setPropertyStore(option.PropertyStore)
  .setScope(option.Scope);
  return this;
}

OAuthService.prototype.reset = function(){
  this.service.reset();
}

OAuthService.prototype.run = function(api_uri){
  var service = this.service;
  if (service.hasAccess()) {
    var url = service.getToken().instance_url + api_uri; // api_uri = '/services/data/v24.0/chatter/users/me';
    var response;
    var content;
    try {
      response = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + service.getAccessToken(), } });
      content = response.getContentText();
    } catch (e) {
      content = e.toString();
    }
    
    if (content.indexOf('INVALID_SESSION_ID') !== -1) {
      service.refresh();
      response = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + service.getAccessToken(), } });
    }
    return JSON.parse(response.getContentText());
    
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('次のURLを開いて認可を取得した後に、再度スクリプトを実行して下さい: %s',authorizationUrl);
  }
}
