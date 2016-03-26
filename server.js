// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var constants = require('./const')

var db = 'mongodb://'+ constants.name +':'+ constants.pword +'@ds013738.mlab.com:13738/scavenger';
/* var db = 'mongodb://localhost/scavenger' */

mongoose.connect(db);
// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = require('./routes');

app.get('/', function(req, res) {
  res.json({message:"things are working"});
});


app.use('/api', router);

//Start
app.listen(port);
console.log("Magic happens on port "+port);
