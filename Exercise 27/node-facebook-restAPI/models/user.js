// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const User = new Schema({
//     username: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     admin: {
//         type: Boolean,
//         default: false
//     }
// });

// module.exports = mongoose.model('User', User);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    facebookId: { // Lưu ID của Facebook
        type: String,
        unique: true,
        sparse: true // Cho phép giá trị null nếu không phải Facebook login
    },
    username: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        unique: true,
        sparse: true // Email không bắt buộc nếu đăng nhập bằng Facebook
    },
    password: { 
        type: String,
        required: function() { return !this.facebookId; } // Chỉ yêu cầu nếu không đăng nhập bằng Facebook
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);
