import React, { useState } from 'react';
import { Shield, User, Lock, Loader2, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, onBack, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to access your dashboard</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!username || !password || loading}
            className={`w-full px-6 py-3 rounded-full font-semibold transition-all shadow-xl flex items-center justify-center gap-2 ${
              username && password && !loading
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          
          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onBack} 
              className="text-blue-400 hover:text-blue-300 underline"
              disabled={loading}
            >
              Go back to sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
