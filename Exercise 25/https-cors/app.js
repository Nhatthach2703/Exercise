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
const { cors } = require('./routes/cors');

var cors = require('./routes/cors');
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
//   credentials: true
// }));

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
