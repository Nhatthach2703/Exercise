var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
require('dotenv').config();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

exports.jwtPassport = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({
        id: jwt_payload._id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

exports.verifyUser = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};


// exports.verifyUser = function (req, res, next) {
//     let token = req.headers['authorization']; 

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided!' });
//     }

//     if (token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length);
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid token!' });
//         }
//         req.user = decoded;
//         next();
//     });
// };