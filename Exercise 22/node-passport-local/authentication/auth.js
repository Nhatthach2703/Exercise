const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
    User.authenticate()
));

passport.serializeUser((User, done) => {
    done(null, User._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id); // Attempt to find the user by ID
        done(null, user); // Successfully found the user, pass it to done
    } catch (err) {
        done(err, false); // An error occured, pass it to done
    }
});




// exports.isAuthenticated = async (req, res, next) => {
//     try {
//         console.log('o day');
//         if (req.cookies.username) {
//             console.log('o day 22');
//             next(); // User is authenticated, procceed to the next middleware
//         } else {
//             res.status(401).json({
//                 message: 'You are not authenticated. Please login or signup',
//                 nextSteps: {
//                     login: 'users/login',
//                     signup: 'users/signup'
//         }})}
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.isAuthenticated_Session = async (req, res, next) => {
//     try {
//         if (req.session.userId) {
//             next();
//         } else {
//             res.status(401).json({
//                 message: 'You are not authenticated. Please login or signup',
//                 nextSteps: {
//                     login: '/users/login', // Clients can use this router to redirect to the login page
//                     signup: '/users/signup' // Clients can use this router to redirect to the signup page
//         }})}
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// }