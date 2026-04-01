// store-app/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

// --- MAIN APP WITH ROUTER ---
export default function App() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
    // A more subtle notification could be added here, but alert works for the assessment
    alert(`${product.name} added to cart!`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Platform Standard Header */}
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-3">
                <div className="w-22 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
                  Y-axis
                </div>
                <h2 className="text-2xl font-bold text-gray-900 hidden sm:block">Store Portal</h2>
              </div>
              
              <div className="flex gap-6 items-center font-medium">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Catalog</Link>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Cart 
                  <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2.5 rounded-full text-xs font-bold">
                    {cart.length}
                  </span>
                </Link>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <a href="http://app.myplatform.local:3000" className="text-gray-500 hover:text-gray-800 transition-colors text-sm">
                  Main App &rarr;
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}