import { Phone, Mail, Calendar, MessageSquare, FileText, CheckCircle2, XCircle, Clock as ClockIcon } from 'lucide-react';
import { LeadStatus, LeadPriority, ActivityType, ActivityOutcome, ActivityTypeOption, OutcomeOption } from './types';

export const getStatusColor = (status: LeadStatus): string => {
  switch (status) {
    case 'new':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'contacted':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'qualified':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'proposal':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'closed':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const getPriorityColor = (priority: LeadPriority): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'call':
      return Phone;
    case 'email':
      return Mail;
    case 'meeting':
      return Calendar;
    case 'text':
      return MessageSquare;
    case 'quote':
    case 'proposal':
      return FileText;
    default:
      return MessageSquare;
  }
};

export const getActivityColor = (type: ActivityType): string => {
  switch (type) {
    case 'call':
      return 'bg-green-100 text-green-600';
    case 'email':
      return 'bg-blue-100 text-blue-600';
    case 'meeting':
      return 'bg-purple-100 text-purple-600';
    case 'text':
      return 'bg-gray-100 text-gray-600';
    case 'quote':
    case 'proposal':
      return 'bg-orange-100 text-orange-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getOutcomeColor = (outcome: ActivityOutcome): string => {
  switch (outcome) {
    case 'positive':
      return 'bg-green-100 text-green-700';
    case 'neutral':
      return 'bg-yellow-100 text-yellow-700';
    case 'negative':
      return 'bg-red-100 text-red-700';
    case 'scheduled':
      return 'bg-blue-100 text-blue-700';
    case 'sent':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const activityTypes: ActivityTypeOption[] = [
  { value: 'call', label: 'Phone Call', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'meeting', label: 'Meeting', icon: Calendar },
  { value: 'text', label: 'Text Message', icon: MessageSquare },
  { value: 'quote', label: 'Quote Sent', icon: FileText },
  { value: 'proposal', label: 'Proposal Sent', icon: FileText }
];

export const outcomeOptions: OutcomeOption[] = [
  { value: 'positive', label: 'Positive', icon: CheckCircle2, color: 'text-green-600' },
  { value: 'neutral', label: 'Neutral', icon: ClockIcon, color: 'text-yellow-600' },
  { value: 'negative', label: 'Negative', icon: XCircle, color: 'text-red-600' },
  { value: 'scheduled', label: 'Scheduled', icon: Calendar, color: 'text-blue-600' }
];

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} at ${timeString}`;
}; 