import Logo from './Logo';

export default function LoginForm({ email, password, error, loading, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded shadow-md p-8 border border-gray-300">
        {/* Logo/Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo className="w-22 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">MyPlatform</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Sign up</span></p>
        </div>
      </div>
    </div>
  );
}
