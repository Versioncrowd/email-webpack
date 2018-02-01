var express = require('express');
const server = express();
const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const mailer = require('./mailer');
const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );

server.use(webpackDevMiddleware);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

// putting bodyParser to use
server.use(bodyParser.json());

server.get('/login', function(req, res) {
  res.send({error: '0'});
});

server.post('/mail', function(req, res) {
  console.log(req.body);
  if(!req.body.address || !req.body.subject || !req.body.message) {
    return res.send({err: 'Address, subject and text required!'})
  }

  mailer(req.body.address, req.body.subject, req.body.message, function(err){
              if (err) {
                return res.send({err: err});

                var newMail = new Mail(req.body);
                newMail.save(function(err) {
                  if(err) {
                    console.log('mail could not be saved: ' + err);
                  }

                  console.log('mail was successfully saved: ' + req.body);
                })
              } else { 
                  return res.send({err: 0})
                }
           });
});

server.listen(3000, () => {
  console.log('server is listening on port 3000');
});