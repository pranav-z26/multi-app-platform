import { useDashboardData } from './hooks/useDashboardData';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import DashboardContent from './components/DashboardContent';

function App() {
  const { data, error, loading } = useDashboardData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <DashboardContent data={data} />
    </div>
  );
}

export default App;