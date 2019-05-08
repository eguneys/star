var http = require('http');
var path = require('path');
var createError = require('http-errors');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var server = http.createServer(app);
var expressWs = require('express-ws')(app, server);

var viewHelpers = require('./helpers');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

viewHelpers(app.locals);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'public')));

require('./Env').current().then(() => {

  var indexRouter = require('./routes');
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

});

module.exports = { app, server };

