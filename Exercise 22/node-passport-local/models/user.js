const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    // username: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     require: true
    // },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

