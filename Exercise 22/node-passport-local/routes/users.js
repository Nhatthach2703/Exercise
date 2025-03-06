var express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const passport = require('passport');
const User = require('../models/user');
// const bcrypt = require('bcrypt');

// Login endpoint
userRouter.get('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus=200;
  res.setHeader('Content-Type', 'application/json');
  res.json({status: 'Login successful', user:User});
})
// signup endpoint
userRouter.post('/signup', (req, res, next) => {
  console.log(req.body.username);
  console.log(req.body.password);
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local', {session: true})(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful'});
      });
    }
  });
});
// Logout endpoint
userRouter.get('/logout', async (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.send('Logged out');
    });
  });
});

module.exports = userRouter;
