var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articleRouter'); //
var commentRouter = require('./routes/commentRouter'); //

const mongoose = require('mongoose');
const Article = require('./models/article');
const Comment = require('./models/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// const newArticle = new Article({
//   // Intentionally missing the 'title' field to trigger validation error
//   text: 'Short', // This text will trigger custom validation error
//   comments: [{body: 'Great article!'}], // Comment is valid
//   tags: [] // Emty array will trigger validation error for tags
// });

// newArticle.save()
//   .then(doc =>{
//     console.log('Article saved:', doc);
//   })
//   .catch(err =>{
//     console.error('An error occurred:', err);
//   });

// const newArticle = new Article({
//   // Intentionally missing the 'title' field to trigger validation error
//   title: 'Short News', 
//   text: 'Paris is known for its iconic landmarks like the Eiffel Tower and Louvre...', // This text will trigger custom validation error
//   comments: [{body: 'Great article!'}], // Comment is valid
//   tags: ['News'] // Emty array will trigger validation error for tags
// });

// newArticle.save()
//   .then(doc =>{
//     console.log('Article saved:', doc);
//   })
//   .catch(err =>{
//     console.error('An error occurred:', err);
//     connect.connection.close();
//   });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter); //
app.use('/comments', commentRouter); //

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

mongoose.set('strictQuery', true);
const url = 'mongodb://localhost:27017/newspapers';
const connect = mongoose.connect(url);

module.exports = app;
