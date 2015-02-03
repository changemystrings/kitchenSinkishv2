module.exports = function (app, passport, apiData) {
  var authMessage = {};

  //redirect target when a new user signs up successfully
  app.get('/auth/signup/success', function (req, res) {
    apiData.jsonData.message = 'Congratulations - signup successful';
    apiData.jsonData.authStatus = true;
    res.json(apiData);
  });

  //redirect target when a new user has an unsuccessful signup attempt (no server error)
  app.get('/auth/signup/failure', function (req, res) {
    apiData.jsonData.message = 'Sorry, that email or username is already in use';
    apiData.jsonData.authStatus = false;
    res.json(apiData);
  });

  //redirect target when a user has a successful login attempt
  app.get('/auth/authenticate/success', function (req, res) {
    apiData.jsonData.authStatus = true;
    apiData.jsonData.message = "Congratulations - Passport.js says you're authenticated";
      res.json(apiData);
  });

  //redirect target when a new user has an unsuccessful login attempt (no server error)
  app.get('/auth/authenticate/failure', function (req, res) {
    apiData.jsonData.authStatus = false;
    apiData.jsonData.message = "Incorrect username or password - please try again";
    res.json(apiData);
  });
}
