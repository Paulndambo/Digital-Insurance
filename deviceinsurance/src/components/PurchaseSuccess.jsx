import React, { useEffect, useState } from 'react';
import { Shield, Check, Sparkles, Mail, Smartphone, ArrowRight, PartyPopper } from 'lucide-react';
import { formatCurrency } from '../constants/currency';

const confettiPieces = [
  { left: '8%', delay: '0s', color: 'bg-amber-400/90', size: 'w-2 h-3' },
  { left: '18%', delay: '0.15s', color: 'bg-teal-400/80', size: 'w-2.5 h-2' },
  { left: '82%', delay: '0.2s', color: 'bg-rose-400/75', size: 'w-2 h-3' },
  { left: '92%', delay: '0.05s', color: 'bg-violet-400/80', size: 'w-3 h-2' },
  { left: '25%', delay: '0.25s', color: 'bg-cyan-300/70', size: 'w-2 h-2' },
  { left: '72%', delay: '0.18s', color: 'bg-amber-300/85', size: 'w-2 h-2.5' },
  { left: '48%', delay: '0.3s', color: 'bg-emerald-400/75', size: 'w-2.5 h-2' },
  { left: '55%', delay: '0.1s', color: 'bg-orange-400/70', size: 'w-2 h-3' },
];

/**
 * Full-screen celebration after a successful gadget policy purchase.
 */
const PurchaseSuccess = ({
  summary,
  user,
  onGoToDashboard,
  onOpenPolicy,
  onGoHome,
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(t);
  }, []);

  if (!summary) return null;

  const { policyNumber, firstName, coverType, monthlyPremium, deviceLabel, email, paymentMethod, policyId } = summary;

  return (
    <>
      <style>{`
        @keyframes purchase-success-pop {
          0% { transform: scale(0.2) rotate(-12deg); opacity: 0; }
          55% { transform: scale(1.08) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes purchase-success-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.08); }
        }
        @keyframes purchase-confetti {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.85; }
          50% { transform: translateY(-18px) rotate(18deg); opacity: 1; }
        }
        @keyframes purchase-slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .purchase-success-pop { animation: purchase-success-pop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .purchase-success-glow { animation: purchase-success-glow 3.5s ease-in-out infinite; }
        .purchase-confetti { animation: purchase-confetti 2.4s ease-in-out infinite; }
        .purchase-slide-up { animation: purchase-slide-up 0.7s ease-out forwards; opacity: 0; }
      `}</style>

      <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        {/* Aurora-style mesh */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 212, 191, 0.22), transparent 55%),
              radial-gradient(ellipse 60% 40% at 100% 60%, rgba(251, 191, 36, 0.12), transparent 50%),
              radial-gradient(ellipse 50% 35% at 0% 80%, rgba(167, 139, 250, 0.14), transparent 45%)
            `,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-60" />

        {/* Confetti */}
        <div className="pointer-events-none absolute inset-x-0 top-12 h-40">
          {confettiPieces.map((c, i) => (
            <span
              key={i}
              className={`purchase-confetti absolute top-0 rounded-sm ${c.color} ${c.size}`}
              style={{ left: c.left, animationDelay: c.delay }}
            />
          ))}
        </div>

        <div className={`relative z-10 w-full max-w-lg transition-all duration-700 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div
                className="purchase-success-glow absolute -inset-6 rounded-full bg-gradient-to-tr from-teal-500/30 via-amber-500/20 to-violet-500/25 blur-2xl"
                aria-hidden
              />
              <div className="purchase-success-pop relative w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 shadow-2xl shadow-teal-500/30 flex items-center justify-center ring-4 ring-white/10">
                <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-lg border-2 border-neutral-900">
                  <Check className="w-5 h-5 text-neutral-900 stroke-[3]" />
                </div>
                <Shield className="w-11 h-11 text-white drop-shadow-md" />
              </div>
            </div>
          </div>

          <p
            className="purchase-slide-up text-center text-xs font-semibold uppercase tracking-[0.35em] text-teal-400/90 mb-3"
            style={{ animationDelay: '0.1s' }}
          >
            Policy activated
          </p>
          <h1
            className="purchase-slide-up text-center text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight"
            style={{ animationDelay: '0.2s' }}
          >
            You&apos;re shielded, {firstName || 'there'}.
          </h1>
          <p
            className="purchase-slide-up text-center text-slate-400 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed"
            style={{ animationDelay: '0.28s' }}
          >
            Your device is on cover. We&apos;ve registered everything securely — sit tight for your confirmation
            {paymentMethod === 'Card' ? ' and card subscription link' : ''} by email.
          </p>

          {/* Policy ticket */}
          <div
            className="purchase-slide-up relative mb-10 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md shadow-xl overflow-hidden"
            style={{ animationDelay: '0.38s' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-amber-400/90">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Policy reference</span>
                </div>
                <PartyPopper className="w-5 h-5 text-slate-500 hidden sm:block" aria-hidden />
              </div>
              <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white break-all mb-6">
                {policyNumber}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex gap-3 rounded-xl bg-black/25 border border-white/5 p-3">
                  <Smartphone className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Covered item</p>
                    <p className="text-slate-200 font-medium leading-snug">{deviceLabel}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl bg-black/25 border border-white/5 p-3">
                  <Shield className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Plan</p>
                    <p className="text-slate-200 font-medium">{coverType}</p>
                    <p className="text-teal-400/90 font-semibold mt-1">{formatCurrency(monthlyPremium)}<span className="text-slate-500 font-normal text-xs"> /mo</span></p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Documents sent to <span className="text-slate-400">{email}</span></span>
              </div>
            </div>
            {/* Perforated edge illusion */}
            <div className="flex justify-between px-2 -mt-1 pb-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/10" />
              ))}
            </div>
          </div>

          <div className="purchase-slide-up flex flex-col sm:flex-row gap-3 justify-center" style={{ animationDelay: '0.5s' }}>
            {user && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-all"
              >
                Go to dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
            {user && policyId && onOpenPolicy && (
              <button
                type="button"
                onClick={() => onOpenPolicy(policyId)}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/15 bg-white/5 hover:bg-white/10 text-white active:scale-[0.98] transition-all"
              >
                View this policy
              </button>
            )}
            {!user && (
              <button
                type="button"
                onClick={onGoHome}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-all"
              >
                Back to home
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {user && (
            <p className="purchase-slide-up text-center text-xs text-slate-600 mt-8" style={{ animationDelay: '0.58s' }}>
              Tip: save your policy number — you&apos;ll need it for claims and support.
            </p>
          )}

          <div className="purchase-slide-up text-center mt-6" style={{ animationDelay: '0.62s' }}>
            <button
              type="button"
              onClick={onGoHome}
              className="text-xs text-slate-500 hover:text-slate-300 underline-offset-4 hover:underline transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseSuccess;
