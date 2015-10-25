var Campaign = require('../model/campaign');
var _        = require('underscore');

module.exports = function(router) {
  router.route('/campaigns')
    .post(function(req, res) {
      var params = req.body;
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
    .put(function(req, res) {
      var params = req.body;
      Campaign.findById(req.params.id, function(err, campaign) {
        if (err)
          res.send(err);
        _.extend(campaign, params);
        campaign.save(function(err) {
          if (err)
            res.send(err);
          res.json(campaign);
        });
      });
    });
};
