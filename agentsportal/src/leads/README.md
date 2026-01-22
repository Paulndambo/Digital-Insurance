# Leads Module

This folder contains all the leads-related functionality for the insurance agent portal, organized with proper separation of concerns.

## 📁 Folder Structure

```
src/leads/
├── README.md                 # This documentation
├── index.ts                  # Main exports
├── types.ts                  # TypeScript interfaces and types
├── utils.ts                  # Utility functions and helpers
├── mockData.ts              # Mock data for development
├── LeadDetail.tsx           # Main lead detail page component
├── LeadsList.tsx            # Leads list/table component
└── components/
    ├── LeadHeader.tsx        # Lead detail page header
    ├── LeadProgress.tsx      # Progress bar component
    ├── LeadTabs.tsx          # Tab navigation component
    ├── ActivityModal.tsx     # Activity logging modal
    └── tabs/
        ├── OverviewTab.tsx   # Overview tab content
        ├── ActivityTab.tsx   # Activity timeline tab
        ├── NotesTab.tsx      # Notes and comments tab
        └── DocumentsTab.tsx  # Documents tab content
```

## 🧩 Components

### Core Components

- **LeadDetail**: Main lead detail page component with full functionality
- **LeadsList**: Leads list/table component with search and filtering
- **LeadHeader**: Displays lead information, status, and priority in the header
- **LeadProgress**: Shows lead progression through sales stages with interactive progress bar
- **LeadTabs**: Handles tab navigation between different sections
- **ActivityModal**: Modal form for logging new activities

### Tab Components

- **OverviewTab**: Contact information, personal details, and quick actions
- **ActivityTab**: Activity timeline with logging functionality
- **NotesTab**: Notes management with add/edit/delete capabilities
- **DocumentsTab**: Document upload and management (placeholder)

## 🔧 Usage

### Basic Import

```typescript
import {
  LeadDetail,
  LeadsList,
  LeadHeader,
  LeadProgress,
  LeadTabs,
  ActivityModal,
  OverviewTab,
  ActivityTab,
  NotesTab,
  DocumentsTab,
  type Lead,
  type LeadStatus,
  type ActivityFormData
} from '../leads';
```

### Using Components

```typescript
// Using the main components
import { LeadDetail, LeadsList } from '../leads';

// In your App.tsx or router
<Route path="/leads" element={<LeadsList />} />
<Route path="/leads/:id" element={<LeadDetail />} />

// Using individual components
const CustomLeadDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showActivityModal, setShowActivityModal] = useState(false);
  
  return (
    <div>
      <LeadHeader lead={lead} />
      <LeadProgress lead={lead} onStatusChange={handleStatusChange} />
      
      <LeadTabs activeTab={activeTab} onTabChange={setActiveTab}>
        <OverviewTab lead={lead} />
      </LeadTabs>
      
      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        formData={activityForm}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
```

## 📊 Types

### Lead Interface

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  status: LeadStatus;
  priority: LeadPriority;
  // ... other properties
}
```

### Activity Form Data

```typescript
interface ActivityFormData {
  type: ActivityType;
  description: string;
  outcome: ActivityOutcome;
  duration: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
}
```

## 🛠️ Utilities

### Color Helpers

- `getStatusColor(status)`: Returns CSS classes for status styling
- `getPriorityColor(priority)`: Returns CSS classes for priority styling
- `getActivityColor(type)`: Returns CSS classes for activity type styling
- `getOutcomeColor(outcome)`: Returns CSS classes for outcome styling

### Icon Helpers

- `getActivityIcon(type)`: Returns the appropriate Lucide icon for activity type

### Formatting Helpers

- `formatDate(dateString)`: Formats date strings for display
- `formatDateTime(dateString, timeString)`: Formats date and time for display

## 🎨 Design System

All components follow the established design system with:
- Consistent spacing and typography
- Tailwind CSS classes
- Responsive design
- Accessibility considerations
- Professional color scheme

## 🔄 State Management

The components use React hooks for local state management:
- Form state for activity logging
- Tab navigation state
- Modal visibility state
- Note management state

## 🚀 Future Enhancements

- Add real API integration
- Implement document upload functionality
- Add lead scoring algorithms
- Create lead analytics dashboard
- Add email integration
- Implement lead assignment features 