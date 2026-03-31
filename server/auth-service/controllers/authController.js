// auth-service/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save(); // Password hashing is handled by the model hook

    res.status(201).json({ message: `User ${user.name} registered successfully!!` });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during registration', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, name: user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Set Cross-Subdomain Cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false, // fine for local HTTP
      domain: '.myplatform.local', 
      sameSite: 'lax',
      maxAge: 3600000 
    });

    res.status(200).json({ 
      message: 'Login successful!!', 
      user: { id: user._id, name: user.name } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during login', error: error.message });
  }
};

const logout = (req, res) => {
  // To clear the cookie, the domain must match exactly
  res.clearCookie('auth_token', {
    domain: '.myplatform.local',
    path: '/'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };