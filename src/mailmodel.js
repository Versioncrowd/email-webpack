var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = new Schema({
  address: String,
  subject: String,
  message: String
});

var Mail = mongoose.model('mails', mailSchema);
module.exports = Mail;
