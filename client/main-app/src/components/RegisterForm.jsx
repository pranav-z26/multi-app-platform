import Logo from './Logo';

export default function RegisterForm({ name, email, password, error, loading, onNameChange, onEmailChange, onPasswordChange, onSubmit, onBackToLogin }) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded shadow-md p-8 border border-gray-300">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo className="w-22 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">MyPlatform</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              id="name"
              type="text" 
              placeholder="Pranav" 
              value={name} 
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="password" 
              value={password} 
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">Already have an account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={onBackToLogin}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
}
