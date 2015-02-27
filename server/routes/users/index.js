module.exports = function (app,passport,apiData) {
  var User = require('../../models/user');

//GET existing users
  app.get('/users', function (req, res) {
    //var processRoute = security();
      //var apiObj = processRoute(req,null,new apiData());
      var apiObj = new apiData().processRoute(req,true,null);
      if (apiObj.requestIsAuthorized) {
        User.find(function (err, users) {
          if (err) {
            res.send(err);
          }
            apiObj.jsonData = users;
            res.json(apiObj);
        });
      }
      else {
        res.status(401);
          res.json(apiObj);
      }
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


