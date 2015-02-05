module.exports = function (app,passport,apiData) {
  var User = require('../../models/user');
  var security = require('../../utility/secureRoute');

//GET existing users
  app.get('/users', function (req, res) {
    var processRoute = security();
      var apiObj = processRoute(req,'rolename',apiData);
      User.find(function (err, users) {
        if (err) {
          res.send(err);
        }
        apiObj.jsonData.data = users;
        res.json(apiObj);
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
}


