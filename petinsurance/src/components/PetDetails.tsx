import React, { useState } from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { Pet } from '../types';

interface PetDetailsProps {
  pets: Pet[];
  onUpdate: (pets: Pet[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'guinea_pig', 'other'];
const coverTypes = [
  { id: 'accident_only', name: 'Accident Only', baseAmount: 150000, basePremium: 250 },
  { id: 'essential', name: 'Essential', baseAmount: 300000, basePremium: 400 },
  { id: 'comprehensive', name: 'Comprehensive', baseAmount: 500000, basePremium: 600 }
];

const dogBreeds = [
  'German Shepherd', 'Labrador Retriever', 'Golden Retriever', 'Bulldog', 'Beagle',
  'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Mixed Breed', 'Other'
];

const catBreeds = [
  'Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Ragdoll',
  'Bengal', 'Abyssinian', 'Russian Blue', 'Mixed Breed', 'Other'
];

const PetDetails: React.FC<PetDetailsProps> = ({ pets, onUpdate, onNext, onPrev }) => {
  const [petList, setPetList] = useState<Pet[]>(pets.length > 0 ? pets : [createEmptyPet()]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

  function createEmptyPet(): Pet {
    return {
      name: '',
      type: '',
      breed: '',
      gender: '',
      date_of_birth: '',
      microchip_number: '',
      cover_type: '',
      neutered: false,
      vaccinated: false,
      cover_amount: 0,
      premium: 0,
      ownership_document: ''
    };
  }

  const addPet = () => {
    setPetList([...petList, createEmptyPet()]);
  };

  const removePet = (index: number) => {
    if (petList.length > 1) {
      const newPetList = petList.filter((_, i) => i !== index);
      setPetList(newPetList);
      
      // Remove errors for deleted pet
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updatePet = (index: number, field: keyof Pet, value: any) => {
    const newPetList = [...petList];
    newPetList[index] = { ...newPetList[index], [field]: value };

    // Update cover amount and premium based on cover type
    if (field === 'cover_type') {
      const coverType = coverTypes.find(ct => ct.id === value);
      if (coverType) {
        newPetList[index].cover_amount = coverType.baseAmount;
        newPetList[index].premium = coverType.basePremium;
      }
    }

    setPetList(newPetList);

    // Clear error for this field
    if (errors[index]?.[field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<number, Record<string, string>> = {};

    petList.forEach((pet, index) => {
      const petErrors: Record<string, string> = {};

      if (!pet.name.trim()) petErrors.name = 'Pet name is required';
      if (!pet.type) petErrors.type = 'Pet type is required';
      if (!pet.breed) petErrors.breed = 'Breed is required';
      if (!pet.gender) petErrors.gender = 'Gender is required';
      if (!pet.date_of_birth) petErrors.date_of_birth = 'Date of birth is required';
      if (!pet.cover_type) petErrors.cover_type = 'Cover type is required';

      if (Object.keys(petErrors).length > 0) {
        newErrors[index] = petErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onUpdate(petList);
      onNext();
    }
  };

  const getBreedOptions = (petType: string) => {
    switch (petType) {
      case 'dog':
        return dogBreeds;
      case 'cat':
        return catBreeds;
      default:
        return ['Mixed Breed', 'Other'];
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Pet Details</h2>
          </div>
          <button
            onClick={addPet}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Pet</span>
          </button>
        </div>

        <div className="space-y-8">
          {petList.map((pet, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 relative">
              {petList.length > 1 && (
                <button
                  onClick={() => removePet(index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pet {index + 1} {pet.name && `- ${pet.name}`}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Name *
                    </label>
                    <input
                      type="text"
                      value={pet.name}
                      onChange={(e) => updatePet(index, 'name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter pet name"
                    />
                    {errors[index]?.name && <p className="text-red-500 text-sm mt-1">{errors[index].name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Type *
                    </label>
                    <select
                      value={pet.type}
                      onChange={(e) => updatePet(index, 'type', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select pet type</option>
                      {petTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                    {errors[index]?.type && <p className="text-red-500 text-sm mt-1">{errors[index].type}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breed *
                    </label>
                    <select
                      value={pet.breed}
                      onChange={(e) => updatePet(index, 'breed', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.breed ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={!pet.type}
                    >
                      <option value="">Select breed</option>
                      {pet.type && getBreedOptions(pet.type).map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                      ))}
                    </select>
                    {errors[index]?.breed && <p className="text-red-500 text-sm mt-1">{errors[index].breed}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      value={pet.gender}
                      onChange={(e) => updatePet(index, 'gender', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors[index]?.gender && <p className="text-red-500 text-sm mt-1">{errors[index].gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={pet.date_of_birth}
                      onChange={(e) => updatePet(index, 'date_of_birth', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.date_of_birth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[index]?.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors[index].date_of_birth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Microchip Number
                    </label>
                    <input
                      type="text"
                      value={pet.microchip_number}
                      onChange={(e) => updatePet(index, 'microchip_number', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter microchip number (optional)"
                    />
                  </div>
                </div>

                {/* Coverage Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage Type *
                    </label>
                    <select
                      value={pet.cover_type}
                      onChange={(e) => updatePet(index, 'cover_type', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.cover_type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select coverage type</option>
                      {coverTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                    {errors[index]?.cover_type && <p className="text-red-500 text-sm mt-1">{errors[index].cover_type}</p>}
                  </div>

                  {pet.cover_type && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-blue-900">Coverage Amount:</span>
                        <span className="text-lg font-bold text-blue-900">
                          KSh {pet.cover_amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-900">Monthly Premium:</span>
                        <span className="text-lg font-bold text-blue-900">
                          KSh {pet.premium.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`neutered-${index}`}
                        checked={pet.neutered}
                        onChange={(e) => updatePet(index, 'neutered', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`neutered-${index}`} className="ml-2 text-sm text-gray-700">
                        Pet is spayed/neutered
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`vaccinated-${index}`}
                        checked={pet.vaccinated}
                        onChange={(e) => updatePet(index, 'vaccinated', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`vaccinated-${index}`} className="ml-2 text-sm text-gray-700">
                        Pet is up to date with vaccinations
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Payment Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;