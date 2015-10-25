var twitter = require('../twitter')
var _    = require('underscore');
var async = require('async')

module.exports = function(router) {
  router.route('/twitter/events')
    .get(function(req, res) {
        async.auto({
          getNFL: function(callback) {
            twitter.scrapeEvent('NFL', callback)
          },
          getCancer: function(callback) {
            twitter.scrapeEvent('Breast Cancer', callback)
          },
          getLoL : function(callback) {
            twitter.scrapeEvent('League of Legends', callback)
          },
          getHalloween : function(callback) {
            twitter.scrapeEvent('Halloween', callback)
          }
        }, function(err, results) {
            res.json([results.getNFL, results.getCancer, results.getLoL, results.getHalloween])
        })
    })
};
