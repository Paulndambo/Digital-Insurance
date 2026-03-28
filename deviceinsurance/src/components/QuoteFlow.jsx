import React, { useEffect, useState, useCallback } from 'react';
import {
  Smartphone,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Check,
  Shield,
  User,
  Mail,
  Phone,
  Sparkles,
  Calendar,
  Hash,
  Calculator,
} from 'lucide-react';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';
import { fetchPricingPlans } from '../utils/api';
import { validateEmail, validatePhone } from '../utils/validation';
import { formatPhoneNumber, formatPrice } from '../utils/formatters';
import InputField from './InputField';
import { BRAND_EMAIL, BRAND_NAME } from '../constants/branding';

const deviceGroups = [
  { key: 'electronics', label: 'Electronics & Gadgets' },
  { key: 'appliance', label: 'Home Appliances' },
  { key: 'other', label: 'Other Items' },
];

const QUOTES_STORAGE_KEY = 'coverkit_quote_requests';

const SectionCard = ({ children }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6 flex items-start gap-3">
    {Icon && (
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/20 bg-gradient-to-br from-primary-500/20 to-indigo-500/10">
        <Icon className="h-5 w-5 text-primary-400" />
      </div>
    )}
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </div>
  </div>
);

function premiumForPlan(devicePrice, plan) {
  const val = parseFloat(devicePrice);
  if (!plan || isNaN(val) || val <= 0) return 0;
  return Math.round(val * (plan.cover_percentage / 100));
}

function saveQuoteRequest(payload) {
  try {
    const prev = JSON.parse(localStorage.getItem(QUOTES_STORAGE_KEY) || '[]');
    prev.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(prev));
  } catch {
    /* ignore */
  }
}

