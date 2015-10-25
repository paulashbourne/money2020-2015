var async  = require('async');
var r = require('superagent');

var MERCHANT_ID = 'FWAR5KMC2349C';

var apiURL = 'https://apisandbox.dev.clover.com/v3/merchants/'+MERCHANT_ID;

var call = function(endpoint, method, data, next) {
  if (endpoint.charAt(0) !== "/") {
    endpoint = "/" + endpoint;
  }

  if (method === "POST") {
    r.post(apiURL + endpoint).send(data).set('Authorization', 'Bearer a206ae20-b1fb-6ba4-1d92-8403105d2f91').end(next)
  }
  else
    r.get(apiURL + endpoint).set('Authorization', 'Bearer a206ae20-b1fb-6ba4-1d92-8403105d2f91').end(next)
};

module.exports = {
  call : call
};
