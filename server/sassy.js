var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

const config = require("../config")
const auth = require("./auth");

const addUser = require("./middleware/add-user-data");

const appRouter = require("./routes/app");
const platformRouter = require("./routes/platform");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: config.user_management.okta.clientSecret,
  resave: true,
  saveUninitialized: false
}));
app.use(auth.oidc.router);
app.use(addUser);

var options = {
  index: false
}

app.use(express.static(path.join(__dirname, '../public'), options));
app.use(express.static(path.join(__dirname, '../app/public'), options));

app.use('/', platformRouter);
app.use('/app', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
