const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const promMid = require('express-prometheus-middleware');
const cors = require('cors');

const timeRouter = require('./routes/time');
const authenticationMiddleware = require('./auth');

const app = express();

const PORT = 9091;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(promMid({
  metricsPath: '/metrics',
  metricsApp: app,
  collectDefaultMetrics: true,
  authenticate: req => req.headers.authorization === 'mysecrettoken',
  customLabels: ['contentType'],
}));

app.get('/time', authenticationMiddleware, timeRouter);

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
  res.send('error');
});

app.listen(PORT, () => {
  console.log(`Example api is listening on http://localhost:${PORT}`);
});

module.exports = app;
