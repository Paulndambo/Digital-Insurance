import React from 'react';
import { Check, ShoppingBag, User, Package, CreditCard, Shield, ClipboardList, Heart } from 'lucide-react';

const stepConfig = [
  { label: 'Item',        icon: ShoppingBag },
  { label: 'Info',        icon: User },
  { label: 'Details',     icon: Package },
  { label: 'Plan',        icon: Shield },
  { label: 'Beneficiary', icon: Heart },
  { label: 'Payment',     icon: CreditCard },
  { label: 'Review',      icon: ClipboardList },
];

const ProgressBar = ({ step, totalSteps = 7 }) => {
  const pct = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
      {/* Step track */}
      <div className="flex items-center justify-between relative">
        {/* Connector background */}
        <div className="absolute top-5 sm:top-6 left-5 right-5 h-0.5 bg-white/10 z-0" />
        {/* Connector fill */}
        <div
          className="absolute top-5 sm:top-6 left-5 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out z-0"
          style={{ width: `calc(${pct}% * (100% - 2.5rem) / 100)` }}
        />

        {stepConfig.map(({ label, icon: StepIcon }, idx) => {
          const num    = idx + 1;
          const done   = step > num;
          const active = step === num;

          return (
            <div key={num} className="flex flex-col items-center z-10 relative">
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                  font-bold transition-all duration-300 text-sm
                  ${done
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : active
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-xl shadow-blue-500/40 ring-4 ring-blue-400/30 scale-110'
                    : 'bg-white/8 border border-white/15 text-slate-500'
                  }
                `}
              >
                {done
                  ? <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  : <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                }
              </div>

              {/* Label */}
              <span className={`
                mt-2 text-[10px] sm:text-xs font-medium tracking-wide hidden sm:block transition-colors duration-200
                ${active ? 'text-blue-400' : done ? 'text-slate-400' : 'text-slate-600'}
              `}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress text */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Step {step} of {totalSteps}</span>
        <span className="font-semibold text-blue-400">{Math.round(pct)}% complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
