const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  const token = req.cookies.auth_token;
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Please provide token' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = userAuth;