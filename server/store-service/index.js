require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userAuth = require('./middleware/authMiddleware');

const app = express();

app.use(cors({
  origin: 'http://store.myplatform.local:5000',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

const products = [
  { id: 1, name: 'Wireless Headphones', price: 15999, description: 'Noise-cancelling over-ear headphones.' },
  { id: 2, name: 'Mechanical Keyboard', price: 9499, description: 'Tactile switches with RGB lighting.' },
  { id: 3, name: 'Ergonomic Mouse', price: 5499, description: 'Vertical mouse for wrist health.' },
  { id: 4, name: '27" 4K Monitor', price: 28999, description: 'Crisp IPS panel for productivity.' },
  { id: 5, name: 'USB-C Docking Station', price: 6999, description: 'Expand your laptop connectivity.' },
  { id: 6, name: 'Desk Mat', price: 1499, description: 'Premium leather desk protector.' }
];

app.get('/api/store/products', userAuth, (req, res) => {
  res.status(200).json(products);
});

app.get('/api/store/products/:id', userAuth, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Store Service running on port ${PORT}`);
});