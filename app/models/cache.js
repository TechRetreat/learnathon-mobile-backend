var mongoose = require('mongoose');

var CacheSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficulty: Number,
  location: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('Cache', CacheSchema);
