import React from 'react';
import {
  User, Mail, Phone, Smartphone, Calendar, Hash, DollarSign,
  Lock, Check, Loader2, Shield, ChevronRight, ChevronLeft,
  Zap, Star, ArrowRight, Sparkles, AlertCircle, Info,
  CreditCard, Building2, Heart, MessageSquare
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import InputField from './InputField';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';

/* ─── tiny helpers ─────────────────────────────────────────────────── */

const SectionCard = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    {Icon && (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
    )}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const NavButtons = ({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false, nextLoading = false, backStep }) => (
  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
    {backStep !== undefined && (
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-400 border border-white/8 bg-white/4 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-200 min-h-[46px]"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>
    )}
    <button
      onClick={onNext}
      disabled={nextDisabled || nextLoading}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[46px]
        ${nextDisabled || nextLoading
          ? 'bg-white/6 text-slate-500 cursor-not-allowed border border-white/8'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.98]'
        }
      `}
    >
      {nextLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing…
        </>
      ) : (
        <>
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </>
      )}
    </button>
  </div>
);

const SelectField = ({ label, name, value, onChange, onBlur, options, touched, errors, required = true }) => {
  const hasError = touched[name] && errors[name];
  const isValid  = touched[name] && value && !errors[name];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-slate-300" htmlFor={name}>{label}</label>
        {required && <span className="text-rose-400 text-sm leading-none">*</span>}
      </div>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          style={{ colorScheme: 'dark' }}
          className={`w-full rounded-xl border text-sm text-white min-h-[46px] px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 appearance-none
            ${hasError
              ? 'bg-rose-500/8 border-rose-500/40 focus:ring-rose-500/30'
              : isValid
              ? 'bg-emerald-500/5 border-emerald-500/30 focus:ring-emerald-500/20'
              : 'bg-white/5 border-white/10 hover:border-white/20 focus:ring-blue-500/25 focus:border-blue-500/50'
            }
          `}
        >
          {options.map(({ value: v, label: l }) => (
            <option key={v} value={v} className="bg-slate-900 text-white">{l}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
        </div>
        {isValid && (
          <Check className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
        )}
      </div>
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-rose-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

const TextareaField = ({ label, name, value, onChange, onBlur, placeholder, rows = 3, touched, errors, required = true }) => {
  const hasError = touched[name] && errors[name];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-slate-300" htmlFor={name}>{label}</label>
        {required && <span className="text-rose-400 text-sm leading-none">*</span>}
      </div>
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-xl border text-sm text-white px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 resize-none placeholder:text-slate-600
          ${hasError
            ? 'bg-rose-500/8 border-rose-500/40 focus:ring-rose-500/30'
            : 'bg-white/5 border-white/10 hover:border-white/20 focus:ring-blue-500/25 focus:border-blue-500/50 focus:bg-white/8'
          }
        `}
      />
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-rose-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

const ReviewRow = ({ label, value, mono = false, span = false }) => (
  <div className={span ? 'col-span-2' : ''}>
    <p className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider font-medium">{label}</p>
    <p className={`text-sm font-medium text-white break-words ${mono ? 'font-mono text-xs' : ''}`}>
      {value || <span className="text-slate-600 italic">—</span>}
    </p>
  </div>
);

/* ─── group devices by category ────────────────────────────────────── */
const deviceGroups = [
  { key: 'electronics', label: 'Electronics & Gadgets' },
  { key: 'appliance',   label: 'Home Appliances' },
  { key: 'other',       label: 'Other Items' },
];

