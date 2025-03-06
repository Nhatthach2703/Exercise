const User = require('../models/user'); // Giả định bạn có một model User

const userController = {
  // Tìm người dùng theo username
  findUserByUsername: async (username) => {
    try {
      return await User.findOne({ username });
    } catch (error) {
      throw new Error('Lỗi khi tìm người dùng: ' + error.message);
    }
  },

  // Tạo người dùng mới
  create: async (username, hashedPassword) => {
    try {
      const newUser = new User({ username, password: hashedPassword });
      return await newUser.save();
    } catch (error) {
      throw new Error('Lỗi khi tạo người dùng: ' + error.message);
    }
  }
};

module.exports = userController;
