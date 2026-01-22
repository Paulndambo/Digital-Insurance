import React from 'react';
import { User, Mail, Phone, Smartphone, Calendar, Hash, DollarSign, CreditCard, Lock, Check, Loader2, Shield } from 'lucide-react';
import ProgressBar from './ProgressBar';
import InputField from './InputField';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';

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
  onComplete
}) => {
  // Calculate premium based on selected plan's cover_percentage
  const calculatePremium = () => {
    if (!formData.devicePrice || !selectedPricingPlan) return 0;
    const deviceValue = parseFloat(formData.devicePrice);
    if (isNaN(deviceValue) || deviceValue <= 0) return 0;
    const coverPercentage = selectedPricingPlan.cover_percentage / 100;
    return Math.round(deviceValue * coverPercentage);
  };
  
  const monthlyPremium = calculatePremium();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProgressBar step={step} totalSteps={6} />

      {step === 1 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">Select Your Device Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => onDeviceSelect(device.id)}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    selectedDevice === device.id
                      ? `bg-gradient-to-br ${device.color} shadow-xl scale-105`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 ${
                    selectedDevice === device.id ? 'text-white' : 'text-slate-300'
                  }`} />
                  <p className={`font-semibold ${
                    selectedDevice === device.id ? 'text-white' : 'text-slate-300'
                  }`}>
                    {device.name}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => onStepChange(2)}
              disabled={!selectedDevice}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                selectedDevice
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 shadow-xl'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm space-y-6">
          <h2 className="text-3xl font-bold mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="John"
              icon={User}
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              icon={User}
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
          </div>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            icon={Mail}
            helpText="We'll use this email to send you policy documents and updates"
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            icon={Phone}
            maxLength={14}
            helpText="We'll use this for important policy updates"
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender || ''}
                onChange={onInputChange}
                onBlur={onBlur}
                className={`w-full bg-white/10 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 text-white ${
                  touched.gender && errors.gender
                    ? 'border-red-400/50 focus:ring-red-500 bg-red-500/10'
                    : 'border-white/20 focus:ring-blue-500 hover:border-white/30'
                }`}
                style={{ colorScheme: 'dark' }}
              >
                <option value="" className="bg-slate-800 text-white">Select gender</option>
                <option value="Male" className="bg-slate-800 text-white">Male</option>
                <option value="Female" className="bg-slate-800 text-white">Female</option>
                <option value="Other" className="bg-slate-800 text-white">Other</option>
                <option value="Prefer not to say" className="bg-slate-800 text-white">Prefer not to say</option>
              </select>
              {touched.gender && errors.gender && (
                <div className="mt-2 text-sm text-red-400">{errors.gender}</div>
              )}
            </div>
            <InputField
              label="ID Number / Passport Number"
              name="idNumber"
              type="text"
              placeholder="Enter ID or Passport number"
              icon={User}
              helpText="Your government-issued ID or passport number"
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onStepChange(1)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onStepChange(3)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm space-y-6">
          <h2 className="text-3xl font-bold mb-6">Device Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Device Brand"
              name="deviceBrand"
              placeholder="e.g., Apple, Samsung, Dell"
              icon={Smartphone}
              helpText="Enter the brand or manufacturer name"
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
            <InputField
              label="Device Model"
              name="deviceModel"
              placeholder="e.g., iPhone 15 Pro, MacBook Pro 16"
              icon={Smartphone}
              helpText="Enter the exact model name of your device"
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Device Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="deviceDescription"
              value={formData.deviceDescription || ''}
              onChange={onInputChange}
              onBlur={onBlur}
              rows={4}
              className={`w-full bg-white/10 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none text-white ${
                touched.deviceDescription && errors.deviceDescription
                  ? 'border-red-400/50 focus:ring-red-500 bg-red-500/10'
                  : 'border-white/20 focus:ring-blue-500 hover:border-white/30'
              } placeholder-slate-500`}
              placeholder="Describe your device (color, storage capacity, special features, condition, etc.)"
            />
            {touched.deviceDescription && errors.deviceDescription && (
              <div className="mt-2 text-sm text-red-400">{errors.deviceDescription}</div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Purchase Date"
              name="purchaseDate"
              type="date"
              icon={Calendar}
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
            <InputField
              label="Serial Number"
              name="serialNumber"
              placeholder="Enter device serial number"
              icon={Hash}
              helpText="Found on your device or original packaging"
              formData={formData}
              errors={errors}
              touched={touched}
              handleInputChange={onInputChange}
              handleBlur={onBlur}
            />
          </div>
          <InputField
            label="IMEI Number"
            name="imeiNumber"
            placeholder="Enter device IMEI number"
            icon={Hash}
            helpText="15-digit IMEI number (for mobile devices). Found in device settings or on the box"
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
          />
          <InputField
            label="Device Price/Cost"
            name="devicePrice"
            type="text"
            placeholder="999.99"
            icon={DollarSign}
            helpText="Enter the original purchase price or current value of your device. Premium will be calculated based on the selected pricing plan."
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
          />
          {formData.devicePrice && selectedPricingPlan && monthlyPremium > 0 && (
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
              <p className="text-sm text-slate-300 mb-1">Estimated Monthly Premium:</p>
              <p className="text-2xl font-bold text-blue-400">{formatCurrency(monthlyPremium)}/month</p>
              <p className="text-xs text-slate-400 mt-1">Based on {selectedPricingPlan.cover_percentage}% of device value</p>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onStepChange(2)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onStepChange(4)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm space-y-6">
          <h2 className="text-3xl font-bold mb-6">Select Pricing Plan</h2>
          
          {loadingPlans ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <p className="text-slate-400">Loading pricing plans...</p>
            </div>
          ) : pricingPlans.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No pricing plans available</p>
              {errors.pricingPlan && (
                <p className="text-red-400 text-sm">{errors.pricingPlan}</p>
              )}
            </div>
          ) : (
            <>
              <p className="text-slate-300 mb-6">Choose a pricing plan that suits your needs:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pricingPlans.map((plan) => {
                  const deviceValue = parseFloat(formData.devicePrice) || 0;
                  const premium = Math.round(deviceValue * (plan.cover_percentage / 100));
                  const isSelected = selectedPricingPlan?.id === plan.id;
                  
                  return (
                    <button
                      key={plan.id}
                      onClick={() => onPricingPlanSelect(plan)}
                      className={`text-left bg-white/5 rounded-xl p-6 transition-all ${
                        isSelected 
                          ? 'bg-blue-500/20 border-2 border-blue-500 scale-105' 
                          : 'border border-white/20 hover:bg-white/10 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{plan.cover_type}</h3>
                        {isSelected && <Check className="w-6 h-6 text-blue-400" />}
                      </div>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-blue-400 mb-2">
                          {formatCurrency(premium)}/month
                        </div>
                        <div className="text-sm text-slate-400">
                          {plan.cover_percentage}% of device value
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-sm font-semibold mb-2 text-slate-300">Coverage includes:</p>
                        <ul className="space-y-1 text-sm text-slate-400">
                          {plan.pricingcomponents?.map((component, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-400" />
                              {component.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.pricingPlan && (
                <div className="text-red-400 text-sm mt-2">{errors.pricingPlan}</div>
              )}
            </>
          )}
          
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onStepChange(3)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onStepChange(5)}
              disabled={!selectedPricingPlan}
              className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all ${
                selectedPricingPlan
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm space-y-6">
          <h2 className="text-3xl font-bold mb-6">Payment Information</h2>
          
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-300 mb-2">Payment Method: Mpesa</p>
            <p className="text-xs text-slate-400">We'll process your payment through Mpesa</p>
          </div>
          
          <InputField
            label="Mpesa Account Name"
            name="paymentAccountName"
            placeholder="Enter the name on your Mpesa account"
            icon={User}
            helpText="The name registered on your Mpesa account"
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
            required
          />
          
          <InputField
            label="Mpesa Phone Number"
            name="mpesaPhoneNumber"
            placeholder="0712345678"
            icon={Phone}
            helpText="Enter the phone number linked to your Mpesa account"
            formData={formData}
            errors={errors}
            touched={touched}
            handleInputChange={onInputChange}
            handleBlur={onBlur}
            required
          />
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onStepChange(4)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onStepChange(6)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Review & Confirm
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">Review Your Policy</h2>
          <div className="space-y-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Name:</span>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Email:</span>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400">Gender:</span>
                  <p className="font-medium">{formData.gender}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">ID / Passport Number:</span>
                  <p className="font-medium">{formData.idNumber}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Device Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Device Type:</span>
                  <p className="font-medium">{devices.find(d => d.id === selectedDevice)?.name}</p>
                </div>
                <div>
                  <span className="text-slate-400">Brand:</span>
                  <p className="font-medium">{formData.deviceBrand}</p>
                </div>
                <div>
                  <span className="text-slate-400">Model:</span>
                  <p className="font-medium">{formData.deviceModel}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Description:</span>
                  <p className="font-medium">{formData.deviceDescription}</p>
                </div>
                <div>
                  <span className="text-slate-400">Purchase Date:</span>
                  <p className="font-medium">{new Date(formData.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-slate-400">Device Value:</span>
                  <p className="font-medium">{formatCurrency(parseFloat(formData.devicePrice))}</p>
                </div>
                <div>
                  <span className="text-slate-400">Serial Number:</span>
                  <p className="font-medium font-mono text-xs">{formData.serialNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400">IMEI Number:</span>
                  <p className="font-medium font-mono text-xs">{formData.imeiNumber}</p>
                </div>
              </div>
            </div>
            {selectedPricingPlan && (
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Selected Plan</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Cover Type:</span>
                    <p className="font-medium">{selectedPricingPlan.cover_type}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Cover Percentage:</span>
                    <p className="font-medium">{selectedPricingPlan.cover_percentage}%</p>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/50">
              <h3 className="font-bold text-lg mb-4">Premium Summary</h3>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Monthly Premium:</span>
                <span className="text-3xl font-bold text-blue-400">{formatCurrency(monthlyPremium)}</span>
              </div>
              {selectedPricingPlan && (
                <p className="text-xs text-slate-400 mt-2">
                  Premium calculated as {selectedPricingPlan.cover_percentage}% of device value
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onStepChange(5)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={onComplete}
              disabled={loading}
              className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-white/20 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Confirm & Purchase
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseFlow;
