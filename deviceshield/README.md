# DeviceShield - Insurance Management App

A comprehensive React Native mobile application built with Expo for managing device insurance policies, claims, and customer information for an insurtech company.

## Features

### 🏠 Home Screen
- **Welcome Section**: Personalized greeting with user information
- **Quick Metrics Dashboard**: 
  - Active policies count
  - Pending claims count
  - Total coverage amount
  - Number of protected devices
- **Quick Actions**: Fast access to common tasks
  - Create new policy
  - File a claim
  - View policies
  - Contact support
- **Recent Activity**: Timeline of recent claims and policy updates

### 🛡️ Policies Screen
- **Active Policies List**: View all active insurance policies with details
  - Device information
  - Policy number and type
  - Coverage details
  - Premium amount
  - Expiration date
  - Coverage icons (damage, theft, liquid, screen)
- **Available Plans**: Browse and purchase new insurance plans
  - Basic Protection ($9.99/month)
  - Standard Protection ($19.99/month)
  - Premium Protection ($29.99/month)
- **Plan Comparison**: Detailed feature lists for each plan
- **Purchase Flow**: Modal-based purchase interface

### 📋 Claims Screen
- **Claims Dashboard**: Summary of pending, approved, and rejected claims
- **Claims List**: View all claims with status badges
  - Claim number and device
  - Claim type (damage, theft, malfunction, other)
  - Description and dates
  - Approval status and amounts
- **File New Claim**: 
  - Select policy
  - Choose claim type
  - Add description
  - Submit for review

### 👤 Profile Screen
- **User Information**: Display personal details
  - Name and avatar
  - Email and phone
  - Address
  - Member since date
- **Statistics**: Quick stats overview
  - Active policies
  - Total claims
  - Approved claims
- **Contact Information**: Detailed contact card
- **Settings Menu**:
  - Account settings
  - Support options
  - App preferences
  - Terms and privacy
- **Logout Option**

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab navigation
- **Language**: TypeScript
- **UI Components**: Custom components with themed styling
- **State Management**: React Context API
- **Icons**: Lucide React Native (cross-platform)

## Project Structure

```
deviceshield/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen
│   │   ├── policies.tsx       # Policies screen
│   │   ├── claims.tsx         # Claims screen
│   │   ├── profile.tsx        # Profile screen
│   │   └── _layout.tsx        # Tab navigation layout
│   ├── _layout.tsx            # Root layout
│   └── modal.tsx              # Modal screen
├── components/
│   ├── ui/
│   │   ├── card.tsx           # Card component
│   │   ├── button.tsx         # Button component
│   │   ├── badge.tsx          # Badge component
│   │   └── icon-symbol.tsx    # Icon component
│   ├── themed-text.tsx        # Themed text component
│   └── themed-view.tsx        # Themed view component
├── context/
│   └── AppContext.tsx         # Global app state
├── types/
│   └── index.ts               # TypeScript definitions
├── constants/
│   └── theme.ts               # Theme colors and fonts
└── hooks/
    └── use-color-scheme.ts    # Color scheme hook
```

## Data Models

### Policy
- Device information (name, brand, model, value)
- Policy details (number, type, status)
- Coverage options (damage, theft, liquid, screen)
- Dates and premium information

### Claim
- Policy reference
- Claim number and status
- Type and description
- Dates and amounts
- Supporting documents

### User
- Personal information
- Contact details
- Join date

## Color Scheme

The app features a professional insurtech color palette:
- **Primary**: Blue (#2563eb) - Trust and security
- **Secondary**: Green (#10b981) - Success and approval
- **Accent**: Amber (#f59e0b) - Warnings and highlights
- **Danger**: Red (#ef4444) - Errors and rejections

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platform:
```bash
npm run ios      # Run on iOS
npm run android  # Run on Android
npm run web      # Run on web
```

## Features Implementation

### Mock Data
The app includes mock data for demonstration:
- 2 sample policies (iPhone 15 Pro, MacBook Pro)
- 1 sample claim (approved screen damage)
- Sample user profile

### State Management
- Context API for global state
- Mock data initialization
- CRUD operations for policies and claims

### UI/UX Features
- Responsive design for various screen sizes
- Dark mode support
- Haptic feedback on tab navigation
- Smooth animations and transitions
- Modal-based workflows
- Status badges and icons
- Empty states with call-to-action

## Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication system
- [ ] Payment processing integration
- [ ] Document upload for claims
- [ ] Push notifications
- [ ] Real-time claim status updates
- [ ] Chat support
- [ ] Policy renewal reminders
- [ ] Multi-device management
- [ ] Claim history export

## License

© 2026 DigiInsure. All rights reserved.

## Version

v1.0.0
