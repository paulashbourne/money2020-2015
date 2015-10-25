var express    = require('express');
var moment     = require('moment');
var bodyParser = require('body-parser');
var _          = require('underscore');

var router = express.Router();
router.use(function(req, res, next) {
  var datestr = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log('['+datestr+']  ' + req.method + ' ' + req.path);
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Begin endpoints
require('./user')(router);
require('./campaign')(router);

module.exports = function (app, io) {
  app.use('/api', router);
};
