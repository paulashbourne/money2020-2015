var mongoose  = require('mongoose')
var BaseModel = require('./base')

var CampaignSchema = new mongoose.Schema({
  item_id : {
    type     : String,
    required : false
  },
  name : {
    type     : String,
    required : true
  },
  description : {
    type     : String,
    required : true
  },
  daily_budget : {
    type     : Number,
    required : true
  },
  fb_page_id   : {
    type     : String,
    required : true
  },
  target_address : {
    type     : String,
    required : true
  },
  target_radius : {
    type     : Number,
    required : true
  },
  start_date : {
    type     : Date,
    required : true
  },
  finish_date : {
    type     : Date,
    required : true
  }
});

var Campaign = BaseModel('Campaign', CampaignSchema);

module.exports = Campaign;
