module.exports = function (app, passport) {

  //Handle new user signup attempt
  app.post('/auth/signup/local',
    passport.authenticate('local-signup', {
        successRedirect: '/auth/signup/success',
        failureRedirect: '/auth/signup/failure',
        failureFlash: true
      }
    )
  );
}
