var async  = require('async');
var jQuery = require('jquery');

var MERCHANT_ID = 'FWAR5KMC2349C';

var apiURL = 'https://apisandbox.dev.clover.com/v3/merchants/'+MERCHANT_ID;

var call = function(endpoint, method, data, callback) {
  if (endpoint.charAt(0) !== "/") {
    endpoint = "/" + endpoint;
  }
  return jQuery.ajax({
    type     : method,
    url      : apiURL + endpoint,
    dataType : "text",
    data     : data,
    success  : function(resp) {
      callback(resp);
    },
    error    : function(resp) {
      console.log(resp);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer a206ae20-b1fb-6ba4-1d92-8403105d2f91');
    }
  });
};

exports = {
  call : call
};
