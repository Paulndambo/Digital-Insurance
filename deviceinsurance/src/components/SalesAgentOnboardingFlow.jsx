import React, { useState } from 'react';
import {
  Store,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  LogIn,
} from 'lucide-react';
import { submitDeviceOutletOnboarding } from '../utils/api';
import { formatPhoneNumber } from '../utils/formatters';
import { BRAND_NAME } from '../constants/branding';

const initialOwner = () => ({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  id_number: '',
  passport_number: '',
  gender: 'Male',
  address: '',
  town: '',
  county: '',
  country: 'Kenya',
});

const initialOutlet = () => ({
  name: '',
  location: '',
  email: '',
  phone_number: '',
  business_registration_number: '',
  tax_identification_number: '',
  city: '',
  country: 'Kenya',
  agent_type: 'Seller',
  outlet_number: '',
  website: '',
});

function normalizeWebsite(value) {
  const t = (value || '').trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function buildPayload(owner, outlet) {
  const owner_details = {
    first_name: owner.first_name.trim(),
    last_name: owner.last_name.trim(),
    phone_number: owner.phone_number.trim(),
    gender: owner.gender,
    address: owner.address.trim(),
    town: owner.town.trim(),
    county: owner.county.trim(),
    country: (owner.country || 'Kenya').trim() || 'Kenya',
  };
  const oid = owner.id_number.trim();
  if (oid) owner_details.id_number = oid;
  const ppn = owner.passport_number.trim();
  if (ppn) owner_details.passport_number = ppn;
  const oem = owner.email.trim();
  if (oem) owner_details.email = oem;

  const outlet_details = {
    name: outlet.name.trim(),
    location: outlet.location.trim(),
    email: outlet.email.trim(),
    phone_number: outlet.phone_number.trim(),
    city: outlet.city.trim(),
    country: (outlet.country || 'Kenya').trim() || 'Kenya',
    agent_type: outlet.agent_type,
  };
  const brn = outlet.business_registration_number.trim();
  if (brn) outlet_details.business_registration_number = brn;
  const tin = outlet.tax_identification_number.trim();
  if (tin) outlet_details.tax_identification_number = tin;
  const onum = outlet.outlet_number.trim();
  if (onum) outlet_details.outlet_number = onum;
  const web = normalizeWebsite(outlet.website);
  if (web) outlet_details.website = web;

  return { owner_details, outlet_details };
}

const inputClass =
  'mt-1 w-full rounded-xl border border-white/15 bg-[#0b0f1a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/40';
const labelClass = 'block text-xs font-medium uppercase tracking-wide text-slate-400';

const SalesAgentOnboardingFlow = ({ onExitToHome, onGoLogin }) => {
  const [phase, setPhase] = useState('step1');
  const [owner, setOwner] = useState(initialOwner);
  const [outlet, setOutlet] = useState(initialOutlet);
  const [accountPassword, setAccountPassword] = useState('');
  const [accountPasswordConfirm, setAccountPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const setOwnerField = (key) => (e) => {
    const v = e.target.value;
    setOwner((o) => ({
      ...o,
      [key]: key === 'phone_number' ? formatPhoneNumber(v) : v,
    }));
    setError('');
  };

  const setOutletField = (key) => (e) => {
    const v = e.target.value;
    setOutlet((o) => ({
      ...o,
      [key]: key === 'phone_number' ? formatPhoneNumber(v) : v,
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (
      !owner.first_name.trim() ||
      !owner.last_name.trim() ||
      !owner.phone_number.trim() ||
      !owner.address.trim() ||
      !owner.town.trim() ||
      !owner.county.trim()
    ) {
      setError('Please complete all required owner fields.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (
      !outlet.name.trim() ||
      !outlet.location.trim() ||
      !outlet.email.trim() ||
      !outlet.phone_number.trim() ||
      !outlet.city.trim()
    ) {
      setError('Please complete all required outlet fields (including outlet email).');
      return false;
    }
    if (accountPassword.length < 8) {
      setError('Choose a password with at least 8 characters.');
      return false;
    }
    if (accountPassword !== accountPasswordConfirm) {
      setError('Password and confirmation do not match.');
      return false;
    }
    return true;
  };

  const handleContinueFromStep1 = () => {
    if (!validateStep1()) return;
    setPhase('step2');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setSubmitting(true);
    setError('');
    try {
      const data = await submitDeviceOutletOnboarding({
        ...buildPayload(owner, outlet),
        password: accountPassword,
        password_confirm: accountPasswordConfirm,
      });
      setSuccess(data);
      setPhase('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (phase === 'success' && success) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="h-9 w-9 text-emerald-400" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">You&apos;re registered</h1>
        <p className="mt-3 text-slate-400">
          {success.message || 'Your sales agent account and device outlet are set up.'}
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left text-sm">
          <p className="text-slate-500">Outlet</p>
          <p className="mt-1 font-semibold text-white">{success.outlet?.name}</p>
          {success.outlet?.outlet_number && (
            <p className="mt-2 text-slate-400">
              Outlet number: <span className="text-slate-200">{success.outlet.outlet_number}</span>
            </p>
          )}
          <p className="mt-4 text-slate-500">Sign-in email</p>
          <p className="mt-1 font-medium text-primary-300">{success.login_email}</p>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Sign in with this email and the password you chose. Use <strong className="text-slate-400">Log in</strong>{' '}
            below when you&apos;re ready.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onGoLogin}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
          >
            <LogIn className="h-4 w-4" aria-hidden />
            Log in
          </button>
          <button
            type="button"
            onClick={onExitToHome}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.09]"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => {
          if (phase === 'step2') {
            setPhase('step1');
            setError('');
          } else {
            onExitToHome();
          }
        }}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {phase === 'step2' ? 'Back to your details' : 'Back to home'}
      </button>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 ring-1 ring-primary-500/25">
          <Store className="h-6 w-6 text-primary-400" aria-hidden />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">Partners</p>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Register as a sales agent</h1>
          <p className="mt-1 text-sm text-slate-400">
            Device outlets sell policies with {BRAND_NAME}. Two quick steps — your profile, then your shop.
          </p>
        </div>
      </div>

      <div className="mb-8 flex gap-2">
        <div
          className={`h-1 flex-1 rounded-full ${phase === 'step1' ? 'bg-primary-500' : 'bg-primary-500/40'}`}
          aria-hidden
        />
        <div
          className={`h-1 flex-1 rounded-full ${phase === 'step2' ? 'bg-primary-500' : 'bg-white/10'}`}
          aria-hidden
        />
      </div>
      <p className="-mt-4 mb-8 text-center text-xs text-slate-500">
        Step {phase === 'step1' ? '1' : '2'} of 2
      </p>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {phase === 'step1' && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10">
              <User className="h-5 w-5 text-primary-400" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Your details</h2>
              <p className="text-sm text-slate-400">The person responsible for this outlet account.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              First name *
              <input className={inputClass} value={owner.first_name} onChange={setOwnerField('first_name')} />
            </label>
            <label className={labelClass}>
              Last name *
              <input className={inputClass} value={owner.last_name} onChange={setOwnerField('last_name')} />
            </label>
            <label className={labelClass}>
              Phone *
              <input
                type="tel"
                className={inputClass}
                value={owner.phone_number}
                onChange={setOwnerField('phone_number')}
              />
            </label>
            <label className={labelClass}>
              Email (optional)
              <input
                type="email"
                className={inputClass}
                value={owner.email}
                onChange={setOwnerField('email')}
                placeholder="For login; outlet email used if empty"
              />
            </label>
            <label className={labelClass}>
              ID number (optional)
              <input className={inputClass} value={owner.id_number} onChange={setOwnerField('id_number')} />
            </label>
            <label className={labelClass}>
              Passport number (optional)
              <input
                className={inputClass}
                value={owner.passport_number}
                onChange={setOwnerField('passport_number')}
              />
            </label>
            <label className={`sm:col-span-2 ${labelClass}`}>
              Gender *
              <select
                className={inputClass}
                value={owner.gender}
                onChange={setOwnerField('gender')}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label className={`sm:col-span-2 ${labelClass}`}>
              Address *
              <input className={inputClass} value={owner.address} onChange={setOwnerField('address')} />
            </label>
            <label className={labelClass}>
              Town *
              <input className={inputClass} value={owner.town} onChange={setOwnerField('town')} />
            </label>
            <label className={labelClass}>
              County *
              <input className={inputClass} value={owner.county} onChange={setOwnerField('county')} />
            </label>
            <label className={`sm:col-span-2 ${labelClass}`}>
              Country
              <input className={inputClass} value={owner.country} onChange={setOwnerField('country')} />
            </label>
          </div>
          <button
            type="button"
            onClick={handleContinueFromStep1}
            className="mt-8 inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 sm:w-auto sm:px-10"
          >
            Continue to outlet
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}

      {phase === 'step2' && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10">
              <Store className="h-5 w-5 text-primary-400" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Outlet / business</h2>
              <p className="text-sm text-slate-400">Where customers find you and how we reach the business.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`sm:col-span-2 ${labelClass}`}>
              Business / outlet name *
              <input className={inputClass} value={outlet.name} onChange={setOutletField('name')} />
            </label>
            <label className={`sm:col-span-2 ${labelClass}`}>
              Location *
              <input
                className={inputClass}
                value={outlet.location}
                onChange={setOutletField('location')}
                placeholder="Street, building, or area"
              />
            </label>
            <label className={labelClass}>
              Business email *
              <input
                type="email"
                className={inputClass}
                value={outlet.email}
                onChange={setOutletField('email')}
              />
            </label>
            <label className={labelClass}>
              Business phone *
              <input
                type="tel"
                className={inputClass}
                value={outlet.phone_number}
                onChange={setOutletField('phone_number')}
              />
            </label>
            <label className={labelClass}>
              Business registration no. (optional)
              <input
                className={inputClass}
                value={outlet.business_registration_number}
                onChange={setOutletField('business_registration_number')}
              />
            </label>
            <label className={labelClass}>
              Tax ID / PIN (optional)
              <input
                className={inputClass}
                value={outlet.tax_identification_number}
                onChange={setOutletField('tax_identification_number')}
              />
            </label>
            <label className={labelClass}>
              City *
              <input className={inputClass} value={outlet.city} onChange={setOutletField('city')} />
            </label>
            <label className={labelClass}>
              Country
              <input className={inputClass} value={outlet.country} onChange={setOutletField('country')} />
            </label>
            <label className={labelClass}>
              Agent type *
              <select
                className={inputClass}
                value={outlet.agent_type}
                onChange={setOutletField('agent_type')}
              >
                <option value="Seller">Seller</option>
                <option value="Repair">Repair</option>
              </select>
            </label>
            <label className={labelClass}>
              Outlet number (optional)
              <input
                className={inputClass}
                value={outlet.outlet_number}
                onChange={setOutletField('outlet_number')}
              />
            </label>
            <label className={`sm:col-span-2 ${labelClass}`}>
              Website (optional)
              <input
                className={inputClass}
                value={outlet.website}
                onChange={setOutletField('website')}
                placeholder="https:// or domain only"
              />
            </label>
            <label className={labelClass}>
              Account password *
              <input
                type="password"
                autoComplete="new-password"
                className={inputClass}
                value={accountPassword}
                onChange={(e) => {
                  setAccountPassword(e.target.value);
                  setError('');
                }}
                placeholder="Min. 8 characters"
              />
            </label>
            <label className={labelClass}>
              Confirm password *
              <input
                type="password"
                autoComplete="new-password"
                className={inputClass}
                value={accountPasswordConfirm}
                onChange={(e) => {
                  setAccountPasswordConfirm(e.target.value);
                  setError('');
                }}
              />
            </label>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => {
                setPhase('step1');
                setError('');
              }}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.09]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Previous
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110 disabled:opacity-60 sm:px-10"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
              Submit registration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SalesAgentOnboardingFlow;
