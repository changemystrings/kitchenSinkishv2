module.exports = function (app,passport) {
  var User = require('../../models/user');

//POST create new user
  app.get('/users/create', function (req, res) {
    var user = new User();
    user.name = 'user2';
    user.save();
    res.send('respond with a resource');
  });

//GET existing users
  app.get('/users', function (req, res) {
      User.find(function (err, users) {
        if (err)
          res.send(err);
        res.json(users);
      });
  });

//Get existing single user by ID
  app.get('users/:userId', function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });

//GET existing single user by Name
  app.get('users/name/:userName', function (req, res) {
    User.findOne({'name': req.params.userName}, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
}


