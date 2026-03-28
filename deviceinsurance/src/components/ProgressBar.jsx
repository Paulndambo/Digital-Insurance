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
    <div className="w-full mb-8 sm:mb-10">
      {/* Step bubbles */}
      <div className="flex items-start justify-between gap-1">
        {stepConfig.map(({ label, icon: StepIcon }, idx) => {
          const num    = idx + 1;
          const done   = step > num;
          const active = step === num;

          return (
            <div key={num} className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`
                  w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
                  font-bold transition-all duration-300
                  ${done
                    ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white shadow-md shadow-primary-900/30'
                    : active
                    ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-900/40 ring-4 ring-primary-400/25 scale-105'
                    : 'bg-white/[0.06] border border-white/10 text-slate-600'
                  }
                `}
              >
                {done
                  ? <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  : <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                }
              </div>
              <span className={`
                text-[9px] sm:text-[10px] font-medium tracking-wide leading-tight text-center hidden sm:block transition-colors duration-200
                ${active ? 'text-primary-400' : done ? 'text-slate-500' : 'text-slate-700'}
              `}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar + text */}
      <div className="mt-4 space-y-1.5">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Step {step} of {totalSteps}</span>
          <span className="font-semibold text-primary-400">{Math.round(pct)}% complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
