require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userAuth = require('./middleware/authMiddleware');

const app = express();

// Allow the Dashboard React App to talk to this service and send cookies
app.use(cors({
  origin: 'http://dashboard.myplatform.local:4000', 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

// Protected Route
app.get('/api/dashboard/stats', userAuth, (req, res) => {
  res.status(200).json({
    message: `Welcome to the dashboard, ${req.user.name}!`,
    stats: {
      totalOrders: 143,
      revenue: 'Rs 12,450',
      activeUsers: 89
    }
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Dashboard Service running on port ${PORT}`);
});