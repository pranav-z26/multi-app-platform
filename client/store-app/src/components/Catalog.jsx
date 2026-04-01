import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/store/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unauthorized. Redirecting to login...');
        setTimeout(() => window.location.href = 'http://app.myplatform.local:3000', 2000);
      });
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center mt-10">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (loading) return <div className="text-center text-gray-500 font-medium mt-10">Loading products...</div>;

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900">Latest Products</h3>
        <p className="text-gray-600 mt-2">Browse our exclusive collection.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{p.name}</h4>
              <p className="text-2xl font-extrabold text-gray-900">₹{p.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <Link 
                to={`/product/${p.id}`} 
                className="block w-full text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
