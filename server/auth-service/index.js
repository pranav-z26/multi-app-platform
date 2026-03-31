// auth-service/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Crucial CORS setup for cookies
app.use(cors({
  origin: 'http://app.myplatform.local:3000', // The frontend domain
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Auth Service connected to DB!'))
  .catch(err => console.error('DB connection error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});