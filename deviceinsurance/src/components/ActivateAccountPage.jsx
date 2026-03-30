import React, { useId, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lock,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/branding';
import { activateAccount } from '../utils/api';

const ActivateAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenParam = searchParams.get('token')?.trim() || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordId = useId();
  const confirmId = useId();

  const tokenMissing = useMemo(() => !tokenParam, [tokenParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!tokenParam) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await activateAccount({
        token: tokenParam,
        password,
        confirmPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err?.message || 'Activation failed. Please try again or request a new link.');
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => navigate('/');

  const goToLogin = () => {
    navigate('/', { state: { openLogin: true } });
  };

  if (tokenMissing) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-lg text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo variant="full" iconSize={40} className="justify-center" />
          </div>
          <div
            role="alert"
            className="mb-8 flex gap-3 rounded-xl border border-amber-500/35 bg-amber-500/[0.12] px-4 py-3 text-left"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
            <p className="text-sm leading-snug text-amber-100">
              This activation link is missing or incomplete. Open the link from your activation email, or
              contact support if the problem continues.
            </p>
          </div>
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-600/15 blur-[100px]"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-lg sm:max-w-xl animate-in">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1324]/85 p-8 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
            <div className="mb-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                <CheckCircle2 className="h-9 w-9 text-emerald-400" aria-hidden />
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
              All set
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Account activated
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Your account is ready. Sign in with your email and the password you just set to access{' '}
              {BRAND_NAME}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={goToLogin}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 sm:w-auto sm:min-w-[200px]"
              >
                Continue to sign in
              </button>
              <button
                type="button"
                onClick={goHome}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] sm:w-auto"
              >
                Back to home
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-8 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-primary-400/90" aria-hidden />
              <span>Encrypted connection · {BRAND_NAME}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
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
          onClick={goHome}
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
              Activate account
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Set your password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{BRAND_TAGLINE}</p>
            <p className="mt-1 text-xs text-slate-500">
              Choose a secure password to finish activating your account.
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
                htmlFor={passwordId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                New password
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
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-12 text-[15px] text-white placeholder:text-slate-500 transition focus:border-primary-400/40 focus:outline-none focus:ring-2 focus:ring-primary-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
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

            <div>
              <label
                htmlFor={confirmId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <input
                  id={confirmId}
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-12 text-[15px] text-white placeholder:text-slate-500 transition focus:border-primary-400/40 focus:outline-none focus:ring-2 focus:ring-primary-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Repeat your password"
                  required
                  minLength={8}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  disabled={loading}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:pointer-events-none"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!password || !confirmPassword || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Activating…
                </>
              ) : (
                'Activate account'
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-primary-400/90" aria-hidden />
              <span>Encrypted connection · {BRAND_NAME}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccountPage;
