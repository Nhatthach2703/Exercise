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
// const passport = require('passport');


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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articleRouter');
var commentRouter = require('./routes/commentRouter');

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Đảm bảo Passport được cấu hình đúng

var sessionConfig = require('./config/sessionConfig');

var app = express();

// Kết nối MongoDB với xử lý lỗi
mongoose.set('strictQuery', true);
const url = 'mongodb://localhost:27017/newspapers';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Cấu hình view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Định tuyến
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

// Xử lý lỗi 404
app.use((req, res, next) => {
  next(createError(404));
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
