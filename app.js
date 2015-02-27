
var authToken;
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
  'mongodb://localhost/kitchen-sinkish' ||
  'mongodb://kitchen-sink-app:y0gabbagabba@ds027771.mongolab.com:27771/kitchen-sink-app';
mongoose.connect(uristring);

//Mongoose models
var User = require('./server/models/user');

//Passport Authentication and flash messaging
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');


// view engine setup
// default overridden to point to angular folder
app.set('views', path.join(__dirname, 'client/ng-app/jade'));
app.set('view engine', 'jade');


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

//Base object for API calls
var apiData = require('./server/models/apiData')(app,passport);

//Routes for the app
require('./server/passport/local.js')(passport,apiData);
require('./server/routes/home')(app,passport,apiData);
require('./server/routes/users')(app,passport,apiData);
require('./server/routes/auth/signup.js')(app,passport,apiData);
require('./server/routes/auth/authenticate.js')(app,passport,apiData);
require('./server/routes/auth/auth-handler.js')(app,passport,apiData);
require('./server/routes/auth/logout.js')(app,passport,apiData);
//catch all - non-api routes are sent back to angular for ui-router to handle
app.all('*', function (req, res) {
  res.render('index', {title: 'Express'});
});
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
        console.log(err);
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
