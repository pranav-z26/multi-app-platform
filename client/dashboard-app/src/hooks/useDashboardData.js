import { useState, useEffect } from 'react';
import api from '../api/axios';
import { API_ENDPOINTS, ERROR_MESSAGES, REDIRECT_DELAY, MAIN_APP_URL } from '../constants/config';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.DASHBOARD_STATS);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(ERROR_MESSAGES.UNAUTHORIZED);
        setTimeout(() => {
          window.location.href = MAIN_APP_URL;
        }, REDIRECT_DELAY);
      }
    };

    fetchStats();
  }, []);

  return { data, error, loading };
}
