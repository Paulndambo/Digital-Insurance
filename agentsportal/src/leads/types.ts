export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: string;
  createdDate: string;
  lastContact: string;
  address: string;
  occupation: string;
  company: string;
  estimatedBudget: string;
  currentInsurance: string;
  leadScore: number;
  nextFollowUp: string;
  notes: LeadNote[];
  activities: LeadActivity[];
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
export type LeadPriority = 'high' | 'medium' | 'low';

export interface LeadNote {
  id: number;
  content: string;
  date: string;
  author: string;
  type: 'general' | 'important';
}

export interface LeadActivity {
  id: number;
  type: ActivityType;
  description: string;
  date: string;
  time: string;
  duration?: string;
  outcome: ActivityOutcome;
}

export type ActivityType = 'call' | 'email' | 'meeting' | 'text' | 'quote' | 'proposal';
export type ActivityOutcome = 'positive' | 'neutral' | 'negative' | 'scheduled' | 'sent';

export interface ActivityFormData {
  type: ActivityType;
  description: string;
  outcome: ActivityOutcome;
  duration: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
}

export interface ActivityTypeOption {
  value: ActivityType;
  label: string;
  icon: any; // Lucide icon component
}

export interface OutcomeOption {
  value: ActivityOutcome;
  label: string;
  icon: any; // Lucide icon component
  color: string;
} 