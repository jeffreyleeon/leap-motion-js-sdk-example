var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Leap = require('leapjs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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


Leap.loop(function(frame){
  // console.log(frame.hands.length);
  var frameString = "Frame ID: " + frame.id  + "<br />"
                + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                + "Hands: " + frame.hands.length + "<br />"
                + "Fingers: " + frame.fingers.length + "<br />";
  console.log(frameString + '\n\n\n\n');

  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      handString += "Hand ID: " + hand.id + "<br />";
      handString += "Direction: " + hand.direction + "<br />";
      // handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
      // handString += "Palm normal: " + vectorToString(hand.palmNormal, 2) + "<br />";
      // handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
      // handString += "Palm velocity: " + vectorToString(hand.palmVelocity) + " mm/s<br />";
      // handString += "Sphere center: " + vectorToString(hand.sphereCenter) + " mm<br />";
      // handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";

      // And so on...
      console.log(handString + '\n\n\n\n');
    }
  }
});


module.exports = app;
