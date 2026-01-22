import { Lead } from './types';

export const createMockLead = (id: string): Lead => ({
  id,
  name: 'Alice Cooper',
  email: 'alice.cooper@email.com',
  phone: '+1 (555) 111-2222',
  interestedIn: 'Home Insurance',
  status: 'qualified',
  priority: 'high',
  source: 'Website',
  createdDate: '2024-03-16',
  lastContact: '2024-03-16',
  address: '123 Main St, Anytown, ST 12345',
  occupation: 'Marketing Manager',
  company: 'Tech Solutions Inc.',
  estimatedBudget: '$800-1200/year',
  currentInsurance: 'None',
  leadScore: 85,
  nextFollowUp: '2024-03-20',
  notes: [
    {
      id: 1,
      content: 'Initial inquiry about home insurance for new property purchase. Client seems very interested and has done their research.',
      date: '2024-03-16',
      author: 'John Smith',
      type: 'general'
    },
    {
      id: 2,
      content: 'Client mentioned they are closing on the house next month. Need to follow up with specific coverage recommendations.',
      date: '2024-03-16',
      author: 'John Smith',
      type: 'important'
    }
  ],
  activities: [
    {
      id: 1,
      type: 'call',
      description: 'Initial phone call - discussed requirements and timeline',
      date: '2024-03-16',
      time: '2:30 PM',
      duration: '15 min',
      outcome: 'positive'
    },
    {
      id: 2,
      type: 'email',
      description: 'Sent welcome email with company brochure and initial quote',
      date: '2024-03-16',
      time: '3:15 PM',
      outcome: 'sent'
    },
    {
      id: 3,
      type: 'meeting',
      description: 'Scheduled follow-up meeting for next week',
      date: '2024-03-17',
      time: '10:00 AM',
      outcome: 'scheduled'
    }
  ]
}); 