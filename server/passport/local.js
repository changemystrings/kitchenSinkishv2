// Handler for "local" auth via Passport
// User info is stored / validated against Mongo via Mongoose (./models/user.js)

var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  // Passport needs a helper to serialize/deserialize a user for session storage
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Invoke Passport strategy for local signup
  //NOTE: Flash messages are currently being overwritten in auth-handler.js
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // Check to see if the user already exists.  If not, create new user
        User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            console.log('user already exists')
            return done(null, false, req.flash('signupMessage', 'Sorry, user already exists.'));
          } else {
            var newUser = new User();
            newUser.local.email    = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }

        });

      });

    }));
  //Invoke Passport strategy for local authentication
  //NOTE: Flash messages are currently being overwritten in auth-handler.js
  //NOTE: Default field for username is being overridden with "email"
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      process.nextTick(function () {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) {
          return done(err);
        }
        // if no user is found, return the message
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'Incorrect username or password'));
        }
        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect username or password'));
        }
        /*
        TODO - Set JWT
         */
        return done(null, user, req.flash('loginMesssage','success'));
      });
      });
    }));
};
