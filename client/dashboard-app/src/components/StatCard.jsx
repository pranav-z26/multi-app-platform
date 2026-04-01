export default function StatCard({ label, value, valueColor = 'text-gray-900' }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </h3>
      <p className={`text-4xl font-extrabold ${valueColor}`}>{value}</p>
    </div>
  );
}
