import { useState, useEffect } from 'react';
import api from './api/axios';
import Header from './components/Header';
import PortalCards from './components/PortalCards';
import LoginForm from './components/LoginForm';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 font-semibold text-lg">Loading platform...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}</h2>
            <p className="text-gray-600">You are authenticated across all platform services</p>
          </div>

          {/* Portal Cards Grid */}
          <PortalCards />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <LoginForm
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    </div>
  );
}

export default App;