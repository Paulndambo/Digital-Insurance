import React from 'react';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon: Icon,
  helpText,
  maxLength,
  required = true,
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur,
}) => {
  const hasError = touched[name] && errors[name];
  const isValid  = touched[name] && formData[name] && !errors[name];

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-slate-300" htmlFor={name}>
          {label}
        </label>
        {required && <span className="text-rose-400 text-sm leading-none">*</span>}
        {helpText && (
          <div className="relative group ml-auto">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help hover:text-slate-300 transition-colors" />
            <div className="absolute right-0 bottom-full mb-2 w-60 p-3 bg-slate-800/95 backdrop-blur-sm text-xs text-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-white/10 leading-relaxed">
              {helpText}
              <div className="absolute right-1 -bottom-1 w-2 h-2 bg-slate-800 border-r border-b border-white/10 rotate-45" />
            </div>
          </div>
        )}
      </div>

      {/* Input wrapper */}
      <div className="relative">
        {Icon && (
          <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            hasError ? 'text-rose-400' : isValid ? 'text-emerald-400' : 'text-slate-500'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`
            w-full rounded-xl border transition-all duration-200 text-sm text-white
            min-h-[46px] py-3 pr-10
            ${Icon ? 'pl-10' : 'pl-4'}
            placeholder:text-slate-600
            focus:outline-none focus:ring-2
            ${hasError
              ? 'bg-rose-500/8 border-rose-500/40 focus:ring-rose-500/30 focus:border-rose-500/60'
              : isValid
              ? 'bg-emerald-500/5 border-emerald-500/30 focus:ring-emerald-500/20 focus:border-emerald-500/50'
              : 'bg-white/5 border-white/10 hover:border-white/20 focus:ring-blue-500/25 focus:border-blue-500/50 focus:bg-white/8'
            }
          `}
        />

        {/* Right status icon */}
        {isValid && !hasError && (
          <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
        )}
        {hasError && (
          <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={`${name}-error`} className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default InputField;
