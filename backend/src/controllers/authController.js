const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
/**
 * Registers a new user in the system.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
  register: async (req, res) => {
    const { username, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    const extractedEmail = username.match(emailRegex)[0];

    const existingUser = await User.findOne({ username: { $regex: new RegExp(extractedEmail, 'i') } });

    if (existingUser) {
      console.log("exist user dentro del if validacion",existingUser)
    return res.status(400).json({ message: 'Error in registration.' });
  }


    if (!username || !password) {
      return res.status(400).json({ message: 'Registration error. Missing username or password.' });
    }

    if (!emailRegex.test(username)) {
      return res.status(400).json({ message: 'Registration error. Please provide a valid email address.' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Registration error. Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, and one number.' });
    }

    try {

      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: 'Successful registration. You can log in now.' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed. Please try again later.', error: error.message });
    }
  },

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} req - The request object containing the user's credentials.
 * @param {Object} res - The response object used to send the login result.
 * @return {Promise<void>} Returns a Promise that resolves with the login result or rejects with an error.
 */
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Login error. Please verify your details.' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in. Please try again later.' });
    }
  },
};

module.exports = authController;

