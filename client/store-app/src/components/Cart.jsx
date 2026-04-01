import { Link } from 'react-router-dom';

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="max-w-3xl mx-auto mt-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is completely empty.</p>
          <Link to="/" className="text-blue-600 font-semibold hover:underline">Go browse products</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-800 text-lg">{item.name}</span>
                <span className="font-bold text-gray-900 text-lg">₹{item.price.toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-600 uppercase tracking-wider">Total</h3>
            <h3 className="text-3xl font-extrabold text-green-600">₹{total}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
