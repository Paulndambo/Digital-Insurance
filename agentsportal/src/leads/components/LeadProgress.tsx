import React from 'react';
import { Lead, LeadStatus } from '../types';

interface LeadProgressProps {
  lead: Lead;
  onStatusChange: (newStatus: LeadStatus) => void;
}

const LeadProgress: React.FC<LeadProgressProps> = ({ lead, onStatusChange }) => {
  const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed'];
  const stageValues = ['new', 'contacted', 'qualified', 'proposal', 'closed'] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Lead Progress</h2>
        <select
          onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue={lead.status}
        >
          {stages.map((stage, index) => (
            <option key={stage} value={stageValues[index]}>
              {stage}
            </option>
          ))}
        </select>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {stages.map((stage, index) => (
            <div key={stage} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= stageValues.indexOf(lead.status)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs text-gray-500 mt-1">{stage}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: `${(stageValues.indexOf(lead.status) + 1) * 25}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LeadProgress; 