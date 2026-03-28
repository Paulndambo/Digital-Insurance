import React, { useState } from 'react';
import { PlusCircle, Loader2, CheckCircle } from 'lucide-react';
import { createDeviceOutlet } from '../utils/api';

const emptyForm = () => ({
  agent_type: 'Seller',
  outlet_number: '',
  name: '',
  email: '',
  phone_number: '',
  website: '',
  location: '',
  city: '',
  country: 'Kenya',
});

function normalizeWebsite(value) {
  const t = value.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function buildPayload(form) {
  const payload = {
    agent_type: form.agent_type,
    name: form.name.trim(),
    phone_number: form.phone_number.trim(),
    location: form.location.trim(),
    city: form.city.trim(),
    country: (form.country || 'Kenya').trim() || 'Kenya',
  };
  const on = form.outlet_number.trim();
  if (on) payload.outlet_number = on;
  const em = form.email.trim();
  if (em) payload.email = em;
  const web = normalizeWebsite(form.website);
  if (web) payload.website = web;
  return payload;
}

const DeviceOutletRegisterForm = ({ accessToken, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (!form.name.trim() || !form.phone_number.trim() || !form.location.trim() || !form.city.trim()) {
      setFormError('Name, phone, location, and city are required.');
      return;
    }
    setSubmitting(true);
    try {
      await createDeviceOutlet(buildPayload(form), accessToken);
      setForm(emptyForm());
      setFormSuccess('Outlet registered successfully.');
      onSuccess?.();
    } catch (err) {
      setFormError(err.message || 'Failed to register outlet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl mb-6 backdrop-blur-sm border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setFormError('');
          setFormSuccess('');
        }}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-white">
          <PlusCircle className="w-5 h-5 text-blue-400" />
          Register a device outlet
        </span>
        <span className="text-slate-400 text-sm">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 pt-0 border-t border-white/10 space-y-4">
          {formSuccess && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {formSuccess}
            </div>
          )}
          {formError && (
            <p className="text-red-400 text-sm">{formError}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Agent type</span>
              <select
                value={form.agent_type}
                onChange={update('agent_type')}
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="Seller">Seller</option>
                <option value="Repair">Repair</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Outlet number (optional)</span>
              <input
                type="text"
                value={form.outlet_number}
                onChange={update('outlet_number')}
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="e.g. OUT-001"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Outlet name</span>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                required
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="Business or branch name"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Phone</span>
              <input
                type="tel"
                value={form.phone_number}
                onChange={update('phone_number')}
                required
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Email (optional)</span>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Website (optional)</span>
              <input
                type="text"
                value={form.website}
                onChange={update('website')}
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="https:// or domain only"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Street / location</span>
              <input
                type="text"
                value={form.location}
                onChange={update('location')}
                required
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">City</span>
              <input
                type="text"
                value={form.city}
                onChange={update('city')}
                required
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Country</span>
              <input
                type="text"
                value={form.country}
                onChange={update('country')}
                className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Submit registration
          </button>
        </form>
      )}
    </div>
  );
};

export default DeviceOutletRegisterForm;
