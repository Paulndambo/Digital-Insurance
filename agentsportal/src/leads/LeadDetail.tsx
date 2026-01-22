import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Lead,
  LeadStatus,
  ActivityFormData,
  TabId,
  LeadHeader,
  LeadProgress,
  LeadTabs,
  ActivityModal,
  OverviewTab,
  ActivityTab,
  NotesTab,
  DocumentsTab,
  createMockLead
} from './index';

const LeadDetail: React.FC = () => {
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityForm, setActivityForm] = useState<ActivityFormData>({
    type: 'call',
    description: '',
    outcome: 'positive',
    duration: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: ''
  });

  // Mock data - in real app, this would be fetched based on ID
  const lead = createMockLead(id || '');

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
      alert('Note added successfully!');
    }
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    console.log('Changing status to:', newStatus);
    alert(`Status changed to ${newStatus}`);
  };

  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging activity:', activityForm);
    
    // In real app, this would make an API call
    alert('Activity logged successfully!');
    
    // Reset form and close modal
    setActivityForm({
      type: 'call',
      description: '',
      outcome: 'positive',
      duration: '',
      scheduledDate: '',
      scheduledTime: '',
      notes: ''
    });
    setShowActivityModal(false);
  };

  const handleActivityFormChange = (field: string, value: string) => {
    setActivityForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab lead={lead} />;
      case 'activity':
        return <ActivityTab lead={lead} onLogActivity={() => setShowActivityModal(true)} />;
      case 'notes':
        return (
          <NotesTab
            lead={lead}
            newNote={newNote}
            onNewNoteChange={setNewNote}
            onAddNote={handleAddNote}
          />
        );
      case 'documents':
        return <DocumentsTab />;
      default:
        return <OverviewTab lead={lead} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LeadHeader lead={lead} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeadProgress lead={lead} onStatusChange={handleStatusChange} />

        <LeadTabs activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </LeadTabs>
      </div>

      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        formData={activityForm}
        onFormChange={handleActivityFormChange}
        onSubmit={handleActivitySubmit}
      />
    </div>
  );
};

export default LeadDetail;