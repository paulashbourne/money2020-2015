var Campaign = require('../model/campaign');
var _        = require('underscore');
var clover   = require('../clover');
var moment   = require('moment');

module.exports = function(router) {
  router.route('/campaigns')
    .post(function(req, res) {
      var params = req.body;
      params['start_date'] = moment().toDate();
      params['end_date']   = moment().add(7, 'days').toDate();
      var campaign = new Campaign(params);
      campaign.save(function(err) {
        if (err)
          res.send(err);
        res.json(campaign);
      });
    })
    .get(function(req, res) {
      Campaign.find(function(err, campaigns) {
        if (err)
          res.send(err);
        res.json(campaigns);
      });
    })

  router.route('/campaigns/:id')
    .get(function(req, res) {
      Campaign.findById(req.params.id, function(err, campaign) {
        if (err)
          res.send(err);
        res.json(campaign);
      });
    })
    .delete(function(req, res) {
      Campaign.findById(req.params.id, function(err, campaign) {
        if (err)
          res.send(err);
        campaign.remove();
        res.json(campaign);
      });
    })
    .put(function(req, res) {
      var params = req.body;
      Campaign.findById(req.params.id, function(err, campaign) {
        if (err) {
          res.send(err);
        }
      _.extend(campaign, params);
      campaign.start_date = moment().toDate();
      campaign.end_date   = moment().add(7, 'days').toDate();
        campaign.save(function(err) {
          if (err)
            res.send(err);
          res.json(campaign);
        });
      });
    });

    router.route('/campaigns/:id/graph')
    .get(function(req, res) {
      Campaign.findById(req.params.id, function(err, campaign) {
        if (err) {
          res.send(err);
          return;
        }
        var orders_by_day = {};
        for (var m = moment(campaign.start_date);
            m.isBefore(moment(campaign.end_date));
            m.add(1, 'days')) {
          orders_by_day[m.format("YYYY-MM-DD")] = 0;
        }
        clover.call('orders?expand=lineItems', 'GET', {},
        function(err, resp) {
          _.each(resp.body.elements, function(order) {
            _.each(order.lineItems, function(item) {
              if (item.id == campaign.item_id) {
                var time = moment(order.created_time);
                orders_by_day[time.format("YYYY-MM-DD")] += 1;
              }
            });
          });
        });
        res.json({
          x : _.keys(orders_by_day),
          y : _.values(orders_by_day)
        });
      });
    })
};
