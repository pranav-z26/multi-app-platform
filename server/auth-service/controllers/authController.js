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
    await user.save();

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

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
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
  res.clearCookie('auth_token', {
    domain: '.myplatform.local',
    path: '/'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: 'No active session' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ 
      user: { id: verified.userId, name: verified.name } 
    });
  } catch (err) {
    res.status(401).json({ message: 'Session expired' });
  }
};

module.exports = { register, login, logout, getMe };