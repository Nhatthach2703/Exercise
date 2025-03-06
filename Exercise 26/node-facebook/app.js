// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var session = require('express-session');
// var mongoose = require('mongoose');
// require('dotenv').config();

// // Routers
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var articleRouter = require('./routes/articleRouter');
// var commentRouter = require('./routes/commentRouter');

// // Models
// const Article = require('./models/article');
// const Comment = require('./models/comment');

// // Session Configuration
// var sessionConfig = require('./config/sessionConfig');

// var app = express();

// // View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // Middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session(sessionConfig));

// // Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter); // Replaced usersRouter with userRouter
// app.use('/articles', articleRouter);
// app.use('/comments', commentRouter);

// // Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // Error handler
// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.render('error');
// });

// // MongoDB Connection
// mongoose.set('strictQuery', true);
// const url = process.env.MONGO_URI || 'mongodb://localhost:27017/newspapers';
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// module.exports = app;



var createError = require('http-errors');
var express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var session = require('express-session');
var sessionConfig = require('./config/sessionConfig');
const morgan = require('morgan');

// Passport setup
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '1893222384838303', // YOUR_FACEBOOK_APP_ID 1158311488958642
    clientSecret: '6b96700618ac7f251f613a80997cf8e7', // YOUR_FACEBOOK_APP_SECRET  f786a13a5c1fb9f89a929159f62dd8aa
    callbackURL: "https://localhost:3000/auth/facebook/callback"
}, 
(accessToken, refreshToken, profile, done) => {
    // Here you handle the user authentication
    // Typically you would save the user detail to a database 
    return done(null, profile);
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan(':method :url \x1b[32m:status\x1b[0m :response-time ms - :res[content-length]')); //
// app.use((req, res, next) => {
//     res.on('finish', () => {
//         console.log(`${req.method} ${req.url} - Status: ${res.statusCode}`);
//     });
//     next();
// });

// Routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }), 
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to your application!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
