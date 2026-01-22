import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { Owner } from '../types';

interface OwnerDetailsProps {
  owner: Owner;
  onUpdate: (owner: Owner) => void;
  onNext: () => void;
  onPrev: () => void;
}

const counties = [
  'Machakos', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kakamega', 'Nyeri',
  'Meru', 'Embu', 'Garissa', 'Wajir', 'Isiolo', 'Marsabit', 'Mandera', 'Turkana'
];

const occupations = [
  'Teacher', 'Doctor', 'Engineer', 'Lawyer', 'Accountant', 'Nurse', 'Police Officer',
  'Business Owner', 'Student', 'Farmer', 'Driver', 'Boda Boda Rider', 'Shop Keeper',
  'Government Employee', 'Other'
];

const OwnerDetails: React.FC<OwnerDetailsProps> = ({ owner, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState<Owner>(owner);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (Object.keys(formData).some(key => formData[key as keyof Owner] !== owner[key as keyof Owner])) {
        handleAutoSave();
      }
    }, 2000);

    return () => clearTimeout(saveTimeout);
  }, [formData]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onUpdate(formData);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Owner, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phone_number.replace(/\s/g, ''))) {
      newErrors.phone_number = 'Please enter a valid Kenyan phone number';
    }
    if (!formData.id_number.trim()) newErrors.id_number = 'ID number is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.county) newErrors.county = 'County is required';
    if (!formData.sub_county.trim()) newErrors.sub_county = 'Sub county is required';
    if (!formData.ward.trim()) newErrors.ward = 'Ward is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onUpdate(formData);
        onNext();
      } catch (error) {
        console.error('Submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const completedFields = Object.keys(formData).filter(key => 
    formData[key as keyof Owner] && formData[key as keyof Owner].toString().trim() !== ''
  ).length;
  const totalFields = Object.keys(formData).length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Owner Details</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Auto-save indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isSaving && (
              <>
                <div className="spinner"></div>
                <span>Saving...</span>
              </>
            )}
            {lastSaved && !isSaving && (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </>
            )}
          </div>
        </div>

        <div className="card p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    className={`form-input ${errors.first_name ? 'form-input-error' : ''}`}
                    placeholder="Enter your first name"
                    aria-describedby={errors.first_name ? 'first_name-error' : undefined}
                    aria-invalid={!!errors.first_name}
                  />
                  {errors.first_name && (
                    <p id="first_name-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.first_name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    className={`form-input ${errors.last_name ? 'form-input-error' : ''}`}
                    placeholder="Enter your last name"
                    aria-describedby={errors.last_name ? 'last_name-error' : undefined}
                    aria-invalid={!!errors.last_name}
                  />
                  {errors.last_name && (
                    <p id="last_name-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.last_name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    placeholder="Enter your email address"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    className={`form-input ${errors.phone_number ? 'form-input-error' : ''}`}
                    placeholder="0700000000 or +254700000000"
                    aria-describedby={errors.phone_number ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone_number}
                  />
                  {errors.phone_number && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.phone_number}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="id_number" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number *
                  </label>
                  <input
                    id="id_number"
                    type="text"
                    value={formData.id_number}
                    onChange={(e) => handleChange('id_number', e.target.value)}
                    className={`form-input ${errors.id_number ? 'form-input-error' : ''}`}
                    placeholder="Enter your ID number"
                    aria-describedby={errors.id_number ? 'id-error' : undefined}
                    aria-invalid={!!errors.id_number}
                  />
                  {errors.id_number && (
                    <p id="id-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.id_number}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleChange('date_of_birth', e.target.value)}
                    className={`form-input ${errors.date_of_birth ? 'form-input-error' : ''}`}
                    aria-describedby={errors.date_of_birth ? 'dob-error' : undefined}
                    aria-invalid={!!errors.date_of_birth}
                  />
                  {errors.date_of_birth && (
                    <p id="dob-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.date_of_birth}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={`form-input ${errors.gender ? 'form-input-error' : ''}`}
                    aria-describedby={errors.gender ? 'gender-error' : undefined}
                    aria-invalid={!!errors.gender}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p id="gender-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.gender}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address & Other Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Address Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={`form-input ${errors.address ? 'form-input-error' : ''}`}
                    placeholder="P.O. Box or physical address"
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p id="address-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                    County *
                  </label>
                  <select
                    id="county"
                    value={formData.county}
                    onChange={(e) => handleChange('county', e.target.value)}
                    className={`form-input ${errors.county ? 'form-input-error' : ''}`}
                    aria-describedby={errors.county ? 'county-error' : undefined}
                    aria-invalid={!!errors.county}
                  >
                    <option value="">Select county</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                  {errors.county && (
                    <p id="county-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.county}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="sub_county" className="block text-sm font-medium text-gray-700 mb-2">
                    Sub County *
                  </label>
                  <input
                    id="sub_county"
                    type="text"
                    value={formData.sub_county}
                    onChange={(e) => handleChange('sub_county', e.target.value)}
                    className={`form-input ${errors.sub_county ? 'form-input-error' : ''}`}
                    placeholder="Enter sub county"
                    aria-describedby={errors.sub_county ? 'sub_county-error' : undefined}
                    aria-invalid={!!errors.sub_county}
                  />
                  {errors.sub_county && (
                    <p id="sub_county-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.sub_county}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                    Ward *
                  </label>
                  <input
                    id="ward"
                    type="text"
                    value={formData.ward}
                    onChange={(e) => handleChange('ward', e.target.value)}
                    className={`form-input ${errors.ward ? 'form-input-error' : ''}`}
                    placeholder="Enter ward"
                    aria-describedby={errors.ward ? 'ward-error' : undefined}
                    aria-invalid={!!errors.ward}
                  />
                  {errors.ward && (
                    <p id="ward-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.ward}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation *
                  </label>
                  <select
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    className={`form-input ${errors.occupation ? 'form-input-error' : ''}`}
                    aria-describedby={errors.occupation ? 'occupation-error' : undefined}
                    aria-invalid={!!errors.occupation}
                  >
                    <option value="">Select occupation</option>
                    {occupations.map(occupation => (
                      <option key={occupation} value={occupation}>{occupation}</option>
                    ))}
                  </select>
                  {errors.occupation && (
                    <p id="occupation-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.occupation}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    disabled
                    className="form-input bg-gray-100"
                    aria-describedby="country-help"
                  />
                  <p id="country-help" className="text-sm text-gray-500 mt-1">
                    Currently only available in Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={onPrev}
              className="btn-secondary"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue to Pet Details</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;