module.exports = function (app, passport) {

  //POST authenticate a user using passport local strategy
  app.post('/auth/authenticate/local',
    passport.authenticate('local-login', {
        successRedirect: '/auth/authenticate/success', // redirect to the secure profile section
        failureRedirect: '/auth/authenticate/failure', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
      }
    )
  );
}
