import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/store/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/')); // Go back if fail
  }, [id, navigate]);

  if (!product) return <div className="text-center text-gray-500 font-medium mt-10">Loading product details...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-4">
      <button 
        onClick={() => navigate('/')} 
        className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center transition-colors"
      >
        &larr; Back to Catalog
      </button>
      
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
        <h3 className="text-3xl font-extrabold text-green-600">₹{product.price.toLocaleString('en-IN')}</h3>
      </div>
      
      <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>
      
      <button 
        onClick={() => addToCart(product)} 
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm"
      >
        Add to Cart
      </button>
    </div>
  );
}
