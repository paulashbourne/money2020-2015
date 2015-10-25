var async  = require('async');
var jQuery = require('jquery');
var xml2js = require('xml2js');

var apiURL = 'http://dmartin.org:8024

var call = function(endpoint, method, data, callback) {
  if (endpoint.charAt(endpoint.length - 1) !== "/") {
    endpoint += "/";
  }
  return jQuery.ajax({
    type     : method,
    url      : apiURL + endpoint,
    dataType : "text",
    data     : data,
    success  : function(resp) {
      xml2js.parseString(resp);
    },
    error    : function(resp) {
      console.log("MASTERCARD API ERROR:");
      console.log(resp);
    },
  });
};

var loststolen = function(cardNumber, callback) {
  return call("fraud/loststolen/v1/account-inquiry", "PUT", {
    AccountNumber : cardNumber
  }, callback);
};

exports = {
  call       : call,
  loststolen : loststolen
};
