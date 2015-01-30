module.exports = function (app, passport) {
  var authMessage = {};

  //redirect target when a new user signs up successfully
  app.get('/auth/signup/success', function (req, res) {
    authMessage.message = 'Congratulations - signup successful';
    authMessage.authStatus = true;
    res.json(authMessage);
  });

  //redirect target when a new user has an unsuccessful signup attempt (no server error)
  app.get('/auth/signup/failure', function (req, res) {
    authMessage.message = 'Sorry, that email or username is already in use';
    authMessage.authStatus = false;
    res.json(authMessage);
  });

  //redirect target when a user has a successful login attempt
  app.get('/auth/authenticate/success', function (req, res) {
      authMessage.authStatus = true;
      authMessage.message = "Congratulations - you've logged in";
      res.json(authMessage);
  });

  //redirect target when a new user has an unsuccessful login attempt (no server error)
  app.get('/auth/authenticate/failure', function (req, res) {
    authMessage.authStatus = false;
    authMessage.message = "Incorrect username or password - please try again";
    res.json(authMessage);
  });
}
