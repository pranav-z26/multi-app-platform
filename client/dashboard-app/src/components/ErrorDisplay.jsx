export default function ErrorDisplay({ message }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 p-4 rounded-md">
        <p className="text-red-600 font-medium">{message}</p>
      </div>
    </div>
  );
}
