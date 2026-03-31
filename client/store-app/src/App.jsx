// store-app/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import api from './api/axios';

// --- MAIN APP WITH ROUTER ---
export default function App() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <h2>Store Portal</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/">Catalog</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <a href="http://app.myplatform.local:3000" style={{ color: 'gray' }}>Back to Main App</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- COMPONENTS ---

function Catalog() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/store/products')
      .then(res => setProducts(res.data))
      .catch(() => {
        setError('Unauthorized. Redirecting to login...');
        setTimeout(() => window.location.href = 'http://app.myplatform.local:3000', 2000);
      });
  }, []);

  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;

  return (
    <div>
      <h3>Latest Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h4>{p.name}</h4>
            <p>${p.price}</p>
            <Link to={`/product/${p.id}`}><button>View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/store/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/')); // Go back if fail
  }, [id, navigate]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>← Back</button>
      <h2>{product.name}</h2>
      <h3 style={{ color: 'green' }}>${product.price}</h3>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              {item.name} - ${item.price}
            </li>
          ))}
          <h3>Total: ${total}</h3>
        </ul>
      )}
    </div>
  );
}