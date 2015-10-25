var mongoose  = require('mongoose')
var BaseModel = require('./base')

var CampaignSchema = new mongoose.Schema({
  name : {
    type     : String,
    required : true
  },
  description : {
    type     : String,
    required : true
  }
});

var Campaign = BaseModel('Campaign', CampaignSchema);

module.exports = Campaign;
