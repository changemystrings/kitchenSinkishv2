module.exports = function (app,passport,apiData) {
  var User = require('../../models/user');
  var security = require('../../utility/secureRoute');

//GET existing users
  app.get('/users', function (req, res) {
    var secFunction = security();
      var apiObj = secFunction(req,'rolename',apiData);
    var api = apiData;
      User.find(function (err, users) {
        if (err)
          res.send(err);
        res.json(users);
      });
  });

  //function secureLogin(req,roleName,apiData) {
  //  apiData.requestRequiresAuthentication = true;
  //  if (apiData) {
  //    apiData.userIsAuthenticated = req.isAuthenticated();
  //    if (roleName) {
  //      apiData.requestRequiresAuthorization = true;
  //      apiData.requiredRoleForRequest = roleName;
  //      if (req.isAuthenticated()) {
  //        if (apiData.currentUser.roles && apiData.currentUser.roles.length > 0) {
  //          if (apiData.currentUser.roles.indexOf(roleName) >= 0) {
  //            apiData.requestIsAuthorized = true;
  //            apiData.userHasRequiredRole = true;
  //          }
  //        }
  //      }
  //      else {
  //        apiData.requestIsAuthorized = true;
  //      }
  //    }
  //    else {
  //      apiData.requestIsAuthorized = req.isAuthenticated();
  //    }
  //  }
  //  return apiData;
  //}

//Get existing single user by ID
  app.get('users/:userId', function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
}


