var nodemailer = require('nodemailer');

module.exports = function sendMail(recipientAddress, subject, body, cb) {
  var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sab.devugees@gmail.com',
    pass: 'dialrecords890'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);
var mailOptions = {
  from: '"devugees shop" <sab.devugees@gmail.com>',
  to: recipientAddress,
  subject: subject,
  text: body,
  html: '<h1>'+ body +'</h1>'
};

transporter.sendMail(mailOptions, function(err, info) {
  if(err) {
    console.log('mail was not delivered');
    console.log(err);
    return cb(err)
  }

  return cb(null)
})
};