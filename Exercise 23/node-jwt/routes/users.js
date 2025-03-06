var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

userRouter.route('/login').post(async (req, res) => {
  try {
    const { username } = req.body;
    // Assuming  this is an async function returning a user object
    const user = await userController.findUserByUsername(username);

    if (user) {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); // Expires in 1 hour
      res.json({ token });
    } else {
      res.send('Login unsuccessful');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


userRouter.post('/signup', async (req, res) => {
  try {
    // Validate the input
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    // Check if user already exists
    let user = await userController.findUserByUsername(username);
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Create and save the user
    user = await userController.createUser(username, password);
    // Generate a JWT for the new user
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(201).send('User created successfully' + user._id);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

userRouter.get('/logined', async (req, res) => {
    if (req.cookies.username) {
      res.send('Wellcome ${req.cookies.username}, you are authenticated');
    } else {
      res.status(401).send('Please login to access this page');
    }
})
// Logout endpoint
userRouter.get('/logout', async (req, res) => {
  clearCookie(res,'username');
  res.send('Logged out successfully');
})



module.exports = userRouter;

