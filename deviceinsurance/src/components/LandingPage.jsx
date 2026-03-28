import React from 'react';
import {
  Shield,
  Zap,
  Clock,
  ChevronRight,
  Lock,
  FileText,
  Smartphone,
  BadgeCheck,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  DollarSign,
  Star,
  Wallet,
  ClipboardCheck,
  Headphones,
  Calculator,
} from 'lucide-react';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';
import { BRAND_NAME, BRAND_EMAIL } from '../constants/branding';

const SUPPORT_TEL = '+254745491093';
const SUPPORT_TEL_DISPLAY = '0745 491 093';

/** Full-bleed horizontal space on large viewports; only padding caps edge distance */
const Container = ({ children, className = '' }) => (
  <div
    className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 ${className}`}
  >
    {children}
  </div>
);

const sectionTitle = (eyebrow, title, description) => (
  <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">{eyebrow}</p>
    )}
    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{title}</h2>
    {description && (
      <p className="mt-3 text-sm text-slate-400 sm:text-base md:text-lg">{description}</p>
    )}
  </div>
);

const LandingPage = ({ onGetStarted, onRequestQuote }) => {
  return (
    <div className="bg-[#0b0f1a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(26,137,255,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(74,222,128,0.06), transparent 50%), linear-gradient(180deg, #0b0f1a 0%, #0f1419 100%)',
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

        <Container className="relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm sm:text-sm">
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary-400" aria-hidden />
                <span>Gadget &amp; device insurance — online, start to finish</span>
              </div>

              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Cover the tech you rely on every day.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {BRAND_NAME} helps you insure phones, laptops, appliances, and more with clear premiums,
                digital policy documents, and a guided purchase flow — built for how you actually use your devices.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-900/40 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 active:scale-[0.98] sm:min-h-0"
                >
                  Start a policy
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                {onRequestQuote && (
                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-white/25 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 active:scale-[0.98] sm:min-h-0"
                  >
                    <Calculator className="h-5 w-5 text-primary-400" aria-hidden />
                    Request a quote
                  </button>
                )}
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-base font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 sm:min-h-0"
                >
                  <PhoneCall className="h-5 w-5 text-primary-400" aria-hidden />
                  Call {SUPPORT_TEL_DISPLAY}
                </a>
              </div>

              <ul className="mt-10 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden />
                  M-Pesa &amp; bank-friendly payment options
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden />
                  File claims from your account dashboard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden />
                  No jargon — see cover and premium before you pay
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 via-transparent to-emerald-500/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#121826] p-8 shadow-2xl shadow-black/50 sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Example</p>
                    <p className="mt-1 text-lg font-semibold text-white">Monthly premium</p>
                    <p className="mt-1 text-sm text-slate-400">Based on device value you enter</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 ring-1 ring-primary-500/30">
                    <Shield className="h-6 w-6 text-primary-400" aria-hidden />
                  </div>
                </div>
                <div className="mt-8 space-y-4 border-t border-white/[0.06] pt-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Phone worth {formatCurrency(85000)}</span>
                    <span className="font-semibold text-white">~{formatCurrency(850)}/mo</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary-500 to-primary-400" />
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Illustrative only — your quote depends on the plan and device details you select in the flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Local / product trust */}
      <section className="border-b border-white/[0.06] py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Wallet,
                title: 'Kenya-ready payments',
                body: 'Pay the way you already do — including M-Pesa and bank debit where available.',
              },
              {
                icon: ClipboardCheck,
                title: 'Clear policy journey',
                body: 'Step-by-step purchase: device details, plan choice, beneficiary, then payment — all in one place.',
              },
              {
                icon: Headphones,
                title: 'Human support',
                body: `Questions? Reach us on ${SUPPORT_TEL_DISPLAY} or email — we respond on business days.`,
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-white/[0.12]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20">
                  <Icon className="h-5 w-5 text-primary-400" aria-hidden />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What you can insure */}
      <section className="py-16 sm:py-20 md:py-24" id="coverage">
        <Container>
          {sectionTitle(
            'Coverage',
            'Insure the devices and items that matter',
            'Pick your category in the purchase flow — pricing and cover follow the plan you choose.'
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.id}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/[0.14] hover:bg-white/[0.05] sm:p-5"
                >
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${device.color} shadow-lg transition group-hover:scale-105 sm:h-14 sm:w-14`}
                  >
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" aria-hidden />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-white sm:text-base">{device.name}</h3>
                  <p className="mt-1 text-center text-xs text-slate-500">In purchase flow</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24">
        <Container>
          {sectionTitle(
            'How it works',
            'From quote to active cover in a few steps',
            'No paperwork queues — complete everything in your browser.'
          )}
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div
              className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/25 to-primary-500/0 lg:block"
              aria-hidden
            />
            {[
              {
                step: '1',
                title: 'Choose device type',
                text: 'Select phone, laptop, appliance, or another supported item.',
                icon: Smartphone,
              },
              {
                step: '2',
                title: 'Tell us about it',
                text: 'Model, value, purchase date, and optional serial / IMEI where relevant.',
                icon: FileText,
              },
              {
                step: '3',
                title: 'Pick a plan',
                text: 'See premium and cover options from live pricing — then add beneficiary details.',
                icon: DollarSign,
              },
              {
                step: '4',
                title: 'Pay & go',
                text: 'Complete payment details; your policy is recorded and visible in your dashboard.',
                icon: Shield,
              },
            ].map(({ step, title, text, icon: Icon }) => (
              <div key={step} className="relative text-center lg:pt-2">
                <div className="relative mx-auto mb-4 inline-flex">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-lg shadow-primary-900/30 ring-4 ring-[#0f1419] lg:h-16 lg:w-16">
                    <Icon className="h-7 w-7 text-white" aria-hidden />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2332] text-xs font-bold text-primary-300 ring-2 ring-primary-500/40">
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing snapshot */}
      <section className="py-16 sm:py-20 md:py-24" id="pricing">
        <Container>
          {sectionTitle(
            'Pricing',
            'Premiums tied to what your item is worth',
            'Rates depend on the plan you select in the flow — below are simple examples to set expectations.'
          )}
          <div className="mx-auto grid w-full max-w-none gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {[
              {
                label: 'Starter',
                value: 20000,
                premium: 200,
                note: 'Lower-value items',
                highlight: false,
              },
              {
                label: 'Everyday',
                value: 100000,
                premium: 1000,
                note: 'Typical phone / laptop range',
                highlight: true,
              },
              {
                label: 'Premium tier',
                value: 200000,
                premium: 2000,
                note: 'Higher-value gear',
                highlight: false,
              },
            ].map(({ label, value, premium, note, highlight }) => (
              <div
                key={label}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                  highlight
                    ? 'border-primary-500/40 bg-primary-500/[0.06] ring-1 ring-primary-500/25'
                    : 'border-white/[0.08] bg-white/[0.03]'
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Common choice
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">{formatCurrency(value)}</p>
                <p className="text-sm text-slate-400">Declared value (example)</p>
                <div className="my-6 h-px bg-white/[0.08]" />
                <p className="text-xl font-semibold text-white sm:text-2xl">{formatCurrency(premium)}</p>
                <p className="text-sm text-slate-400">per month (illustrative)</p>
                <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-500">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/[0.12]"
            >
              Get your numbers in the flow
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </Container>
      </section>

      {/* Why CoverKit */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20 md:py-24">
        <Container>
          {sectionTitle(
            `Why ${BRAND_NAME}`,
            'Insurance experience designed around devices',
            'Less noise, more clarity — so you know what you are buying.'
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Fast setup',
                text: 'Complete purchase online; see confirmation and policy reference without waiting on paper post.',
              },
              {
                icon: Shield,
                title: 'Purpose-built flow',
                text: 'Screens match real gadget data — IMEI where needed, device value, warranty fields when relevant.',
              },
              {
                icon: Clock,
                title: 'Claims when you need them',
                text: 'Logged-in customers can start a claim from the dashboard with policy and outlet context.',
              },
              {
                icon: DollarSign,
                title: 'Transparent math',
                text: 'Premium comes from the plan and values you enter — review before you commit.',
              },
              {
                icon: MessageCircle,
                title: 'Reachable team',
                text: 'Phone and email for sales and service questions during published hours.',
              },
              {
                icon: Lock,
                title: 'Security-minded',
                text: 'Your session and submissions are handled with standard web security practices.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-[#0f1419] p-6 transition hover:border-white/[0.12]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          {sectionTitle(
            'Customers',
            'What people say about the experience',
            `Real feedback from policyholders using ${BRAND_NAME}.`
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  'I insured my phone in one sitting. The steps were obvious and I could see the premium before paying.',
                name: 'John M.',
                place: 'Nairobi',
              },
              {
                quote:
                  'Finally an flow that asks for the right device details — not a generic form that ignores IMEI.',
                name: 'Sarah A.',
                place: 'Kisumu',
              },
              {
                quote:
                  'Support picked up when I had a question about M-Pesa billing. Felt straightforward.',
                name: 'David K.',
                place: 'Mombasa',
              },
            ].map(({ quote, name, place }) => (
              <blockquote
                key={name}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400/90 text-amber-400/90" aria-hidden />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-6 border-t border-white/[0.06] pt-4">
                  <cite className="not-italic">
                    <span className="font-semibold text-white">{name}</span>
                    <span className="text-slate-500"> · {place}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA + contact */}
      <section className="border-t border-white/[0.06] pb-20 pt-16 sm:pb-24 sm:pt-20">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-950/80 via-[#121826] to-[#0f1419] p-8 shadow-2xl shadow-black/40 sm:p-10 md:p-14">
            <div className="mx-auto max-w-2xl text-center">
              <Shield className="mx-auto mb-6 h-14 w-14 text-primary-400" aria-hidden />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Ready to protect your devices?
              </h2>
              <p className="mt-4 text-slate-400">
                Start the purchase flow — or call us if you prefer to walk through options with a person.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Begin purchase
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <a
                  href={`tel:${SUPPORT_TEL}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-5 w-5 text-primary-300" aria-hidden />
                  {SUPPORT_TEL_DISPLAY}
                </a>
              </div>
            </div>

            <div className="mx-auto mt-14 grid w-full max-w-6xl gap-10 border-t border-white/10 pt-10 md:grid-cols-2 md:gap-12 xl:max-w-none">
              <div>
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <ul className="mt-4 space-y-4 text-sm text-slate-400">
                  <li className="flex gap-3">
                    <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" aria-hidden />
                    <span>
                      <a href={`tel:${SUPPORT_TEL}`} className="font-medium text-white hover:text-primary-300">
                        {SUPPORT_TEL_DISPLAY}
                      </a>
                      <span className="block text-xs text-slate-500">Mon–Fri, 8am–6pm EAT</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" aria-hidden />
                    <span>
                      <a
                        href={`mailto:${BRAND_EMAIL}`}
                        className="font-medium text-white hover:text-primary-300"
                      >
                        {BRAND_EMAIL}
                      </a>
                      <span className="block text-xs text-slate-500">We reply within one business day</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-6">
                <p className="text-sm font-medium text-white">Quick message</p>
                <p className="mt-1 text-xs text-slate-500">
                  For policy changes or claims, sign in and use your dashboard for the fastest route.
                </p>
                <form
                  className="mt-4 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Work email"
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
                    className="w-full rounded-xl bg-white/[0.1] py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/[0.14]"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
