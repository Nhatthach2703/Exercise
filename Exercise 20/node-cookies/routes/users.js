var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const userRouter = express.Router();
const bcrypt = require('bcrypt');


/* GET users listing. */

userRouter.get('/', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await userController.findUserByUsername(username);
    if (!user) {
      res.status(200).json("User existed");
      console.log("From DB:", user.username, user.password);
      // Further logic...
    } else {
      res.status(200).json("User not found during signup.")
      // User doesn't exist, proceed with signup...
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

userRouter.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userController.findUserByUsername(username); // Assuming this is an async
    console.log(user.username + ' and ' + user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.cookie('username', username, {maxAge: 900000, httpOnly: true});
      res.send('Cookie has been set.');
    } else {
      res.send('Login unsuccessful');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

userRouter.post('/signup', async (req, res) => {
  try {
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
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create and save the user
    user = await userController.create(username, hashedPassword);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(error.message );
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

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
