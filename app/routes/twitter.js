var twitter = require('../twitter')
var _    = require('lodash');
var async = require('async')
var clover = require('../clover')
var moment = require('moment')

module.exports = function(router) {
  router.route('/social')
    .get(function(req, res) {
        async.auto({
          getNFL: function(callback) {
            twitter.scrapeEvent('NFL', callback)
          },
          getCancer: function(callback) {
            twitter.scrapeEvent('Breast Cancer', callback)
          },
          getMoney : function(callback) {
            twitter.scrapeEvent('Money 20/20', callback)
          },
          getHalloween : function(callback) {
            twitter.scrapeEvent('Halloween', callback)
          },
          getNewInventory: function(callback) {
            clover.call('items', 'GET', {}, function(err, result) {
              var new_items = _.filter(result.body.elements, function(item) {
                return item.modifiedTime > moment().hour(-1).valueOf()
              })
              callback(null, new_items)
            })
          }
        }, function(err, results) {
            res.json([results.getNFL, results.getCancer, results.getMoney, results.getHalloween, results.getNewInventory])
        })
    })
};
