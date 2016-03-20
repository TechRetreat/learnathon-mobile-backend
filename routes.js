var express = require('express');
var router = express.Router();

var Cache = require('./app/models/cache')
var User = require('./app/models/user')

// Router
var router = express.Router();

router.use(function(req, res, next) {
  //do logging
  console.log("Something is happening.");
  next();
});


// Caches
router.get('/caches',function(req, res) {
  console.log('Received GET request to /caches');
  console.log('Request body: ' + req.body);
  Cache.find(function(err, caches) {
    console.log('Found list of all caches');
    if (err) {
      console.log('Failed with errror: ' + err);
      res.send(err);
    }

    console.log('Successfuly returned caches: ' + caches);
    res.json(caches);
  });
});

router.get('/caches/:cache_id',function(req, res) {
  console.log('Received GET request to /caches/:cache_id');
  console.log('Request body: ' + req.body);
  console.log("Finding cache with id " + req.params.cache_id);
  Cache.findById(req.params.cache_id, function(err, cache) {
    if (err) {
      console.log('Failed with error: ' + err);
      res.send(err);
    }

    console.log('Found cache with name: ' + cache.name);
    res.json(cache);

  });
});

router.post('/caches',function(req, res) {
    console.log('Making a POST request to /caches');
    console.log('Request body: ' + req.body);

    var cache = new Cache();

    cache.name = req.body.name;
    cache.description = req.body.description;
    cache.difficulty = req.body.difficulty;
    cache.location.latitude = req.body.latitude;
    cache.location.longitude = req.body.longitude;

    cache.save(function(err) {
      if (err) {
        console.log('Failed with error: ' + err);
        res.send(err);
      }

      console.log("Cache created");
      res.json({message: 'Cache created' });
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
  console.log('Received GET request to /users');
  console.log('Request body: ' + req.body);
  User.find(function(err, caches) {
    if (err) {
      console.log('Failed with error: ' + err);
      res.send(err);
    }

    res.json(caches);
  });
});

router.get('/users/:user_id',function(req, res) {
  console.log('Received GET request to /users/:user_id');
  console.log('Request body: ' + req.body);
  console.log('Finding user with id: ' + req.params.user_id);
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      console.log('Failed with error: ' + err);
      res.send(err);
    }

    res.json(user);

  });
});

router.post('/users',function(req, res) {
  console.log('Received POST request to /users');
  console.log('Request body: ' + req.body);

  var user = new User();

  user.name = req.body.name;
  user.found_caches = [];

  user.save(function(err) {
    if (err) {
      console.log('Failed with error: ' + err);
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

module.exports = router;
