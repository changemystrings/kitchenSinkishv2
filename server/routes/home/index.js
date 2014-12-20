module.exports = function (app, passport) {
  /* GET home page. */
  app.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
  });
}
