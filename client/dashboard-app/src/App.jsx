import { useState, useEffect } from 'react';
import api from './api/axios';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Unauthorized or session expired. Redirecting to login...');
        setTimeout(() => {
          // Redirects to Main App if token is missing/invalid
          window.location.href = 'http://app.myplatform.local:3000'; 
        }, 2000);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <h2 style={{ padding: '2rem' }}>Loading Dashboard...</h2>;
  if (error) return <h2 style={{ padding: '2rem', color: 'red' }}>{error}</h2>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Portal</h1>
      <h2 style={{ color: '#007bff' }}>{dashboardData.message}</h2>
      
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p style={statStyle}>{dashboardData.stats.totalOrders}</p>
        </div>
        <div style={cardStyle}>
          <h3>Revenue</h3>
          <p style={statStyle}>{dashboardData.stats.revenue}</p>
        </div>
        <div style={cardStyle}>
          <h3>Active Users</h3>
          <p style={statStyle}>{dashboardData.stats.activeUsers}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ddd',
  padding: '1.5rem',
  borderRadius: '8px',
  minWidth: '200px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const statStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: '10px 0 0 0'
};

export default App;