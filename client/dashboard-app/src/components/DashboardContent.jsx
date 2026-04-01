import DashboardStats from './DashboardStats';

export default function DashboardContent({ data }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.message}</h2>
        <p className="text-gray-600">Here is a real-time overview of your platform analytics.</p>
      </div>
      
      <DashboardStats data={data} />
    </div>
  );
}
