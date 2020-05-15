var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

const config = require("./config")
const auth = require("./auth");

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const testRouter = require("./routes/test");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.auth.okta.clientSecret,
  resave: true,
  saveUninitialized: false
}));
app.use(auth.oidc.router);
app.use(auth.oidc.ensureAuthenticated(), (req, res, next) => {
  auth.oktaClient.getUser(req.userContext.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
});

app.use('/', publicRouter);
app.use('/dashboard', auth.oidc.ensureAuthenticated(), dashboardRouter);
app.use('/users', usersRouter);
app.use('/test', auth.oidc.ensureAuthenticated(), testRouter);

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
