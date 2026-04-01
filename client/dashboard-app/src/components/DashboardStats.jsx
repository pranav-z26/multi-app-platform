import StatCard from './StatCard';

export default function DashboardStats({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Total Orders" 
        value={data.stats.totalOrders} 
      />
      <StatCard 
        label="Revenue" 
        value={data.stats.revenue}
        valueColor="text-green-600"
      />
      <StatCard 
        label="Active Users" 
        value={data.stats.activeUsers}
        valueColor="text-blue-600"
      />
    </div>
  );
}
