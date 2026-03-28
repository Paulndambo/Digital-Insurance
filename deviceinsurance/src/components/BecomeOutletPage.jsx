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
  Home,
  ClipboardCheck,
  Menu,
  X,
  BadgePercent,
  BarChart3,
  Handshake,
  LogIn,
} from 'lucide-react';
import { BRAND_NAME, BRAND_EMAIL } from '../constants/branding';

const SUPPORT_TEL = '+254745491093';
const SUPPORT_TEL_DISPLAY = '0745 491 093';

const Container = ({ children, className = '' }) => (
  <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:max-w-4xl">
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 lg:text-sm">
        {eyebrow}
      </p>
    )}
    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-sm text-slate-400 sm:text-base md:text-lg lg:text-xl">{description}</p>
    )}
  </div>
);

const BecomeOutletPage = ({ onBack, onRegister, onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#0b0f1a] text-white">

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0f1a]/90 backdrop-blur-xl">
        <Container className="flex items-center justify-between py-3.5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="Back to home"
          >
            <img
              src="/coverkit-icon.png"
              alt=""
              className="h-9 w-9 object-contain lg:h-10 lg:w-10"
              aria-hidden="true"
            />
            <span className="text-base font-bold tracking-tight text-white lg:text-lg">{BRAND_NAME}</span>
          </button>

          <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Outlet page navigation">
            <a href="#benefits" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              Benefits
            </a>
            <a href="#commissions" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              Commissions
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              How it works
            </a>
            <button
              type="button"
              onClick={onBack}
              className="border-0 bg-transparent p-0 text-sm font-medium text-slate-400 transition hover:text-white lg:text-base"
            >
              For customers
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${SUPPORT_TEL}`}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-white lg:text-base"
            >
              <PhoneCall className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden />
              {SUPPORT_TEL_DISPLAY}
            </a>
            {onLoginClick && (
              <button
                type="button"
                onClick={onLoginClick}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.09] lg:px-5 lg:py-2.5 lg:text-base"
              >
                <LogIn className="h-4 w-4" aria-hidden />
                Log in
              </button>
            )}
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 lg:px-5 lg:py-2.5 lg:text-base"
            >
              Register outlet
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </Container>

        {mobileMenuOpen && (
          <div className="border-t border-white/[0.06] bg-[#0d1220] md:hidden">
            <Container className="flex flex-col gap-0.5 py-3">
              {[
                { href: '#benefits', label: 'Benefits' },
                { href: '#commissions', label: 'Commissions' },
                { href: '#how-it-works', label: 'How it works' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onBack(); }}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                For customers
              </button>
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <PhoneCall className="h-4 w-4 text-primary-400" aria-hidden />
                  {SUPPORT_TEL_DISPLAY}
                </a>
                {onLoginClick && (
                  <button
                    type="button"
                    onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}
                    className="mx-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.09]"
                  >
                    <LogIn className="h-4 w-4" aria-hidden />
                    Log in
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onRegister(); }}
                  className="mx-4 flex items-center justify-center gap-2 rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
                >
                  <Store className="h-4 w-4" aria-hidden />
                  Register your outlet
                </button>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 65% at 50% -15%, rgba(26,137,255,0.24), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(74,222,128,0.07), transparent 50%), radial-gradient(ellipse 40% 30% at 0% 90%, rgba(26,137,255,0.07), transparent 50%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.025%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" aria-hidden />

        <Container className="relative py-16 sm:py-20 lg:py-28 xl:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16 xl:gap-24">
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm sm:text-sm lg:text-base lg:px-4 lg:py-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" aria-hidden />
                For shops, dealers &amp; service points
              </div>

              {/* Headline */}
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem]">
                <span className="text-white">Become a recognised</span>
                <br />
                <span className="gradient-text">device outlet partner.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl xl:text-2xl xl:max-w-2xl">
                Register your business with {BRAND_NAME} to offer household-item cover where customers
                already buy or repair devices — and earn commissions on every policy sold.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10">
                <button
                  type="button"
                  onClick={onRegister}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/40 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 active:scale-[0.98] lg:px-8 lg:py-4 lg:text-lg"
                >
                  Register your outlet
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/[0.07] lg:px-8 lg:py-4 lg:text-lg"
                >
                  <PhoneCall className="h-5 w-5 text-primary-400" aria-hidden />
                  Talk to us
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 lg:text-base">
                {[
                  'Earn commissions per policy',
                  'Online digital tools included',
                  'Dedicated partner support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90 lg:h-5 lg:w-5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Earnings preview card */}
            <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-primary-500/25 via-transparent to-emerald-500/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#121826] shadow-2xl shadow-black/60">
                <div className="border-b border-white/[0.07] px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/30">
                        <DollarSign className="h-4 w-4 text-emerald-400" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Example earnings</p>
                        <p className="text-xs text-slate-500">Per policy commission</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                      Monthly
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-white/[0.04] px-6">
                  {[
                    { label: '5 policies/month', premium: 5000, commission: 500, pct: 30 },
                    { label: '15 policies/month', premium: 15000, commission: 1500, pct: 55 },
                    { label: '30 policies/month', premium: 30000, commission: 3000, pct: 80 },
                  ].map(({ label, premium, commission, pct }) => (
                    <div key={label} className="py-4">
                      <div className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="text-slate-400">
                          {label}
                          <span className="ml-1 text-xs text-slate-600">(KES {premium.toLocaleString()} premiums)</span>
                        </span>
                        <span className="shrink-0 font-semibold text-emerald-400">+KES {commission.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                          style={{ width: `${pct}%` }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.025] px-6 py-4">
                  <p className="text-xs text-slate-500">
                    Illustrative only — actual commission rates are confirmed during onboarding.
                  </p>
                  <button
                    type="button"
                    onClick={onRegister}
                    className="mt-3 w-full rounded-xl bg-primary-500/15 py-2.5 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/20 transition hover:bg-primary-500/25"
                  >
                    Start earning →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats band ── */}
      <section className="border-b border-white/[0.06] bg-white/[0.015] py-10 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:gap-12">
            {[
              { value: '~10%', label: 'Commission per policy', icon: BadgePercent },
              { value: 'Online', label: 'Digital-first tools', icon: Zap },
              { value: '2-step', label: 'Simple registration', icon: ClipboardCheck },
              { value: 'M-Pesa', label: 'Kenya-native payments', icon: Wallet },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left lg:gap-4">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 sm:flex lg:h-12 lg:w-12">
                  <Icon className="h-5 w-5 text-primary-400 lg:h-6 lg:w-6" aria-hidden />
                </div>
                <Icon className="h-4 w-4 text-primary-400 sm:hidden" aria-hidden />
                <div>
                  <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm lg:text-base">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Core benefits ── */}
      <section className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20" id="benefits">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
            {[
              {
                icon: Store,
                title: 'Trusted at the counter',
                body: 'Your outlet appears in our partner network so customers know cover is available from a real shop or workshop they already use.',
              },
              {
                icon: Zap,
                title: 'Digital-first flow',
                body: 'Guided purchase on the web or app means less paperwork for you and a consistent experience for every policyholder.',
              },
              {
                icon: Headphones,
                title: 'Support when you need it',
                body: `Reach our team on ${SUPPORT_TEL_DISPLAY} or email — for product questions so you can answer buyers and claimants with confidence.`,
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-primary-500/30 hover:bg-white/[0.05] lg:p-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20 transition group-hover:bg-primary-500/20 lg:h-14 lg:w-14">
                  <Icon className="h-5 w-5 text-primary-400 lg:h-7 lg:w-7" aria-hidden />
                </div>
                <h3 className="font-semibold text-white lg:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 lg:text-base">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Commissions section ── */}
      <section
        className="bg-white/[0.02] py-12 sm:py-16 lg:py-20"
        id="commissions"
      >
        <Container>
          <SectionTitle
            eyebrow="Commissions &amp; earnings"
            title="Grow with every policy sold"
            description="When you help customers protect their household items, you earn a commission on every active policy — paid out on a clear, transparent schedule."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {[
              {
                icon: BadgePercent,
                title: 'Commission on every sale',
                body: 'Earn a percentage of each policy premium for every customer you help enrol. The more policies you activate, the more you earn — with no ceiling.',
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
                className="group rounded-2xl border border-white/[0.07] bg-[#0f1419] p-6 transition hover:border-white/[0.14] hover:bg-[#121826] lg:p-8"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md transition group-hover:scale-105 lg:h-12 lg:w-12`}
                >
                  <Icon className="h-5 w-5 text-white lg:h-6 lg:w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-white lg:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 lg:text-base">{body}</p>
              </div>
            ))}
          </div>

          {/* Illustrative commission table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121826] lg:mt-14">
            <div className="border-b border-white/[0.07] px-6 py-4">
              <p className="text-sm font-semibold text-white lg:text-base">Commission illustration</p>
              <p className="text-xs text-slate-500 lg:text-sm">Based on a ~10% illustrative rate — actual rates confirmed at onboarding</p>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {[
                { policies: 5, avgPremium: 1000, totalPremiums: 5000, commission: 500 },
                { policies: 15, avgPremium: 1000, totalPremiums: 15000, commission: 1500 },
                { policies: 30, avgPremium: 1200, totalPremiums: 36000, commission: 3600 },
                { policies: 60, avgPremium: 1200, totalPremiums: 72000, commission: 7200 },
              ].map(({ policies, totalPremiums, commission }) => (
                <div key={policies} className="grid grid-cols-3 px-6 py-3.5 text-sm">
                  <span className="text-slate-400">{policies} active policies</span>
                  <span className="text-center text-slate-500">KES {totalPremiums.toLocaleString()} premiums</span>
                  <span className="text-right font-semibold text-emerald-400">KES {commission.toLocaleString()}/mo</span>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] px-6 py-3">
              <p className="text-xs text-slate-600">Illustrative only. Premiums, rates, and payment schedules explained at onboarding.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How it works for outlets ── */}
      <section
        className="border-y border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24"
        id="how-it-works"
      >
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="From registration to first commission"
            description="Two simple steps to get your outlet onboarded — then a sales-agent account to manage everything."
          />

          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 lg:block"
              aria-hidden
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
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
                <div key={title} className="group relative text-center">
                  <div className="relative mx-auto mb-5 inline-flex">
                    <div
                      className={`flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-xl ring-4 ring-[#0b0f1a] transition group-hover:scale-105 lg:h-20 lg:w-20`}
                    >
                      <Icon className="h-7 w-7 text-white lg:h-9 lg:w-9" aria-hidden />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2332] text-[10px] font-bold text-primary-300 ring-2 ring-primary-500/40 lg:h-7 lg:w-7 lg:text-xs">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white lg:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 lg:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 lg:px-9 lg:py-4 lg:text-base"
            >
              Start registration now
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
            </button>
          </div>
        </Container>
      </section>

      {/* ── Why become a partner ── */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24">
        <Container>
          <SectionTitle
            eyebrow="Why partner with us"
            title="Built for outlet operators like you"
            description="Less friction, more revenue — tools that fit into how you already serve customers."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
                text: `Phone and email support during business hours — so you can confidently answer any customer question.`,
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
                className="group rounded-2xl border border-white/[0.07] bg-[#0f1419] p-6 transition hover:border-white/[0.14] hover:bg-[#121826] lg:p-8"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md transition group-hover:scale-105 lg:h-12 lg:w-12`}
                >
                  <Icon className="h-5 w-5 text-white lg:h-6 lg:w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-white lg:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 lg:text-base">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <SectionTitle
            eyebrow="Partner voices"
            title="What outlet owners say"
            description={`Feedback from shops and service points already partnered with ${BRAND_NAME}.`}
          />
          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
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
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-white/[0.14] hover:bg-white/[0.05] lg:p-8"
              >
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 lg:h-5 lg:w-5" aria-hidden />
                  ))}
                </div>
                <div className="mb-1 select-none font-serif text-5xl leading-none text-primary-500/25 lg:text-6xl">
                  &ldquo;
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-300 lg:text-base xl:text-lg">{quote}</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-xs font-bold text-white shadow-md lg:h-11 lg:w-11 lg:text-sm`}
                    aria-hidden
                  >
                    {initials}
                  </div>
                  <cite className="not-italic">
                    <span className="block text-sm font-semibold text-white lg:text-base">{name}</span>
                    <span className="text-xs text-slate-500 lg:text-sm">{place}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA + Contact ── */}
      <section className="border-t border-white/[0.06] pb-20 pt-16 sm:pb-24 sm:pt-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-primary-500/25 bg-gradient-to-br from-primary-900/60 via-[#121826] to-[#0f1419] p-8 shadow-2xl shadow-black/40 sm:p-10 md:p-14">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[480px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl text-center lg:max-w-4xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/20 ring-1 ring-primary-500/30 shadow-lg shadow-primary-900/40 lg:h-20 lg:w-20">
                <Store className="h-8 w-8 text-primary-400 lg:h-10 lg:w-10" aria-hidden />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Ready to register your outlet?
              </h2>
              <p className="mt-4 text-slate-400 lg:text-lg xl:text-xl">
                Two steps online — your business details, then your outlet. You'll receive a sales-agent
                account to create policies, track activity, and earn commissions from day one.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onRegister}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 lg:px-10 lg:py-4 lg:text-lg"
                >
                  Register your outlet
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10 lg:px-10 lg:py-4 lg:text-lg"
                >
                  <PhoneCall className="h-5 w-5 text-primary-300" aria-hidden />
                  {SUPPORT_TEL_DISPLAY}
                </a>
              </div>
            </div>

            <div className="relative mx-auto mt-14 grid w-full max-w-6xl gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-2 md:gap-12 xl:max-w-none">
              <div>
                <h3 className="text-lg font-semibold text-white lg:text-2xl">Contact</h3>
                <ul className="mt-4 space-y-4 text-sm text-slate-400 lg:text-base">
                  <li className="flex gap-3">
                    <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-primary-400 lg:h-6 lg:w-6" aria-hidden />
                    <span>
                      <a href={`tel:${SUPPORT_TEL}`} className="font-medium text-white hover:text-primary-300">
                        {SUPPORT_TEL_DISPLAY}
                      </a>
                      <span className="block text-xs text-slate-500 lg:text-sm">Mon–Fri, 8am–6pm EAT</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-400 lg:h-6 lg:w-6" aria-hidden />
                    <span>
                      <a
                        href={`mailto:${BRAND_EMAIL}`}
                        className="font-medium text-white hover:text-primary-300"
                      >
                        {BRAND_EMAIL}
                      </a>
                      <span className="block text-xs text-slate-500 lg:text-sm">We reply within one business day</span>
                    </span>
                  </li>
                </ul>

                <ul className="mt-8 space-y-2">
                  {[
                    'Sales-agent account included',
                    'Commission on every active policy',
                    'M-Pesa &amp; bank payment support',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400 lg:text-base">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/80 lg:h-5 lg:w-5" aria-hidden />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-6 lg:p-8">
                <p className="text-sm font-semibold text-white lg:text-lg">Quick message</p>
                <p className="mt-1 text-xs text-slate-500 lg:text-sm">
                  Have a question before registering? Drop us a message and we will get back to you.
                </p>
                <form
                  className="mt-5 space-y-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className="w-full rounded-xl border border-white/15 bg-[#0b0f1a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/40"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-white/15 bg-[#0b0f1a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/40"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary-500/15 py-3 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/25 transition hover:bg-primary-500/25"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#07090f] py-10 sm:py-12">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <img src="/coverkit-icon.png" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
              <span className="text-sm font-bold tracking-tight text-white">{BRAND_NAME}</span>
            </div>

            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500"
              aria-label="Footer navigation"
            >
              <a href="#benefits" className="transition hover:text-slate-300">Benefits</a>
              <a href="#commissions" className="transition hover:text-slate-300">Commissions</a>
              <a href="#how-it-works" className="transition hover:text-slate-300">How it works</a>
              <button type="button" onClick={onBack} className="transition hover:text-slate-300 border-0 bg-transparent p-0">For customers</button>
              <a href={`tel:${SUPPORT_TEL}`} className="transition hover:text-slate-300">
                {SUPPORT_TEL_DISPLAY}
              </a>
              <a href={`mailto:${BRAND_EMAIL}`} className="transition hover:text-slate-300">
                {BRAND_EMAIL}
              </a>
            </nav>
          </div>

          <div className="mt-8 border-t border-white/[0.05] pt-6">
            <p className="text-xs text-slate-600">
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
