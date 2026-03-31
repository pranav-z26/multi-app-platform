import { useState } from 'react';
import api from './api/axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // If logged in, show the portal links
  if (user) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome, {user.name}!</h1>
        <p>You are officially authenticated across the platform.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {/* Notice these are standard <a> tags linking to the other subdomains */}
          <a href="http://dashboard.myplatform.local:4000" style={linkStyle}>
            Go to Dashboard
          </a>
          <a href="http://store.myplatform.local:5000" style={linkStyle}>
            Go to Store
          </a>
        </div>
      </div>
    );
  }

  // If not logged in, show the form
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Platform Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

const linkStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px'
};

export default App;