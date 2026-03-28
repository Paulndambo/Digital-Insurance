import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import {
  Shield,
  Zap,
  Clock,
  ChevronRight,
  Lock,
  FileText,
  Home,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  DollarSign,
  Star,
  Wallet,
  ClipboardCheck,
  Headphones,
  Calculator,
  ArrowRight,
  TrendingUp,
  Menu,
  X,
  LogIn,
} from 'lucide-react';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';
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

const DEVICE_CATEGORIES = [
  { id: 'all', label: 'All items' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'appliance', label: 'Appliances' },
  { id: 'other', label: 'Other' },
];

const LandingPage = ({ onGetStarted, onRequestQuote, onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDevices =
    activeCategory === 'all' ? devices : devices.filter((d) => d.group === activeCategory);

  return (
    <div className="bg-[#0b0f1a] text-white">

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0f1a]/90 backdrop-blur-xl">
        <Container className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-2.5">
            <img
              src="/coverkit-icon.png"
              alt=""
              className="h-9 w-9 object-contain lg:h-10 lg:w-10"
              aria-hidden="true"
            />
            <span className="text-base font-bold tracking-tight text-white lg:text-lg">{BRAND_NAME}</span>
          </div>

          <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Main navigation">
            <a href="#coverage" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              Coverage
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              How it works
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-400 transition hover:text-white lg:text-base">
              Pricing
            </a>
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
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 lg:px-5 lg:py-2.5 lg:text-base"
            >
              Get started
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
                { href: '#coverage', label: 'Coverage' },
                { href: '#how-it-works', label: 'How it works' },
                { href: '#pricing', label: 'Pricing' },
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
                  onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
                  className="mx-4 rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
                >
                  Start a policy
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
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.025%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

        <Container className="relative py-16 sm:py-20 lg:py-28 xl:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-16 xl:gap-24">
            <div>
              {/* Animated badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm sm:text-sm lg:text-base lg:px-4 lg:py-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" aria-hidden />
                Household items insurance — online, start to finish
              </div>

              {/* Headline */}
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem]">
                <span className="text-white">Insurance for the things</span>
                <br />
                <span className="gradient-text">that keep your home running.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl xl:text-2xl xl:max-w-2xl">
                {BRAND_NAME} covers household items — appliances, home electronics, furniture, and other
                essentials you use every day — with clear premiums, digital policy documents, and a guided
                purchase flow from quote to payment.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/40 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 active:scale-[0.98] lg:px-8 lg:py-4 lg:text-lg"
                >
                  Start a policy
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                {onRequestQuote && (
                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-7 py-3.5 text-base font-semibold text-slate-100 transition hover:border-white/25 hover:bg-white/[0.09] active:scale-[0.98] lg:px-8 lg:py-4 lg:text-lg"
                  >
                    <Calculator className="h-5 w-5 text-primary-400" aria-hidden />
                    Request a quote
                  </button>
                )}
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/[0.07] lg:px-8 lg:py-4 lg:text-lg"
                >
                  <PhoneCall className="h-5 w-5 text-primary-400" aria-hidden />
                  Call {SUPPORT_TEL_DISPLAY}
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 lg:text-base">
                {[
                  'M-Pesa & bank-friendly payment',
                  'File claims from your dashboard',
                  'See premium before you pay',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90 lg:h-5 lg:w-5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium preview card */}
            <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-primary-500/25 via-transparent to-emerald-500/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#121826] shadow-2xl shadow-black/60">
                <div className="border-b border-white/[0.07] px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15 ring-1 ring-primary-500/30">
                        <Shield className="h-4 w-4 text-primary-400" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Example premiums</p>
                        <p className="text-xs text-slate-500">Based on declared value</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                      ~1% rate
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-white/[0.04] px-6">
                  {[
                    { label: 'Refrigerator', value: 85000, premium: 850, pct: 55 },
                    { label: 'Television', value: 45000, premium: 450, pct: 30 },
                    { label: 'Washing Machine', value: 120000, premium: 1200, pct: 80 },
                  ].map(({ label, value, premium, pct }) => (
                    <div key={label} className="py-4">
                      <div className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="text-slate-400">
                          {label}
                          <span className="ml-1 text-xs text-slate-600">({formatCurrency(value)})</span>
                        </span>
                        <span className="shrink-0 font-semibold text-white">{formatCurrency(premium)}/mo</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
                          style={{ width: `${pct}%` }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.025] px-6 py-4">
                  <p className="text-xs text-slate-500">
                    Illustrative only — your quote depends on the plan and item details you select in the flow.
                  </p>
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="mt-3 w-full rounded-xl bg-primary-500/15 py-2.5 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/20 transition hover:bg-primary-500/25"
                  >
                    Get your exact premium →
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
              { value: '~1%', label: 'Monthly premium rate', icon: TrendingUp },
              { value: '12', label: 'Item categories', icon: Shield },
              { value: '5', label: 'Steps to active cover', icon: CheckCircle2 },
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

      {/* ── Local trust cards ── */}
      <section className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
            {[
              {
                icon: Wallet,
                title: 'Kenya-ready payments',
                body: 'Pay the way you already do — including M-Pesa and bank debit where available.',
              },
              {
                icon: ClipboardCheck,
                title: 'Clear policy journey',
                body: 'Step-by-step: item details, plan choice, beneficiary, then payment — all in one place.',
              },
              {
                icon: Headphones,
                title: 'Human support',
                body: `Questions? Reach us on ${SUPPORT_TEL_DISPLAY} or email — we respond on business days.`,
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

      {/* ── Coverage ── */}
      <section className="py-16 sm:py-20 md:py-24" id="coverage">
        <Container>
          <SectionTitle
            eyebrow="Coverage"
            title="Household items you can insure"
            description="Appliances, home electronics, furniture, and more — pick a category in the purchase flow; pricing and cover follow the plan you choose."
          />

          {/* Category filter */}
          <div className="mb-7 flex flex-wrap justify-center gap-2 sm:mb-10">
            {DEVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition lg:px-5 lg:py-2 lg:text-base ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-900/30'
                    : 'border border-white/[0.1] bg-white/[0.04] text-slate-400 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:gap-5 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredDevices.map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.id}
                  className="group cursor-default rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-lg hover:shadow-black/20 lg:p-6"
                >
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${device.color} shadow-md transition group-hover:scale-110 sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
                  >
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8" aria-hidden />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-white sm:text-base lg:text-lg">
                    {device.name}
                  </h3>
                  <p className="mt-1 text-center text-xs capitalize text-slate-500 lg:text-sm">{device.group}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section
        className="border-y border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24"
        id="how-it-works"
      >
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="From quote to active cover in a few steps"
            description="No paperwork queues — complete everything in your browser."
          />

          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 lg:block"
              aria-hidden
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
              {[
                {
                  title: 'Choose item type',
                  text: 'Select a household category — electronics, appliances, furniture, or another supported item.',
                  icon: Home,
                  color: 'from-blue-600 to-primary-500',
                },
                {
                  title: 'Tell us about it',
                  text: 'Description, value, purchase date, and identifiers like serial numbers or IMEI where relevant.',
                  icon: FileText,
                  color: 'from-primary-600 to-primary-400',
                },
                {
                  title: 'Pick a plan',
                  text: 'See premium and cover options from live pricing — then add beneficiary details.',
                  icon: DollarSign,
                  color: 'from-violet-600 to-primary-500',
                },
                {
                  title: 'Pay & go',
                  text: 'Complete payment details; your policy is recorded and visible in your dashboard.',
                  icon: Shield,
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
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 lg:px-9 lg:py-4 lg:text-base"
            >
              Start the flow now
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
            </button>
          </div>
        </Container>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 sm:py-20 md:py-24" id="pricing">
        <Container>
          <SectionTitle
            eyebrow="Pricing"
            title="Premiums tied to what your item is worth"
            description="Rates depend on the plan you select in the flow — below are simple examples to set expectations."
          />

          <div className="mx-auto grid w-full max-w-none gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {[
              {
                label: 'Starter',
                value: 20000,
                premium: 200,
                note: 'Lower-value items',
                highlight: false,
                features: ['Basic item cover', 'Digital policy doc', 'Dashboard access'],
              },
              {
                label: 'Everyday',
                value: 100000,
                premium: 1000,
                note: 'Typical major appliance or furnishing',
                highlight: true,
                features: [
                  'Full item cover',
                  'Digital policy doc',
                  'Dashboard access',
                  'Claims support',
                ],
              },
              {
                label: 'Premium',
                value: 200000,
                premium: 2000,
                note: 'Higher-value household items',
                highlight: false,
                features: [
                  'Full item cover',
                  'Digital policy doc',
                  'Dashboard access',
                  'Priority claims',
                ],
              },
            ].map(({ label, value, premium, note, highlight, features }) => (
              <div
                key={label}
                className={`relative flex flex-col rounded-2xl border p-6 transition sm:p-7 lg:p-8 xl:p-10 ${
                  highlight
                    ? 'border-primary-500/50 bg-primary-500/[0.07] shadow-xl shadow-primary-900/20 ring-1 ring-primary-500/30'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14]'
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md lg:text-xs">
                    Most popular
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 lg:text-sm">{label}</p>
                <p className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{formatCurrency(value)}</p>
                <p className="text-xs text-slate-500 lg:text-sm">Declared value (example)</p>

                <div className="my-5 h-px bg-white/[0.07]" />

                <p
                  className={`text-2xl font-bold sm:text-3xl lg:text-4xl ${
                    highlight ? 'text-primary-300' : 'text-white'
                  }`}
                >
                  {formatCurrency(premium)}
                </p>
                <p className="text-sm text-slate-400 lg:text-base">per month (illustrative)</p>

                <ul className="mt-5 flex-1 space-y-2.5 lg:space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300 lg:text-base">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 lg:h-5 lg:w-5 ${
                          highlight ? 'text-primary-400' : 'text-emerald-400/70'
                        }`}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onGetStarted}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition lg:py-4 lg:text-base ${
                    highlight
                      ? 'bg-primary-500 text-white hover:bg-primary-400'
                      : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Illustrative examples only. Actual premiums depend on plan, item type, and declared value.
          </p>
        </Container>
      </section>

      {/* ── Why CoverKit ── */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24">
        <Container>
          <SectionTitle
            eyebrow={`Why ${BRAND_NAME}`}
            title="An experience shaped for household cover"
            description="Less noise, more clarity — so you know what you are buying."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[
              {
                icon: Zap,
                title: 'Fast setup',
                text: 'Complete purchase online; see confirmation and policy reference without waiting on paper post.',
                color: 'from-amber-500 to-orange-400',
              },
              {
                icon: Shield,
                title: 'Purpose-built flow',
                text: 'Screens match real household items — value, purchase details, and identifiers (e.g. serial or IMEI) where relevant.',
                color: 'from-primary-600 to-primary-400',
              },
              {
                icon: Clock,
                title: 'Claims when you need them',
                text: 'Logged-in customers can start a claim from the dashboard with policy and outlet context.',
                color: 'from-cyan-600 to-blue-400',
              },
              {
                icon: DollarSign,
                title: 'Transparent math',
                text: 'Premium comes from the plan and values you enter — review before you commit.',
                color: 'from-emerald-600 to-green-400',
              },
              {
                icon: MessageCircle,
                title: 'Reachable team',
                text: 'Phone and email for sales and service questions during published hours.',
                color: 'from-violet-600 to-purple-400',
              },
              {
                icon: Lock,
                title: 'Security-minded',
                text: 'Your session and submissions are handled with standard web security practices.',
                color: 'from-rose-600 to-red-400',
              },
            ].map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/[0.07] bg-[#0f1419] p-6 transition hover:border-white/[0.14] hover:bg-[#121826] lg:p-8"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md transition group-hover:scale-105 lg:h-13 lg:w-13`}
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
            eyebrow="Customers"
            title="What people say about the experience"
            description={`Real feedback from policyholders using ${BRAND_NAME}.`}
          />
          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {[
              {
                quote:
                  'I insured our fridge in one sitting. The steps were clear and I could see the premium before paying.',
                name: 'John M.',
                place: 'Nairobi',
                initials: 'JM',
                color: 'from-blue-600 to-primary-500',
              },
              {
                quote:
                  'Finally a flow that asks for the right household item details instead of a one-size-fits-all form.',
                name: 'Sarah A.',
                place: 'Kisumu',
                initials: 'SA',
                color: 'from-emerald-600 to-cyan-500',
              },
              {
                quote:
                  'Support picked up when I had a question about M-Pesa billing. Felt straightforward.',
                name: 'David K.',
                place: 'Mombasa',
                initials: 'DK',
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
                <Shield className="h-8 w-8 text-primary-400 lg:h-10 lg:w-10" aria-hidden />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Ready to cover your household items?
              </h2>
              <p className="mt-4 text-slate-400 lg:text-lg xl:text-xl">
                Start the purchase flow — or call us if you prefer to walk through home cover options
                with someone on the team.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 lg:px-10 lg:py-4 lg:text-lg"
                >
                  Begin purchase
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
                    'Digital policy documents',
                    'Dashboard claims filing',
                    'M-Pesa & bank payment support',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400 lg:text-base">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/80 lg:h-5 lg:w-5" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-6 lg:p-8">
                <p className="text-sm font-semibold text-white lg:text-lg">Quick message</p>
                <p className="mt-1 text-xs text-slate-500 lg:text-sm">
                  For policy changes or claims, sign in and use your dashboard for the fastest route.
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
              <a href="#coverage" className="transition hover:text-slate-300">Coverage</a>
              <a href="#how-it-works" className="transition hover:text-slate-300">How it works</a>
              <a href="#pricing" className="transition hover:text-slate-300">Pricing</a>
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

export default LandingPage;
