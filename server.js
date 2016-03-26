// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var constants = require('./const')

var db = 'mongodb://'+ constants.name +':'+ constants.pword +'@ds023118.mlab.com:23118/scavenger';
// var db = 'mongodb://localhost/scavenger' 

console.log('Connecting to ' + db);
mongoose.connect(db);
mongoose.connect(db, function(err) {
  if (err) throw err;
});
console.log('Connected to ' + db);
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
