/**
 * Created by tucker on 11/20/14.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    property2: String,
    local: {
      email: String,
      password: String
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    stackoverflow: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  }
);

module.exports = mongoose.model('User', UserSchema);
