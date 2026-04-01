import { MAIN_APP_URL } from '../constants/config';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-22 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
            Y-axis
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Portal</h1>
        </div>
        <a 
          href={MAIN_APP_URL}
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
        >
          &larr; Back to Main App
        </a>
      </div>
    </div>
  );
}
