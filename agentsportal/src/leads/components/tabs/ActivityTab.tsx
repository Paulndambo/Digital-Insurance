import React from 'react';
import { Plus } from 'lucide-react';
import { Lead } from '../../types';
import { getActivityIcon, getActivityColor, getOutcomeColor, formatDate } from '../../utils';

interface ActivityTabProps {
  lead: Lead;
  onLogActivity: () => void;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ lead, onLogActivity }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        <button 
          onClick={onLogActivity}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {lead.activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{formatDate(activity.date)}</span>
                  {activity.duration && <span>• {activity.duration}</span>}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(activity.outcome)}`}>
                    {activity.outcome}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTab; 