import React, { useId, useState } from 'react';
import {
  User,
  Lock,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/branding';

const Login = ({ onLogin, onBack, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const usernameId = useId();
  const passwordId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-12 sm:min-h-[calc(100vh-10rem)] sm:px-6 sm:py-16 lg:py-20">
      {/* Ambient background — matches app shell, stays subtle */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary-600/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary-500/10 blur-[80px]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg sm:max-w-xl animate-in">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to home
        </button>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1324]/85 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
          <header className="mb-8 text-center">
            <div className="mb-5 flex justify-center">
              <BrandLogo variant="full" iconSize={40} className="justify-center" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              Sign in
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{BRAND_TAGLINE}</p>
            <p className="mt-1 text-xs text-slate-500">
              Access your policies, claims, and account in one place.
            </p>
          </header>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 flex gap-3 rounded-xl border border-red-500/35 bg-red-500/[0.12] px-4 py-3 text-left"
            >
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                aria-hidden
              />
              <p className="text-sm leading-snug text-red-200">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-busy={loading}
            noValidate
          >
            <div>
              <label
                htmlFor={usernameId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <input
                  id={usernameId}
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-[15px] text-white placeholder:text-slate-500 transition focus:border-primary-400/40 focus:outline-none focus:ring-2 focus:ring-primary-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="your.username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={passwordId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <input
                  id={passwordId}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-12 text-[15px] text-white placeholder:text-slate-500 transition focus:border-primary-400/40 focus:outline-none focus:ring-2 focus:ring-primary-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!username || !password || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-primary-400/90" aria-hidden />
              <span>Encrypted connection · {BRAND_NAME}</span>
            </div>
            <p className="text-center text-sm text-slate-500">
              New here?{' '}
              <button
                type="button"
                onClick={onBack}
                className="font-medium text-primary-400 transition hover:text-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:opacity-40"
                disabled={loading}
              >
                Start on the home page
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
