import React, { useState } from 'react';
import {
  ArrowRight,
  Store,
  Zap,
  DollarSign,
  Headphones,
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
  FileText,
  Wallet,
  Star,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  ClipboardCheck,
  Menu,
  X,
  BadgePercent,
  BarChart3,
  Handshake,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { BRAND_NAME, BRAND_EMAIL } from '../constants/branding';

const SUPPORT_TEL = '+254745491093';
const SUPPORT_TEL_DISPLAY = '0745 491 093';

const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
    {eyebrow && (
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1.5 ring-1 ring-primary-500/20">
        <Sparkles className="h-3.5 w-3.5 text-primary-400" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
          {eyebrow}
        </span>
      </div>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl">
        {description}
      </p>
    )}
  </div>
);

const BecomeOutletPage = ({ onBack, onRegister, onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] via-[#0b0f1a] to-[#0d1220] text-white">

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f1a]/80 backdrop-blur-xl">
        <Container className="flex items-center justify-between py-4">
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-2.5 transition-all duration-200 hover:opacity-90"
            aria-label="Back to home"
          >
            <img
              src="/coverkit-icon.png"
              alt=""
              className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105 lg:h-9 lg:w-9"
              aria-hidden="true"
            />
            <span className="text-base font-bold tracking-tight text-white lg:text-lg">{BRAND_NAME}</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Outlet page navigation">
            {[
              { href: '#benefits', label: 'Benefits' },
              { href: '#commissions', label: 'Commissions' },
              { href: '#how-it-works', label: 'How it works' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={onBack}
              className="border-0 bg-transparent p-0 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
            >
              For customers
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${SUPPORT_TEL}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              <span className="hidden lg:inline">{SUPPORT_TEL_DISPLAY}</span>
            </a>
            {onLoginClick && (
              <button
                type="button"
                onClick={onLoginClick}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <LogIn className="h-4 w-4" aria-hidden />
                Log in
              </button>
            )}
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition-all duration-200 hover:shadow-xl hover:shadow-primary-900/40 hover:brightness-110 active:scale-[0.98]"
            >
              Register outlet
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </Container>

        {mobileMenuOpen && (
          <div className="animate-in slide-in-from-top-2 border-t border-white/5 bg-[#0d1220]/95 backdrop-blur-xl md:hidden">
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {[
                  { href: '#benefits', label: 'Benefits' },
                  { href: '#commissions', label: 'Commissions' },
                  { href: '#how-it-works', label: 'How it works' },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onBack(); }}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  For customers
                </button>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  <PhoneCall className="h-4 w-4 text-primary-400" aria-hidden />
                  {SUPPORT_TEL_DISPLAY}
                </a>
                {onLoginClick && (
                  <button
                    type="button"
                    onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/10"
                  >
                    <LogIn className="h-4 w-4" aria-hidden />
                    Log in
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onRegister(); }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition-all duration-200 hover:brightness-110"
                >
                  <Store className="h-4 w-4" aria-hidden />
                  Register your outlet
                </button>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(26,137,255,0.15), transparent 70%), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(74,222,128,0.08), transparent 60%), radial-gradient(ellipse 50% 35% at 10% 80%, rgba(26,137,255,0.06), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" aria-hidden />

        <Container className="relative py-20 sm:py-24 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" aria-hidden />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  For shops, dealers &amp; service points
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Become a recognised{' '}
                <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-emerald-400 bg-clip-text text-transparent">
                  device outlet partner
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 lg:mx-0 lg:text-xl">
                Register your business with {BRAND_NAME} to offer household-item cover where customers
                already buy or repair devices — and earn commissions on every policy sold.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={onRegister}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/40 transition-all duration-200 hover:shadow-2xl hover:shadow-primary-900/50 hover:brightness-110 active:scale-[0.98]"
                >
                  Register your outlet
                  <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </button>
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                >
                  <PhoneCall className="h-5 w-5 text-primary-400" aria-hidden />
                  Talk to us
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
                {[
                  'Earn commissions per policy',
                  'Online digital tools',
                  'Dedicated support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 via-transparent to-emerald-500/10 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#121826] to-[#0f1419] shadow-2xl">
                <div className="border-b border-white/5 bg-gradient-to-r from-emerald-500/5 to-primary-500/5 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                        <DollarSign className="h-5 w-5 text-emerald-400" aria-hidden />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">Example earnings</p>
                        <p className="text-xs text-slate-500">Per policy commission</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                      Monthly
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-white/5 p-6">
                  {[
                    { label: '5 policies/month', premium: 5000, commission: 500, pct: 30 },
                    { label: '15 policies/month', premium: 15000, commission: 1500, pct: 55 },
                    { label: '30 policies/month', premium: 30000, commission: 3000, pct: 80 },
                  ].map(({ label, premium, commission, pct }) => (
                    <div key={label} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-slate-300">{label}</span>
                          <span className="text-xs text-slate-600">KES {premium.toLocaleString()} premiums</span>
                        </div>
                        <span className="shrink-0 text-base font-bold text-emerald-400">
                          +KES {commission.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 bg-white/[0.02] px-6 py-4">
                  <p className="text-xs leading-relaxed text-slate-500">
                    Illustrative only — actual commission rates are confirmed during onboarding.
                  </p>
                  <button
                    type="button"
                    onClick={onRegister}
                    className="mt-3 w-full rounded-xl bg-primary-500/15 py-3 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/20 transition-all duration-200 hover:bg-primary-500/25 hover:ring-primary-500/30"
                  >
                    Start earning →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {[
              { value: '~10%', label: 'Commission per policy', icon: BadgePercent, color: 'from-emerald-500 to-green-400' },
              { value: 'Online', label: 'Digital-first tools', icon: Zap, color: 'from-amber-500 to-orange-400' },
              { value: '2-step', label: 'Simple registration', icon: ClipboardCheck, color: 'from-primary-500 to-blue-400' },
              { value: 'M-Pesa', label: 'Kenya-native payments', icon: Wallet, color: 'from-violet-500 to-purple-400' },
            ].map(({ value, label, icon: Icon, color }) => (
              <div key={label} className="group text-center">
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />
                </div>
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core benefits */}
      <section className="py-20 sm:py-24 lg:py-32" id="benefits">
        <Container>
          <SectionTitle
            eyebrow="Why partner"
            title="Built for outlet operators"
            description="Everything you need to offer insurance and earn commissions seamlessly."
          />
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                icon: Store,
                title: 'Trusted at the counter',
                body: 'Your outlet appears in our partner network so customers know cover is available from a real shop or workshop they already use.',
                color: 'from-primary-500 to-blue-400',
              },
              {
                icon: Zap,
                title: 'Digital-first flow',
                body: 'Guided purchase on the web or app means less paperwork for you and a consistent experience for every policyholder.',
                color: 'from-amber-500 to-orange-400',
              },
              {
                icon: Headphones,
                title: 'Support when you need it',
                body: `Reach our team on ${SUPPORT_TEL_DISPLAY} or email — for product questions so you can answer buyers and claimants with confidence.`,
                color: 'from-emerald-500 to-green-400',
              },
            ].map(({ icon: Icon, title, body, color }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" aria-hidden />
                <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                </div>
                <h3 className="relative text-xl font-semibold text-white">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Commissions section */}
      <section className="bg-gradient-to-b from-white/[0.02] to-transparent py-20 sm:py-24 lg:py-32" id="commissions">
        <Container>
          <SectionTitle
            eyebrow="Commissions &amp; earnings"
            title="Grow with every policy sold"
            description="When you help customers protect their household items, you earn a commission on every active policy — paid out on a clear, transparent schedule."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {[
              {
                icon: BadgePercent,
                title: 'Commission on every sale',
                body: 'Earn a percentage of each policy premium for every customer you help enrol. The more policies you activate, the more you earn.',
                color: 'from-emerald-600 to-green-400',
              },
              {
                icon: TrendingUp,
                title: 'Recurring monthly income',
                body: 'As long as your customers\' policies remain active, you continue to earn. Build a steady income stream from a growing book of active policyholders.',
                color: 'from-primary-600 to-primary-400',
              },
              {
                icon: BarChart3,
                title: 'Sales dashboard visibility',
                body: 'Your sales-agent account gives you a live view of policies you have activated, premiums collected, and commission earned — all in one place.',
                color: 'from-violet-600 to-purple-400',
              },
              {
                icon: Handshake,
                title: 'Partnership onboarding',
                body: 'Our team walks you through commission rates, payment schedules, and the tools available to you when you join — so you know exactly what to expect.',
                color: 'from-amber-500 to-orange-400',
              },
            ].map(({ icon: Icon, title, body, color }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1419] to-[#0b0f1a] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary-500/5 to-transparent blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" aria-hidden />
                <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                </div>
                <h3 className="relative text-xl font-semibold text-white">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>

          {/* Illustrative commission table */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#121826] to-[#0f1419] shadow-xl">
            <div className="border-b border-white/5 bg-gradient-to-r from-emerald-500/5 to-primary-500/5 px-6 py-5 sm:px-8">
              <p className="text-base font-semibold text-white">Commission illustration</p>
              <p className="mt-1 text-sm text-slate-500">Based on a ~10% illustrative rate — actual rates confirmed at onboarding</p>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { policies: 5, totalPremiums: 5000, commission: 500 },
                { policies: 15, totalPremiums: 15000, commission: 1500 },
                { policies: 30, totalPremiums: 36000, commission: 3600 },
                { policies: 60, totalPremiums: 72000, commission: 7200 },
              ].map(({ policies, totalPremiums, commission }) => (
                <div key={policies} className="group grid grid-cols-[1fr_auto] gap-4 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02] sm:grid-cols-3 sm:px-8">
                  <span className="text-sm font-medium text-slate-300 sm:text-base">
                    {policies} active policies
                  </span>
                  <span className="hidden text-center text-sm text-slate-500 sm:block">
                    KES {totalPremiums.toLocaleString()}
                  </span>
                  <span className="text-right text-base font-bold text-emerald-400 sm:text-lg">
                    +KES {commission.toLocaleString()}/mo
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 bg-white/[0.02] px-6 py-4 sm:px-8">
              <p className="text-xs leading-relaxed text-slate-600">
                Illustrative only. Premiums, rates, and payment schedules explained at onboarding.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent py-20 sm:py-24 lg:py-32" id="how-it-works">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.015%22%3E%3Cpath d=%22M0 0h40v40H0V0zm40 40h40v40H40V40z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden />
        
        <Container className="relative">
          <SectionTitle
            eyebrow="How it works"
            title="From registration to first commission"
            description="Four simple steps to get your outlet onboarded and start earning."
          />

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent lg:block" aria-hidden />
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {[
                {
                  title: 'Register online',
                  text: 'Fill in your business details — outlet name, location, and contact info — in our short online form.',
                  icon: FileText,
                  color: 'from-blue-600 to-primary-500',
                },
                {
                  title: 'Add your outlet',
                  text: 'Describe your shop or service point so we can list it in the partner network and link policies to your outlet.',
                  icon: Store,
                  color: 'from-primary-600 to-primary-400',
                },
                {
                  title: 'Get agent access',
                  text: 'Receive your sales-agent account to create policies, track activity, and view commission earnings.',
                  icon: Users,
                  color: 'from-violet-600 to-primary-500',
                },
                {
                  title: 'Earn commissions',
                  text: 'Help customers protect their items, activate policies, and start building a recurring commission income.',
                  icon: DollarSign,
                  color: 'from-emerald-600 to-emerald-400',
                },
              ].map(({ title, text, icon: Icon, color }, i) => (
                <div key={title} className="group relative">
                  <div className="relative mb-6 flex justify-center">
                    <div className={`relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-xl ring-4 ring-[#0b0f1a] transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                      <Icon className="h-10 w-10 text-white" aria-hidden />
                      <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0f1a] text-sm font-bold text-primary-300 ring-2 ring-primary-500/40">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={onRegister}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/40 transition-all duration-200 hover:shadow-2xl hover:shadow-primary-900/50 hover:brightness-110 active:scale-[0.98]"
            >
              Start registration now
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </button>
          </div>
        </Container>
      </section>

      {/* Why become a partner */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <SectionTitle
            eyebrow="Why partner with us"
            title="Built for outlet operators like you"
            description="Less friction, more revenue — tools that fit into how you already serve customers."
          />
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Fast, digital onboarding',
                text: 'Two steps and you are live in our partner network — no lengthy approval queues or physical paperwork.',
                color: 'from-amber-500 to-orange-400',
              },
              {
                icon: Shield,
                title: 'Purpose-built platform',
                text: 'Your sales-agent dashboard is designed specifically for selling household-item cover — not a generic CRM.',
                color: 'from-primary-600 to-primary-400',
              },
              {
                icon: BarChart3,
                title: 'Transparent earnings',
                text: 'See exactly which policies you activated and how much commission you have earned — updated in real time.',
                color: 'from-cyan-600 to-blue-400',
              },
              {
                icon: BadgePercent,
                title: 'Recurring commission',
                text: 'Active policies keep paying commission month after month — not just a one-time referral bonus.',
                color: 'from-emerald-600 to-green-400',
              },
              {
                icon: MessageCircle,
                title: 'Reachable partner team',
                text: 'Phone and email support during business hours — so you can confidently answer any customer question.',
                color: 'from-violet-600 to-purple-400',
              },
              {
                icon: Handshake,
                title: 'Grow together',
                text: 'As the network expands, your listed outlet gains visibility to new customers looking for trusted cover near them.',
                color: 'from-rose-600 to-red-400',
              },
            ].map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" aria-hidden />
                <div className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                </div>
                <h3 className="relative text-lg font-semibold text-white">{title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent py-20 sm:py-24 lg:py-32">
        <Container>
          <SectionTitle
            eyebrow="Partner voices"
            title="What outlet owners say"
            description={`Feedback from shops and service points already partnered with ${BRAND_NAME}.`}
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  'Signing up was quick. I activated 8 policies in the first month and saw commission drop in cleanly — no chasing anyone.',
                name: 'Peter N.',
                place: 'Electronics shop, Nairobi',
                initials: 'PN',
                color: 'from-blue-600 to-primary-500',
              },
              {
                quote:
                  'Customers already trust us for repairs. Offering insurance through the same outlet was a natural add-on that earns us extra every month.',
                name: 'Grace W.',
                place: 'Appliance dealer, Thika',
                initials: 'GW',
                color: 'from-emerald-600 to-cyan-500',
              },
              {
                quote:
                  'The dashboard shows me my commission in real time. I can see which customers are active and plan my month around it.',
                name: 'James O.',
                place: 'Service centre, Kisumu',
                initials: 'JO',
                color: 'from-violet-600 to-purple-500',
              },
            ].map(({ quote, name, place, initials, color }) => (
              <blockquote
                key={name}
                className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400 transition-transform duration-200 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} aria-hidden />
                  ))}
                </div>
                <p className="flex-1 text-base leading-relaxed text-slate-300">{quote}</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-white shadow-lg`}
                    aria-hidden
                  >
                    {initials}
                  </div>
                  <cite className="not-italic">
                    <span className="block text-base font-semibold text-white">{name}</span>
                    <span className="text-sm text-slate-500">{place}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA + Contact */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900/40 via-[#121826] to-[#0f1419] shadow-2xl">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" aria-hidden />

            <div className="relative p-8 sm:p-12 lg:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-500/20 ring-1 ring-primary-500/30 shadow-xl shadow-primary-900/40">
                  <Store className="h-10 w-10 text-primary-400" aria-hidden />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready to register your outlet?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-400">
                  Two steps online — your business details, then your outlet. You'll receive a sales-agent
                  account to create policies, track activity, and earn commissions from day one.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={onRegister}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/40 transition-all duration-200 hover:shadow-2xl hover:shadow-primary-900/50 hover:brightness-110 active:scale-[0.98]"
                  >
                    Register your outlet
                    <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </button>
                  <a
                    href={`tel:${SUPPORT_TEL}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                  >
                    <PhoneCall className="h-5 w-5 text-primary-300" aria-hidden />
                    {SUPPORT_TEL_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="relative mx-auto mt-16 grid max-w-5xl gap-8 border-t border-white/10 pt-12 md:grid-cols-2 lg:gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-white">Contact us</h3>
                  <div className="mt-6 space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20">
                        <PhoneCall className="h-5 w-5 text-primary-400" aria-hidden />
                      </div>
                      <div>
                        <a href={`tel:${SUPPORT_TEL}`} className="text-base font-semibold text-white transition-colors duration-200 hover:text-primary-300">
                          {SUPPORT_TEL_DISPLAY}
                        </a>
                        <p className="mt-1 text-sm text-slate-500">Mon–Fri, 8am–6pm EAT</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20">
                        <MessageCircle className="h-5 w-5 text-primary-400" aria-hidden />
                      </div>
                      <div>
                        <a
                          href={`mailto:${BRAND_EMAIL}`}
                          className="text-base font-semibold text-white transition-colors duration-200 hover:text-primary-300"
                        >
                          {BRAND_EMAIL}
                        </a>
                        <p className="mt-1 text-sm text-slate-500">We reply within one business day</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    {[
                      'Sales-agent account included',
                      'Commission on every active policy',
                      'M-Pesa &amp; bank payment support',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-400">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm lg:p-8">
                  <p className="text-lg font-semibold text-white">Quick message</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Have a question before registering? Drop us a message and we will get back to you.
                  </p>
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      className="w-full rounded-xl border border-white/15 bg-[#0b0f1a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we help?"
                      className="w-full resize-none rounded-xl border border-white/15 bg-[#0b0f1a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-primary-500/20 py-3 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/30 transition-all duration-200 hover:bg-primary-500/30 hover:ring-primary-500/40"
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#07090f] py-12">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={onBack}
              className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
            >
              <img src="/coverkit-icon.png" alt="" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105" aria-hidden="true" />
              <span className="text-base font-bold tracking-tight text-white">{BRAND_NAME}</span>
            </button>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500" aria-label="Footer navigation">
              <a href="#benefits" className="transition-colors duration-200 hover:text-slate-300">Benefits</a>
              <a href="#commissions" className="transition-colors duration-200 hover:text-slate-300">Commissions</a>
              <a href="#how-it-works" className="transition-colors duration-200 hover:text-slate-300">How it works</a>
              <button type="button" onClick={onBack} className="border-0 bg-transparent p-0 transition-colors duration-200 hover:text-slate-300">For customers</button>
              <a href={`tel:${SUPPORT_TEL}`} className="transition-colors duration-200 hover:text-slate-300">
                {SUPPORT_TEL_DISPLAY}
              </a>
              <a href={`mailto:${BRAND_EMAIL}`} className="transition-colors duration-200 hover:text-slate-300">
                {BRAND_EMAIL}
              </a>
            </nav>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <p className="text-xs leading-relaxed text-slate-600">
              &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
              Insurance products are subject to applicable terms and conditions.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default BecomeOutletPage;
