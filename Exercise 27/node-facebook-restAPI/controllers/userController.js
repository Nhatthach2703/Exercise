const User = require('../models/user'); // Giả định bạn có một model User
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
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
  },

  // findUserByFacebookId: async (facebookId) => {
  //   try {
  //     if (!facebookId) {
  //       throw new Error("Facebook ID is required");
  //     }

  //     // Chỉ lấy user có facebookId hợp lệ
  //     const users = await User.find({ facebookId: { $exists: true, $ne: null } });

  //     for (const user of users) {
  //       const match = await bcrypt.compare(facebookId, user.facebookId);
  //       if (match) {
  //         return user; // Trả về user nếu tìm thấy
  //       }
  //     }

  //     return null; // Không tìm thấy user nào phù hợp
  //   } catch (error) {
  //     console.error("Error finding user by Facebook ID:", error);
  //     throw error;
  //   }
  // }
  
  findUserByFacebookId: async (facebookId) => {
    try {
        return await User.findOne({ facebookId });
    } catch (error) {
        console.error("Error finding user by Facebook ID:", error);
        throw error;
    }
  }
};



module.exports = userController;
