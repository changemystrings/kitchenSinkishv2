/* Gather Dependencies */
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//Mongoose for MongoDB
var mongoose = require('mongoose');
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  //'mongodb://localhost/kitchen-sinkish' ||
  'mongodb://kitchen-sinkish-web:oh2leave@ds051640.mongolab.com:51640/kitchen-sinkish';
mongoose.connect(uristring);
//Mongoose models
var User = require('./server/models/user');

//Passport Authentication and flash messaging
var passport = require('passport');
passport.check = 'yep';
var session = require('express-session');
var flash = require('connect-flash');
/* End Dependencies */


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'client/ng-app/jade'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

//Passport Configuration
app.use(session( {secret: 'f%g!!ScgYs&5d' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes for the app
//

require('./server/routes/home')(app,passport);
//var users = require('./server/routes/users');
require('./server/routes/users')(app,passport);

//app.all()
//app.use('/', routes);//(app,passport);
//app.use('/users', users);
//catch all
app.get('*', function (req, res) {
  res.render('index', {title: 'Express'});
});

app.use(User);

//app.get('/', function(req, res) {
//  res.sendfile('./client/ng-app/views/home/index.hba'); // load the single view file (angular will handle the page changes on the front-end)
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