/* ─── main component ────────────────────────────────────────────────── */
const PurchaseFlow = ({
  step,
  selectedDevice,
  formData,
  errors,
  touched,
  loading,
  loadingPlans,
  pricingPlans,
  selectedPricingPlan,
  onDeviceSelect,
  onInputChange,
  onBlur,
  onStepChange,
  onPricingPlanSelect,
  onComplete,
}) => {
  const calculatePremium = () => {
    if (!formData.devicePrice || !selectedPricingPlan) return 0;
    const val = parseFloat(formData.devicePrice);
    if (isNaN(val) || val <= 0) return 0;
    return Math.round(val * (selectedPricingPlan.cover_percentage / 100));
  };
  const monthlyPremium   = calculatePremium();
  const selectedDeviceObj = devices.find(d => d.id === selectedDevice);

  return (
    <div className="w-full min-w-0 px-0 py-4 sm:py-6 lg:py-8">
      <ProgressBar step={step} totalSteps={7} />

      {/* ── STEP 1 · Choose Item ─────────────────────────────────────── */}
      {step === 1 && (
        <SectionCard>
          <div className="p-5 sm:p-8">
            <SectionTitle
              icon={Sparkles}
              title="What would you like to insure?"
              subtitle="Select an item category to get started"
            />

            {deviceGroups.map(group => {
              const groupItems = devices.filter(d => d.group === group.key);
              if (!groupItems.length) return null;
              return (
                <div key={group.key} className="mb-6 last:mb-0">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                    {groupItems.map(device => {
                      const Icon = device.icon;
                      const isSelected = selectedDevice === device.id;
                      return (
                        <button
                          key={device.id}
                          onClick={() => onDeviceSelect(device.id)}
                          className={`group relative flex flex-col items-center justify-center py-4 sm:py-5 px-3 rounded-xl border transition-all duration-200 active:scale-95 text-center
                            ${isSelected
                              ? `bg-gradient-to-br ${device.color} border-transparent shadow-lg`
                              : 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15'
                            }
                          `}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>
                          )}
                          <Icon className={`w-7 h-7 sm:w-9 sm:h-9 mb-2.5 transition-transform group-hover:scale-110 duration-200 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          <span className={`text-xs sm:text-sm font-medium leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                            {device.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="mt-8">
              <NavButtons
                onNext={() => onStepChange(2)}
                nextLabel="Continue"
                nextDisabled={!selectedDevice}
              />
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── STEP 2 · Personal Info ───────────────────────────────────── */}
      {step === 2 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            <SectionTitle
              icon={User}
              title="Personal Information"
              subtitle="We need a few details to set up your policy"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="First Name" name="firstName" placeholder="John"
                icon={User} formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
              <InputField label="Last Name" name="lastName" placeholder="Doe"
                icon={User} formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
            </div>

            <InputField label="Email Address" name="email" type="email"
              placeholder="john.doe@example.com" icon={Mail}
              helpText="We'll send your policy documents and updates to this email"
              formData={formData} errors={errors} touched={touched}
              handleInputChange={onInputChange} handleBlur={onBlur} />

            <InputField label="Phone Number" name="phone" type="tel"
              placeholder="0712 345 678" icon={Phone} maxLength={14}
              helpText="Used for important policy notifications only"
              formData={formData} errors={errors} touched={touched}
              handleInputChange={onInputChange} handleBlur={onBlur} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <SelectField
                label="Gender" name="gender"
                value={formData.gender}
                onChange={onInputChange} onBlur={onBlur}
                touched={touched} errors={errors}
                options={[
                  { value: '', label: 'Select gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                  { value: 'Prefer not to say', label: 'Prefer not to say' },
                ]}
              />
              <InputField label="National ID / Passport" name="idNumber"
                placeholder="Enter ID or Passport number" icon={Lock}
                helpText="Your government-issued identification number"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
            </div>

            <NavButtons
              onBack={() => onStepChange(1)} backStep={1}
              onNext={() => onStepChange(3)} nextLabel="Continue"
            />
          </div>
        </SectionCard>
      )}

      {/* ── STEP 3 · Item Details ─────────────────────────────────────── */}
      {step === 3 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            {/* selected item badge */}
            {selectedDeviceObj && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-xs text-slate-300 mb-1">
                <span className={`inline-flex w-4 h-4 rounded bg-gradient-to-br ${selectedDeviceObj.color}`} />
                Insuring: <span className="font-semibold text-white">{selectedDeviceObj.name}</span>
              </div>
            )}

            <SectionTitle
              icon={selectedDeviceObj?.icon || Smartphone}
              title="Item Details"
              subtitle="Tell us about the item you want to protect"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="Brand / Manufacturer" name="deviceBrand"
                placeholder="e.g. Apple, Samsung, LG"
                icon={selectedDeviceObj?.icon || Smartphone}
                helpText="Enter the brand or manufacturer of your item"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
              <InputField label="Model Name" name="deviceModel"
                placeholder="e.g. iPhone 15 Pro, OLED55"
                icon={selectedDeviceObj?.icon || Smartphone}
                helpText="The exact model name as printed on the device"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
            </div>

            <TextareaField
              label="Item Description" name="deviceDescription"
              value={formData.deviceDescription}
              onChange={onInputChange} onBlur={onBlur}
              rows={3} touched={touched} errors={errors}
              placeholder="Colour, capacity, condition, any notable features…"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="Purchase Date" name="purchaseDate" type="date"
                icon={Calendar} formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
              <InputField label="Serial Number" name="serialNumber"
                placeholder="S/N from packaging or label"
                icon={Hash} helpText="Found on the original box, receipt, or back of the item"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} required={false} />
            </div>

            {/* IMEI — only for phones & tablets */}
            {(selectedDevice === 'phone' || selectedDevice === 'tablet') && (
              <InputField label="IMEI Number" name="imeiNumber"
                placeholder="15-digit IMEI number"
                icon={Hash}
                helpText="Dial *#06# or check Settings › About Phone to find your IMEI"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} required={false} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="Warranty Period" name="warrantyPeriod" type="number"
                placeholder="e.g. 1, 2" icon={Calendar}
                helpText="Remaining manufacturer warranty in years"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} required={false} />
              <InputField label="Warranty Expiry Date" name="warrantyEndDate" type="date"
                icon={Calendar}
                helpText="The date your manufacturer warranty expires"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} required={false} />
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/15 p-4">
              <InputField label="Item Value (KES)" name="devicePrice" type="text"
                placeholder="e.g. 85000" icon={DollarSign}
                helpText="Current market value — this determines your monthly premium"
                formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
              {formData.devicePrice && selectedPricingPlan && monthlyPremium > 0 && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2.5">
                  <span className="text-xs text-slate-400">Est. monthly premium</span>
                  <span className="text-base font-bold text-blue-400">{formatCurrency(monthlyPremium)}</span>
                </div>
              )}
            </div>

            <NavButtons
              onBack={() => onStepChange(2)} backStep={2}
              onNext={() => onStepChange(4)} nextLabel="Continue"
            />
          </div>
        </SectionCard>
      )}

      {/* ── STEP 4 · Pick Plan ───────────────────────────────────────── */}
      {step === 4 && (
        <SectionCard>
          <div className="p-5 sm:p-8">
            <SectionTitle
              icon={Shield}
              title="Choose Your Coverage Plan"
              subtitle="Select the level of protection that fits your needs"
            />

            {loadingPlans ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
                <p className="text-sm text-slate-400">Loading available plans…</p>
              </div>
            ) : pricingPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-yellow-400" />
                </div>
                <p className="text-sm text-slate-400">No pricing plans available at the moment</p>
                {errors.pricingPlan && <p className="text-xs text-rose-400">{errors.pricingPlan}</p>}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {pricingPlans.map(plan => {
                  const itemValue = parseFloat(formData.devicePrice) || 0;
                  const premium   = Math.round(itemValue * (plan.cover_percentage / 100));
                  const isSelected = selectedPricingPlan?.id === plan.id;

                  return (
                    <button
                      key={plan.id}
                      onClick={() => onPricingPlanSelect(plan)}
                      className={`relative text-left rounded-2xl border p-5 sm:p-6 transition-all duration-200 active:scale-[0.98]
                        ${isSelected
                          ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                          : 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15'
                        }
                      `}
                    >
                      {/* selected badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">{plan.cover_type}</h3>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                          {itemValue > 0 ? formatCurrency(premium) : '—'}
                        </span>
                        <span className="text-xs text-slate-400">/month</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{plan.cover_percentage}% of item value</p>

                      {plan.pricingcomponents?.length > 0 && (
                        <div className="border-t border-white/8 pt-4">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Coverage includes</p>
                          <ul className="space-y-1.5">
                            {plan.pricingcomponents.map((comp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-slate-300">{comp.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {errors.pricingPlan && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400 mb-4">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.pricingPlan}
              </p>
            )}

            <NavButtons
              onBack={() => onStepChange(3)} backStep={3}
              onNext={() => onStepChange(5)} nextLabel="Continue to Beneficiary"
              nextDisabled={!selectedPricingPlan}
            />
          </div>
        </SectionCard>
      )}

      {/* ── STEP 5 · Beneficiary ─────────────────────────────────────── */}
      {step === 5 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            <SectionTitle
              icon={Heart}
              title="Beneficiary details"
              subtitle="Who should we contact about claims or benefits for this policy?"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="First name" name="beneficiaryFirstName" placeholder="First name"
                icon={User} formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
              <InputField label="Last name" name="beneficiaryLastName" placeholder="Last name"
                icon={User} formData={formData} errors={errors} touched={touched}
                handleInputChange={onInputChange} handleBlur={onBlur} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <SelectField
                label="Relationship to policyholder" name="beneficiaryRelationship"
                value={formData.beneficiaryRelationship}
                onChange={onInputChange} onBlur={onBlur}
                touched={touched} errors={errors}
                options={[
                  { value: '', label: 'Select relationship' },
                  { value: 'Spouse', label: 'Spouse' },
                  { value: 'Child', label: 'Child' },
                  { value: 'Son', label: 'Son' },
                  { value: 'Daughter', label: 'Daughter' },
                  { value: 'Parent', label: 'Parent' },
                  { value: 'Grand Parent', label: 'Grandparent' },
                  { value: 'Niece', label: 'Niece' },
                  { value: 'Nephew', label: 'Nephew' },
                  { value: 'Aunt', label: 'Aunt' },
                  { value: 'Uncle', label: 'Uncle' },
                  { value: 'In Law', label: 'In-law / extended family' },
                ]}
              />
              <SelectField
                label="Gender" name="beneficiaryGender"
                value={formData.beneficiaryGender}
                onChange={onInputChange} onBlur={onBlur}
                touched={touched} errors={errors}
                options={[
                  { value: '', label: 'Select gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </div>

            <InputField label="Phone number" name="beneficiaryPhone" type="tel"
              placeholder="07XX XXX XXX" icon={Phone}
              helpText="Primary contact number for this beneficiary"
              formData={formData} errors={errors} touched={touched}
              handleInputChange={onInputChange} handleBlur={onBlur} />

            <InputField label="Email (optional)" name="beneficiaryEmail" type="email"
              placeholder="name@example.com" icon={Mail}
              formData={formData} errors={errors} touched={touched}
              handleInputChange={onInputChange} handleBlur={onBlur} required={false} />

            <NavButtons
              onBack={() => onStepChange(4)} backStep={4}
              onNext={() => onStepChange(6)} nextLabel="Continue to Payment"
            />
          </div>
        </SectionCard>
      )}

      {/* ── STEP 6 · Payment ─────────────────────────────────────────── */}
      {step === 6 && (
        <SectionCard>
          <div className="p-5 sm:p-8 space-y-5">
            <SectionTitle
              icon={DollarSign}
              title="Payment Details"
              subtitle="Choose how you would like to pay your monthly premium"
            />

            {selectedPricingPlan && monthlyPremium > 0 && (
              <div className="flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-400">Monthly Premium</p>
                  <p className="text-xl font-extrabold text-blue-400">{formatCurrency(monthlyPremium)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Plan</p>
                  <p className="text-sm font-semibold text-slate-200">{selectedPricingPlan.cover_type}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-slate-300 mb-3">Payment channel</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'mpesa', title: 'Mobile money', sub: 'M-Pesa', Icon: Zap, accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30' },
                  { id: 'bank_debit', title: 'Bank debits', sub: 'Direct debit', Icon: Building2, accent: 'from-sky-500/20 to-blue-500/10 border-sky-500/30' },
                  { id: 'card', title: 'Card', sub: 'Visa / Mastercard', Icon: CreditCard, accent: 'from-violet-500/20 to-purple-500/10 border-violet-500/30' },
                ].map(({ id, title, sub, Icon, accent }) => {
                  const selected = formData.paymentMethod === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onInputChange({ target: { name: 'paymentMethod', value: id } })}
                      className={`relative text-left rounded-2xl border p-4 transition-all duration-200 active:scale-[0.98]
                        ${selected
                          ? `bg-gradient-to-br ${accent} shadow-lg ring-1 ring-white/10`
                          : 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15'
                        }
                      `}
                    >
                      {selected && (
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${selected ? 'bg-white/10' : 'bg-white/5'}`}>
                        <Icon className={`w-4 h-4 ${selected ? 'text-blue-300' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </button>
                  );
                })}
              </div>
              {touched.paymentMethod && errors.paymentMethod && (
                <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-2" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {formData.paymentMethod === 'mpesa' && (
              <>
                <div className="flex items-start gap-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 p-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-300 mb-0.5">M-Pesa</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Enter the name and phone number registered on your M-Pesa account. You will receive a payment prompt on your phone after you confirm your policy.
                    </p>
                  </div>
                </div>
                <InputField label="Name on M-Pesa account" name="paymentAccountName"
                  placeholder="As registered on your M-Pesa account" icon={User}
                  helpText="Must match the name on your registered M-Pesa account"
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required />
                <InputField label="M-Pesa phone number" name="mpesaPhoneNumber"
                  placeholder="07XX XXX XXX" icon={Phone}
                  helpText="The number that receives M-Pesa messages"
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required />
              </>
            )}

            {formData.paymentMethod === 'bank_debit' && (
              <>
                <div className="flex items-start gap-3 rounded-xl bg-sky-500/8 border border-sky-500/25 p-4">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sky-200 mb-0.5">Bank debit</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We will use these details to set up a monthly debit order for your premium. Ensure the account can accept direct debits.
                    </p>
                  </div>
                </div>
                <InputField label="Bank name" name="bankName"
                  placeholder="e.g. Equity Bank, KCB" icon={Building2}
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required />
                <InputField label="Account holder name" name="bankAccountName"
                  placeholder="Name as it appears on the account" icon={User}
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required />
                <InputField label="Bank account number" name="bankAccountNumber"
                  placeholder="Your account number" icon={Hash}
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required />
                <InputField label="Branch (optional)" name="bankBranch"
                  placeholder="Branch name or code" icon={Building2}
                  formData={formData} errors={errors} touched={touched}
                  handleInputChange={onInputChange} handleBlur={onBlur} required={false} />
              </>
            )}

            {formData.paymentMethod === 'card' && (
              <div className="flex items-start gap-3 rounded-xl bg-violet-500/10 border border-violet-500/25 p-5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-violet-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-violet-200 mb-1.5">Card subscription</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You will not enter card details here. After you confirm your policy, we will send a secure subscription link to <span className="text-slate-300 font-medium">{formData.email || 'your email address'}</span>. Open the link to add your card and activate recurring billing.
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wide">Additional information</h3>
              <SelectField
                label="Are you buying this policy through an agent?"
                name="purchasedViaAgent"
                value={formData.purchasedViaAgent}
                onChange={onInputChange}
                onBlur={onBlur}
                touched={touched}
                errors={errors}
                options={[
                  { value: 'no', label: 'No, buying directly' },
                  { value: 'yes', label: 'Yes, through an agent' },
                ]}
              />
              {formData.purchasedViaAgent === 'yes' && (
                <InputField
                  label="Agent number or ID"
                  name="agentIdNumber"
                  placeholder="e.g. agent code, staff ID, or employee number"
                  icon={Hash}
                  helpText="The identifier your agent gave you — used for commission and audit only"
                  formData={formData}
                  errors={errors}
                  touched={touched}
                  handleInputChange={onInputChange}
                  handleBlur={onBlur}
                />
              )}
              <SelectField
                label="Preferred communication channel"
                name="preferredCommunicationChannel"
                value={formData.preferredCommunicationChannel}
                onChange={onInputChange}
                onBlur={onBlur}
                touched={touched}
                errors={errors}
                options={[
                  { value: 'all', label: 'All Channels' },
                  { value: 'sms', label: 'SMS' },
                  { value: 'email', label: 'Email' },
                  { value: 'whatsapp', label: 'WhatsApp' },
                ]}
              />
              <p className="text-xs text-slate-500 leading-relaxed">
                We will use this preference for policy updates, payment reminders, and important notices. You can change it later with customer support.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Your payment details are handled securely</span>
            </div>

            <NavButtons
              onBack={() => onStepChange(5)} backStep={5}
              onNext={() => onStepChange(7)} nextLabel="Review & Confirm"
            />
          </div>
        </SectionCard>
      )}

      {/* ── STEP 7 · Review ──────────────────────────────────────────── */}
      {step === 7 && (
        <SectionCard>
          <div className="p-5 sm:p-8">
            <SectionTitle
              icon={Star}
              title="Review Your Policy"
              subtitle="Please confirm all details are correct before purchasing"
            />

            <div className="space-y-4 mb-6">
              {/* Personal */}
              <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/8 bg-white/3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Personal Information
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-4">
                  <ReviewRow label="Full Name"      value={`${formData.firstName} ${formData.lastName}`} />
                  <ReviewRow label="Email"          value={formData.email} />
                  <ReviewRow label="Phone"          value={formData.phone} />
                  <ReviewRow label="Gender"         value={formData.gender} />
                  <ReviewRow label="ID / Passport"  value={formData.idNumber} />
                </div>
              </div>

              {/* Item */}
              <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/8 bg-white/3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    {selectedDeviceObj && React.createElement(selectedDeviceObj.icon, { className: 'w-3.5 h-3.5' })}
                    Item Information
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-4">
                  <ReviewRow label="Item Type"     value={selectedDeviceObj?.name} />
                  <ReviewRow label="Brand"         value={formData.deviceBrand} />
                  <ReviewRow label="Model"         value={formData.deviceModel} />
                  <ReviewRow label="Item Value"    value={formatCurrency(parseFloat(formData.devicePrice))} />
                  <ReviewRow label="Purchase Date" value={formData.purchaseDate ? new Date(formData.purchaseDate).toLocaleDateString() : null} />
                  {formData.serialNumber  && <ReviewRow label="Serial No."   value={formData.serialNumber}  mono />}
                  {formData.imeiNumber    && <ReviewRow label="IMEI"         value={formData.imeiNumber}    mono />}
                  {formData.warrantyPeriod && <ReviewRow label="Warranty"    value={`${formData.warrantyPeriod} yr${formData.warrantyPeriod === '1' ? '' : 's'}`} />}
                  {formData.deviceDescription && (
                    <div className="col-span-2 sm:col-span-3">
                      <ReviewRow label="Description" value={formData.deviceDescription} />
                    </div>
                  )}
                </div>
              </div>

              {/* Beneficiary */}
              <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/8 bg-white/3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5" />
                    Beneficiary
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-4">
                  <ReviewRow label="Full name" value={`${formData.beneficiaryFirstName} ${formData.beneficiaryLastName}`} />
                  <ReviewRow label="Relationship" value={formData.beneficiaryRelationship} />
                  <ReviewRow label="Gender" value={formData.beneficiaryGender} />
                  <ReviewRow label="Phone" value={formData.beneficiaryPhone} />
                  {formData.beneficiaryEmail?.trim() ? (
                    <ReviewRow label="Email" value={formData.beneficiaryEmail} span />
                  ) : null}
                </div>
              </div>

              {/* Plan + Premium */}
              {selectedPricingPlan && (
                <div className="rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-blue-500/15">
                    <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" />
                      Coverage Plan
                    </p>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-base font-bold text-white">{selectedPricingPlan.cover_type}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedPricingPlan.cover_percentage}% of item value per month</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs text-slate-400">Monthly Premium</p>
                      <p className="text-3xl font-extrabold text-blue-400">{formatCurrency(monthlyPremium)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment summary */}
            <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/8 bg-white/3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  Payment
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-4">
                <ReviewRow
                  label="Method"
                  value={
                    formData.paymentMethod === 'mpesa'
                      ? 'M-Pesa (mobile money)'
                      : formData.paymentMethod === 'bank_debit'
                        ? 'Bank debits'
                        : 'Card payments'
                  }
                />
                {formData.paymentMethod === 'mpesa' && (
                  <>
                    <ReviewRow label="Name on M-Pesa" value={formData.paymentAccountName} />
                    <ReviewRow label="M-Pesa number" value={formData.mpesaPhoneNumber} />
                  </>
                )}
                {formData.paymentMethod === 'bank_debit' && (
                  <>
                    <ReviewRow label="Bank" value={formData.bankName} />
                    <ReviewRow label="Account holder" value={formData.bankAccountName} />
                    <ReviewRow label="Account number" value={formData.bankAccountNumber} mono />
                    {formData.bankBranch?.trim() ? (
                      <ReviewRow label="Branch" value={formData.bankBranch} />
                    ) : null}
                  </>
                )}
                {formData.paymentMethod === 'card' && (
                  <div className="col-span-2 sm:col-span-3">
                    <p className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider font-medium">After confirmation</p>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                      You will receive a secure card subscription link at <span className="text-white">{formData.email}</span> to complete payment setup.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional information (matches payment step section) */}
            <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/8 bg-white/3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Additional information
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-4">
                <ReviewRow
                  label="Through agent"
                  value={formData.purchasedViaAgent === 'yes' ? 'Yes' : 'No'}
                />
                {formData.purchasedViaAgent === 'yes' ? (
                  <ReviewRow label="Agent number / ID" value={formData.agentIdNumber} mono />
                ) : null}
                <ReviewRow
                  label="Preferred communication"
                  value={
                    formData.preferredCommunicationChannel === 'all'
                      ? 'All Channels'
                      : formData.preferredCommunicationChannel === 'sms'
                        ? 'SMS'
                        : formData.preferredCommunicationChannel === 'email'
                          ? 'Email'
                          : formData.preferredCommunicationChannel === 'whatsapp'
                            ? 'WhatsApp'
                            : 'All Channels'
                  }
                  span
                />
              </div>
            </div>

            {/* agree fine print */}
            <p className="flex items-start gap-2 text-xs text-slate-500 mb-5">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-600" />
              {formData.paymentMethod === 'mpesa' && (
                <>By confirming, you agree to our terms and conditions and authorise the monthly premium deduction via M-Pesa.</>
              )}
              {formData.paymentMethod === 'bank_debit' && (
                <>By confirming, you agree to our terms and conditions and authorise monthly bank debits for your premium.</>
              )}
              {formData.paymentMethod === 'card' && (
                <>By confirming, you agree to our terms and conditions. Card details are entered only through the secure subscription link we send you by email.</>
              )}
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={() => onStepChange(6)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-400 border border-white/8 bg-white/4 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-200 min-h-[46px]"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={onComplete}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[46px]
                  ${loading
                    ? 'bg-white/6 text-slate-500 cursor-not-allowed border border-white/8'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98]'
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Confirm & Purchase
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default PurchaseFlow;
