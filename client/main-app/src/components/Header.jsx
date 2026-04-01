import Logo from './Logo';

export default function Header({ user, onLogout }) {
  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-900">MyPlatform</h1>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
