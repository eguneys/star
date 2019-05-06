var http = require('http');
var path = require('path');
var createError = require('http-errors');

var express = require('express');
var app = express();

var server = http.createServer(app);
var expressWs = require('express-ws')(app, server);

var viewHelpers = require('./helpers');
var indexRouter = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

viewHelpers(app.locals);

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server };
