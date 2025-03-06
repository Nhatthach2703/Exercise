// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var articleRouter = require('./routes/articleRouter'); //
// var commentRouter = require('./routes/commentRouter'); //

// const mongoose = require('mongoose');
// const Article = require('./models/article');
// const Comment = require('./models/comment');

// var sessionConfig = require('./config/sessionConfig');
// const session = require('express-session');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(session(sessionConfig));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/articles', articleRouter); //
// app.use('/comments', commentRouter); //

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// mongoose.set('strictQuery', true);
// const url = 'mongodb://localhost:27017/newspapers';
// const connect = mongoose.connect(url);

// module.exports = app;




var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
require('dotenv').config();

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articleRouter');
var commentRouter = require('./routes/commentRouter');

// Models
const Article = require('./models/article');
const Comment = require('./models/comment');

// Session Configuration
var sessionConfig = require('./config/sessionConfig');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter); // Replaced usersRouter with userRouter
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// MongoDB Connection
mongoose.set('strictQuery', true);
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/newspapers';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
