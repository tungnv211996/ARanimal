var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index')
var api = require('./routes/api');
var file = require('./routes/file');
var user = require('./routes/user');

var app = express();

var mongoose = require('mongoose');
Promise = require('bluebird'); // // make bluebird default Promise eslint-disable-line no-global-assign

//Url address Database
// const mongoDb = 'mongodb://tungnv211996:NguyenVanTung123@ds135196.mlab.com:35196/aranimal'
const mongoDb = 'mongodb://127.0.0.1:27017/ARanimal'

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
//Database
mongoose.connect(mongoDb,{
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console,'connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', index)
app.use('/api', api);
app.use('/file', file);
app.use('/', user)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