const QuoteFlow = ({ onClose, onStartPurchase }) => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [devicePrice, setDevicePrice] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [imeiNumber, setImeiNumber] = useState('');

  const [pricingPlans, setPricingPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [plansError, setPlansError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [submittedSummary, setSubmittedSummary] = useState(null);

  const selectedDeviceObj = devices.find((d) => d.id === selectedDevice);
  const totalSteps = 4;

  const loadPlans = useCallback(async () => {
    setLoadingPlans(true);
    setPlansError('');
    try {
      const data = await fetchPricingPlans();
      setPricingPlans(data.results || []);
    } catch (e) {
      console.error(e);
      setPlansError('Could not load plans. Check your connection and try again.');
      setPricingPlans([]);
    } finally {
      setLoadingPlans(false);
    }
  }, []);

  useEffect(() => {
    if (step === 3 && pricingPlans.length === 0 && !loadingPlans && !plansError) {
      loadPlans();
    }
  }, [step, pricingPlans.length, loadingPlans, plansError, loadPlans]);

  const validateStep2 = () => {
    const next = {};
    if (!deviceBrand.trim()) next.deviceBrand = 'Brand is required';
    if (!deviceModel.trim()) next.deviceModel = 'Model is required';
    if (!devicePrice.trim()) next.devicePrice = 'Estimated value is required';
    else if (!/^\d+(\.\d{1,2})?$/.test(devicePrice.trim()) || parseFloat(devicePrice) <= 0) {
      next.devicePrice = 'Enter a valid amount';
    }
    if ((selectedDevice === 'phone' || selectedDevice === 'tablet') && imeiNumber.trim()) {
      if (!/^\d{15}$/.test(imeiNumber.trim())) next.imeiNumber = 'IMEI must be 15 digits';
    }
    setErrors(next);
    setTouched((t) => ({
      ...t,
      deviceBrand: true,
      deviceModel: true,
      devicePrice: true,
      imeiNumber: true,
    }));
    return Object.keys(next).length === 0;
  };

  const validateStep4 = () => {
    const next = {};
    if (!firstName.trim()) next.firstName = 'Required';
    if (!lastName.trim()) next.lastName = 'Required';
    if (!email.trim()) next.email = 'Required';
    else if (!validateEmail(email)) next.email = 'Invalid email';
    if (!phone.trim()) next.phone = 'Required';
    else if (!validatePhone(phone)) next.phone = 'Enter a valid 10-digit number';
    setErrors(next);
    setTouched((t) => ({
      ...t,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }));
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;
    setSubmitting(true);
    const ref = `Q-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const premium = premiumForPlan(devicePrice, selectedPlan);
    const summary = {
      reference: ref,
      deviceType: selectedDeviceObj?.name,
      deviceBrand: deviceBrand.trim(),
      deviceModel: deviceModel.trim(),
      devicePrice: devicePrice.trim(),
      plan: selectedPlan?.cover_type,
      coverPercentage: selectedPlan?.cover_percentage,
      estimatedMonthlyPremium: premium,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    };
    saveQuoteRequest(summary);
    setSubmittedSummary(summary);
    setStep(5);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formData = {
    deviceBrand,
    deviceModel,
    devicePrice,
    purchaseDate,
    serialNumber,
    imeiNumber,
    firstName,
    lastName,
    email,
    phone,
  };

  if (step === 5 && submittedSummary) {
    const mailBody = encodeURIComponent(
      `Quote reference: ${submittedSummary.reference}\n` +
        `Name: ${submittedSummary.firstName} ${submittedSummary.lastName}\n` +
        `Email: ${submittedSummary.email}\n` +
        `Phone: ${submittedSummary.phone}\n` +
        `Device: ${submittedSummary.deviceType} — ${submittedSummary.deviceBrand} ${submittedSummary.deviceModel}\n` +
        `Value: ${submittedSummary.devicePrice}\n` +
        `Plan: ${submittedSummary.plan} (${submittedSummary.coverPercentage}%)\n` +
        `Est. monthly premium: ${formatCurrency(submittedSummary.estimatedMonthlyPremium)}\n` +
        (submittedSummary.notes ? `Notes: ${submittedSummary.notes}\n` : '')
    );
    const mailto = `mailto:${BRAND_EMAIL}?subject=${encodeURIComponent(`Quote request ${submittedSummary.reference}`)}&body=${mailBody}`;

    return (
      <div className="w-full py-4 sm:py-6">
        <SectionCard>
          <div className="p-6 sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Quote request received</h2>
            <p className="mt-2 text-slate-400">
              Reference <span className="font-mono font-semibold text-primary-300">{submittedSummary.reference}</span>
              — save this for your records. Our team may follow up on the details below.
            </p>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm">
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Device</dt>
                  <dd className="font-medium text-white">
                    {submittedSummary.deviceType} · {submittedSummary.deviceBrand} {submittedSummary.deviceModel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Declared value</dt>
                  <dd className="font-medium text-white">{formatCurrency(parseFloat(submittedSummary.devicePrice))}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Plan</dt>
                  <dd className="font-medium text-white">{submittedSummary.plan}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Est. monthly premium</dt>
                  <dd className="text-lg font-bold text-primary-300">
                    {formatCurrency(submittedSummary.estimatedMonthlyPremium)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Email this quote to us
              </a>
              <button
                type="button"
                onClick={onStartPurchase}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition hover:brightness-110"
              >
                Continue to full purchase
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Back
          </button>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Request a quote</h1>
          <p className="mt-1 text-sm text-slate-400">
            See an estimated premium for your item — no payment yet. Step {step} of {totalSteps}.
          </p>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-8 rounded-full transition-colors sm:w-10 ${
                s === step ? 'bg-primary-500' : s < step ? 'bg-primary-500/40' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <SectionCard>
          <div className="p-5 sm:p-8">
            <SectionTitle
              icon={Sparkles}
              title="What are you insuring?"
              subtitle="Choose the category that best matches your item"
            />
            {deviceGroups.map((group) => {
              const groupItems = devices.filter((d) => d.group === group.key);
              if (!groupItems.length) return null;
              return (
                <div key={group.key} className="mb-6 last:mb-0">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">{group.label}</p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-3">
                    {groupItems.map((device) => {
                      const Icon = device.icon;
                      const isSelected = selectedDevice === device.id;
                      return (
                        <button
                          key={device.id}
                          type="button"
                          onClick={() => setSelectedDevice(device.id)}
                          className={`group relative flex flex-col items-center justify-center rounded-xl border px-3 py-4 text-center transition active:scale-[0.98] sm:py-5 ${
                            isSelected
                              ? `border-transparent bg-gradient-to-br ${device.color} shadow-lg`
                              : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <Icon
                            className={`mb-2 h-7 w-7 sm:h-9 sm:w-9 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                          />
                          <span
                            className={`text-xs font-medium sm:text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}
                          >
                            {device.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!selectedDevice}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            {selectedDeviceObj && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                <span className={`inline-flex h-3 w-3 rounded bg-gradient-to-br ${selectedDeviceObj.color}`} />
                {selectedDeviceObj.name}
              </div>
            )}
            <SectionTitle
              icon={selectedDeviceObj?.icon || Smartphone}
              title="Item details"
              subtitle="Tell us about the item so we can price cover accurately"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <InputField
                label="Brand / manufacturer"
                name="deviceBrand"
                placeholder="e.g. Samsung, Apple"
                icon={Smartphone}
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setDeviceBrand(e.target.value);
                  if (errors.deviceBrand) setErrors((er) => ({ ...er, deviceBrand: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, deviceBrand: true }))}
              />
              <InputField
                label="Model"
                name="deviceModel"
                placeholder="e.g. Galaxy S24"
                icon={Smartphone}
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setDeviceModel(e.target.value);
                  if (errors.deviceModel) setErrors((er) => ({ ...er, deviceModel: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, deviceModel: true }))}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="qd">
                Short description <span className="text-slate-500">(optional)</span>
              </label>
              <textarea
                id="qd"
                value={deviceDescription}
                onChange={(e) => setDeviceDescription(e.target.value)}
                rows={3}
                placeholder="Colour, storage, condition…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <InputField
                label="Purchase date"
                name="purchaseDate"
                type="date"
                icon={Calendar}
                required={false}
                formData={formData}
                errors={{}}
                touched={{}}
                handleInputChange={(e) => setPurchaseDate(e.target.value)}
                handleBlur={() => {}}
              />
              <InputField
                label="Estimated current value (KES)"
                name="devicePrice"
                placeholder="e.g. 85000"
                icon={Calculator}
                helpText="What it would cost to replace today"
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setDevicePrice(formatPrice(e.target.value));
                  if (errors.devicePrice) setErrors((er) => ({ ...er, devicePrice: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, devicePrice: true }))}
              />
            </div>
            <InputField
              label="Serial number"
              name="serialNumber"
              required={false}
              placeholder="If available"
              icon={Hash}
              formData={formData}
              errors={{}}
              touched={{}}
              handleInputChange={(e) => setSerialNumber(e.target.value)}
              handleBlur={() => {}}
            />
            {(selectedDevice === 'phone' || selectedDevice === 'tablet') && (
              <InputField
                label="IMEI"
                name="imeiNumber"
                required={false}
                placeholder="15 digits (optional)"
                icon={Hash}
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setImeiNumber(e.target.value.replace(/\D/g, '').slice(0, 15));
                  if (errors.imeiNumber) setErrors((er) => ({ ...er, imeiNumber: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, imeiNumber: true }))}
              />
            )}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08]"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => validateStep2() && setStep(3)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard>
          <div className="p-5 sm:p-8">
            <SectionTitle
              icon={Shield}
              title="Choose a coverage plan"
              subtitle="Estimates use the same rules as our purchase flow — final premium confirmed at checkout"
            />
            {loadingPlans ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary-400" />
                <p className="text-sm text-slate-400">Loading plans…</p>
              </div>
            ) : plansError || pricingPlans.length === 0 ? (
              <div className="py-12 text-center">
                <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-400" />
                <p className="text-sm text-slate-400">{plansError || 'No plans available right now.'}</p>
                <button
                  type="button"
                  onClick={loadPlans}
                  className="mt-4 text-sm font-medium text-primary-400 hover:text-primary-300"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {pricingPlans.map((plan) => {
                  const itemValue = parseFloat(devicePrice) || 0;
                  const premium = premiumForPlan(devicePrice, plan);
                  const isSelected = selectedPlan?.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative rounded-2xl border p-5 text-left transition active:scale-[0.99] sm:p-6 ${
                        isSelected
                          ? 'border-primary-500/50 bg-primary-500/10 shadow-lg shadow-primary-900/20'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-500">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white">{plan.cover_type}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-primary-300">
                          {itemValue > 0 ? formatCurrency(premium) : '—'}
                        </span>
                        <span className="text-xs text-slate-500">/month</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{plan.cover_percentage}% of declared value</p>
                      {plan.pricingcomponents?.length > 0 && (
                        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                          {plan.pricingcomponents.map((comp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                              {comp.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                disabled={!selectedPlan || loadingPlans}
                onClick={() => setStep(4)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {step === 4 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            <SectionTitle
              icon={User}
              title="Your contact details"
              subtitle={`We’ll use this to reach you about quote ${BRAND_NAME}. Nothing is charged until you complete a purchase.`}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <InputField
                label="First name"
                name="firstName"
                icon={User}
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((er) => ({ ...er, firstName: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
              />
              <InputField
                label="Last name"
                name="lastName"
                icon={User}
                formData={formData}
                errors={errors}
                touched={touched}
                handleInputChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((er) => ({ ...er, lastName: '' }));
                }}
                handleBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
              />
            </div>
            <InputField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((er) => ({ ...er, email: '' }));
              }}
              handleBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              icon={Phone}
              maxLength={14}
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={(e) => {
                setPhone(formatPhoneNumber(e.target.value));
                if (errors.phone) setErrors((er) => ({ ...er, phone: '' }));
              }}
              handleBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="qn">
                Questions or timing <span className="text-slate-500">(optional)</span>
              </label>
              <textarea
                id="qn"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. Call me after 5pm, or I’m comparing plans…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
              />
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-400">
              <strong className="text-slate-300">Summary:</strong>{' '}
              {selectedDeviceObj?.name} · {formatCurrency(parseFloat(devicePrice) || 0)} · {selectedPlan?.cover_type} ·{' '}
              <span className="font-semibold text-primary-300">
                ~{formatCurrency(premiumForPlan(devicePrice, selectedPlan))}/mo
              </span>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Submit quote request
              </button>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default QuoteFlow;
