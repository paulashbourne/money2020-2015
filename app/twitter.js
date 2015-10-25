var Twitter = require('twitter')
var async = require('async')
var moment = require('moment')
var _ = require('lodash')

var twitter = new Twitter({
  consumer_key: 'jRwXbsJEZ0wJrc4C5PZ8IoryQ',
  consumer_secret: 'AJcDS02jD2IKUQmny7EYwRY8FIcnOLuqo0GY6bfBYIEvsvCk7m',
  access_token_key: '943624945-68AIPLkENRktchAiYbu8B9WPihuaouxbDOu26S4F',
  access_token_secret: 'FtgxSuVbMuPOfBDRlGUVI8aNVkMrHZMRsW2c11bUhHb3a'
});

exports.scrapeEvent = function(event, next) {
  twitter.get('search/tweets', { q: event + ' since:2015-10-20', count: 100 }, function(err, data, response) {
    tweets = data.statuses
    var hashtags = {}
    var mentions = {}
    _.each(tweets, function(tweet) {
      var words = tweet.text.split(' ')
      _.each(words, function(word){
        if (word.indexOf("#") === 0)
          hashtags[word] = hashtags[word] ? hashtags[word] + 1 : 1
        if (word.indexOf("@") === 0)
          mentions[word] = mentions[word] ? mentions[word] + 1 : 1
      })
    })
    var max = 0
    var max_hashtag = ""
    _.forIn(hashtags, function(value, key) {
      if (value > max) {
        max_hashtag = key
        max = value
      }
    })
    max = 0
    var max_mention = ""
    _.forIn(mentions, function(value, key) {
      if (value > max) {
        max_mention = key
        max = value
      }
    })
    console.log({mention: max_mention, hashtag: max_hashtag})
    next(null, {type: "event", title: event, mention: max_mention, hashtag: max_hashtag})
  })
}
