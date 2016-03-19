// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var constants = require('./const.js')

var db = 'mongodb://'+ constants.name +':'+ constants.pword +'@ds013738.mlab.com:13738/scavenger';

mongoose.connect(db);
// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var Cache = require('./app/models/cache')
var User = require('./app/models/user')


app.get('/', function(req, res) {
  res.json({message:"things are working"});
});

// Router
var router = express.Router();

router.use(function(req, res, next) {
  //do logging
  console.log("Something is happening.");
  next();
});


// Caches
router.get('/caches',function(req, res) {
  console.log("GETting cahces");
  console.log("with request body " + req.body);
  console.log("stop");
  Cache.find(function(err, caches) {
    if (err) {
      console.log(err);
      res.send(err);
    }

    res.json(caches);
  });
});

router.get('/caches/:cache_id',function(req, res) {
  Cache.findById(req.params.cache_id, function(err, cache) {
    console.log("Finding cache with id " + req.params.cache_id);
    if (err) {
      res.send(err);
    }

    console.log(cache.name);
    console.log(cache.description);

    res.json(cache);

  });
});

router.post('/caches',function(req, res) {
    var cache = new Cache();

    console.log("Making a POST request with a body " + req.body);

    cache.name = req.body.name;
    cache.description = req.body.description;
    cache.difficulty = req.body.difficulty;
    cache.location.latitude = req.body.latitude;
    cache.location.longitude = req.body.longitude;

    console.log("Cache name set to " + cache.name);

    cache.save(function(err) {
      console.log("Saving caches");
      if (err) {
        console.log(err);
        res.send(err);
      }

      res.json({message: 'Cache created!' });
    });
});

router.put('/caches/:cache_id', function(req, res) {
  Cache.findById(req.params.cache_id, function(err, cache) {
    if (err)
      res.send(err);
    cache.name = req.body.name;
    cache.description = req.body.description;
    cache.difficulty = req.body.difficulty;
    cache.latitude = req.body.latitude;
    cache.longitude = req.body.longitude;

    cache.save(function(err) {
      if (err)
        res.send(err)
      res.json({message: 'Cache updated'});
    });
    res.json(cache);
  });
});

// Users
router.get('/users',function(req, res) {
  User.find(function(err, caches) {
    if (err) {
      res.send(err);
    }

    res.json(caches);
  });
});

router.get('/users/:user_id',function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json(user);

  });
});

router.post('/users',function(req, res) {
    var user = new User();

    user.name = req.body.name;
    user.found_caches = [];

    user.save(function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      }

      res.json({message: 'User created!' });
    });
});

// User methods
router.put('/users/:user_id/find/:cache_id', function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }
    Cache.findById(req.params.cache_id, function(err, cache) {
      if (err)
        res.send(err);

      user.found_caches.push({cache_id:cache._id, found: new Date()});

      user.save(function(err) {
        if (err)
          res.send(err)
        res.json({message:'User ' + user.name + ' found ' + cache.name});
      });

    });
  });
});


app.use('/api', router);

//Start
app.listen(port);
console.log("Magic happens on port "+port);
