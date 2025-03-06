var createError = require('http-errors');
var express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var session = require('express-session');
var sessionConfig = require('./config/sessionConfig');
const jwtConfig = require('./config/jwtConfig');
var articleRouter = require('./routes/articleRouter');
var commentRouter = require('./routes/commentRouter');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const morgan = require('morgan');
const findOrCreateUser = require('./config/jwtConfig').findOrCreateUser;

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
    callbackURL: "https://localhost:3000/auth/facebook/callback", 
    profileFields: ['id', 'displayName', 'email']
}, 
async (accessToken, refreshToken, profile, done) => {
    // Here you handle the user authentication
    // Typically you would save the user detail to a database
    const user = await findOrCreateUser(profile); 
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
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/users', usersRouter); // Replaced usersRouter with userRouter
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback', 
//     passport.authenticate('facebook', { failureRedirect: '/login' }), 
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     }
// );
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }), 
    (req, res) => {
        // Generate JWT token
        const token = jwtConfig.generateToken(req.user);
        
        // Send token as response
        res.json({ message: "Login successful", token });
    }
);

// Home Route
// app.get('/', (req, res) => {
//     res.send('Welcome to your application!');
// });

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

// MongoDB Connection
mongoose.set('strictQuery', true);
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/newspapers';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
