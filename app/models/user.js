
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  found_caches: [
    {
      cache_id: Schema.Types.ObjectId,
      found: Date
    }
  ],
});

module.exports = mongoose.model('User', UserSchema);
