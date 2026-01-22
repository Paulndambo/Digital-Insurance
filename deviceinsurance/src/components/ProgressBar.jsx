import React from 'react';
import { Check } from 'lucide-react';

const ProgressBar = ({ step, totalSteps = 6 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const stepLabels = ['Select', 'Info', 'Device', 'Plan', 'Payment', 'Done'];
  
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {steps.map((num) => (
          <div key={num} className="flex flex-col items-center z-10 relative group">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              step >= num 
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110 shadow-lg ring-2 ring-blue-400' 
                : 'bg-white/10 text-slate-400 hover:bg-white/20'
            }`}>
              {step > num ? <Check className="w-6 h-6 md:w-7 md:h-7" /> : num}
            </div>
            <span className="text-xs mt-2 text-slate-400 hidden sm:block font-medium">
              {stepLabels[num - 1]}
            </span>
            {num === step && (
              <div className="absolute -bottom-8 text-xs text-blue-400 font-medium hidden lg:block">
                {Math.round(((num - 1) / (totalSteps - 1)) * 100)}% Complete
              </div>
            )}
          </div>
        ))}
        <div className="absolute top-6 md:top-7 left-0 right-0 h-1 bg-white/10 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
