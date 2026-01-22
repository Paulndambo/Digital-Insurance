import React from 'react';
import { User, Clock, MessageSquare, FileText } from 'lucide-react';

export type TabId = 'overview' | 'activity' | 'notes' | 'documents';

interface Tab {
  id: TabId;
  name: string;
  icon: any;
}

interface LeadTabsProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  children: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'overview', name: 'Overview', icon: User },
  { id: 'activity', name: 'Activity', icon: Clock },
  { id: 'notes', name: 'Notes', icon: MessageSquare },
  { id: 'documents', name: 'Documents', icon: FileText }
];

const LeadTabs: React.FC<LeadTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default LeadTabs; 