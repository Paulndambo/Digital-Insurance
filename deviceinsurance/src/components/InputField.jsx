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
  handleBlur 
}) => {
  const hasError = touched[name] && errors[name];
  const isValid = touched[name] && formData[name] && !errors[name];

  return (
    <div>
      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
        {label}
        {required && <span className="text-red-400">*</span>}
        {helpText && (
          <div className="relative group">
            <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-slate-800 text-xs text-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-slate-700">
              {helpText}
            </div>
          </div>
        )}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
            hasError ? 'text-red-400' : isValid ? 'text-green-400' : 'text-slate-400'
          }`} />
        )}
        <input
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          className={`w-full bg-white/10 border rounded-lg transition-all duration-200 ${
            Icon ? 'pl-12' : 'pl-4'
          } pr-4 py-3 focus:outline-none focus:ring-2 ${
            hasError 
              ? 'border-red-400/50 focus:ring-red-500 bg-red-500/10' 
              : isValid
              ? 'border-green-400/50 focus:ring-green-500'
              : 'border-white/20 focus:ring-blue-500 hover:border-white/30'
          } placeholder-slate-500`}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        {isValid && (
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
        )}
      </div>
      {hasError && (
        <div id={`${name}-error`} className="mt-2 flex items-center gap-1 text-sm text-red-400" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
