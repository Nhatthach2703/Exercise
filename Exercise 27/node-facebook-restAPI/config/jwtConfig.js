const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
// const User = require('../models/user');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; 

// Generate JWT Token
module.exports.generateToken = (user) => {
    return jwt.sign({ 
        facebookId: user.id, 
        username: user.displayName 
    }, secretKey, { expiresIn: '1h' });
};

// Verify JWT Token 
module.exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

// Passport JWT Strategy
// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: secretKey,
// };

// passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//     console.log("JWT payload: ", jwt_payload);
//     User.findOne({ id: jwt_payload.facebookId }, (err, user) => {
//         if (err) {
//             return done(err, false);
//         }
//         return done(null, user || false);
//     });
// }));


const SALT_ROUNDS = 10;
module.exports.findOrCreateUser = async (profile) => {
    try {
        if (!profile.id) {
            throw new Error("Facebook profile ID is missing");
        }

        // Lấy danh sách user trong database
        const users = await User.find();

        // Kiểm tra xem có user nào có facebookId đã mã hóa không
        for (let user of users) {
            if (!user.facebookId) continue; // Bỏ qua nếu không có facebookId

            const match = await bcrypt.compare(profile.id, user.facebookId);
            if (match) {
                return user; // Trả về user nếu khớp
            }
        }

        // Nếu không tìm thấy user, tạo mới với facebookId đã mã hóa
        const hashedFacebookId = await bcrypt.hash(profile.id, SALT_ROUNDS);
        const newUser = new User({
            facebookId: hashedFacebookId,
            username: profile.displayName,
            email: profile.emails?.[0]?.value || null
        });

        await newUser.save();
        return newUser;

    } catch (error) {
        console.error("Error finding/creating user:", error);
        return null;
    }
};
// module.exports.findOrCreateUser = async (profile) => {
//     try {
//         let user = await User.findOne({ facebookId: profile.id });

//         if (!user) {
//             user = new User({
//                 facebookId: profile.id,
//                 username: profile.displayName,
//                 email: profile.emails?.[0]?.value || null
//             });
//             await user.save();
//         }

//         return user;
//     } catch (error) {
//         console.error("Error finding/creating user:", error);
//         return null;
//     }
// };


