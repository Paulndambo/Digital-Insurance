# DeviceShield - Quick Start Guide

Get your DeviceShield insurance app up and running in minutes!

## Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

For mobile development:
- **iOS**: Xcode (Mac only) or Expo Go app
- **Android**: Android Studio or Expo Go app

## Installation

1. **Navigate to the project directory:**
```bash
cd deviceshield
```

2. **Install dependencies:**
```bash
npm install
```

## Running the App

### Option 1: Using Expo Go (Easiest)

1. **Start the development server:**
```bash
npm start
```

2. **Scan the QR code:**
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

### Option 2: Using Simulators/Emulators

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Web:**
```bash
npm run web
```

## App Navigation

Once the app is running, you'll see 4 main tabs:

### 1. 🏠 Home
- View your dashboard with key metrics
- See active policies and pending claims
- Access quick actions
- Check recent activity

### 2. 🛡️ Policies
- Browse your active insurance policies
- View policy details and coverage
- Purchase new insurance plans
- Compare plan features

### 3. 📋 Claims
- View all your claims
- Check claim status (pending, approved, rejected)
- File new claims
- Track claim progress

### 4. 👤 Profile
- View your personal information
- Check account statistics
- Access settings and support
- Manage your account

## Demo Data

The app comes pre-loaded with demo data:

**User:**
- Name: John Doe
- Email: john.doe@example.com
- Phone: +1 234 567 8900

**Policies:**
1. iPhone 15 Pro - Premium Plan ($29.99/month)
2. MacBook Pro - Standard Plan ($49.99/month)

**Claims:**
1. Screen damage claim - Approved ($200)

## Key Features to Try

### 1. View Your Dashboard
- Open the app to see the Home screen
- Check your metrics and quick actions
- View recent activity

### 2. Browse Policies
- Tap the "Policies" tab
- Scroll through your active policies
- View available plans
- Try the purchase flow (demo only)

### 3. File a Claim
- Go to the "Claims" tab
- Tap the "+" button
- Select a policy
- Choose claim type
- Add description
- Submit the claim

### 4. Explore Your Profile
- Tap the "Profile" tab
- View your statistics
- Check contact information
- Browse settings menu

## Customization

### Change Theme Colors
Edit `constants/theme.ts` to customize the color scheme:
```typescript
const tintColorLight = '#2563eb'; // Change primary color
```

### Add More Mock Data
Edit `context/AppContext.tsx` to add more:
- Policies
- Claims
- Devices

### Modify UI Components
All reusable components are in `components/ui/`:
- `card.tsx` - Card component
- `button.tsx` - Button component
- `badge.tsx` - Badge component

## Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --clear
```

### iOS Build Issues
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android Build Issues
```bash
npm run android -- --clean
```

### Reset Project
```bash
npm run reset-project
```

## Development Tips

1. **Hot Reload**: Changes to code will automatically reload the app
2. **Debug Menu**: 
   - iOS: Cmd + D
   - Android: Cmd + M
   - Shake device for menu
3. **Console Logs**: Check terminal for console.log output
4. **React DevTools**: Available in debug menu

## Next Steps

1. **Integrate Backend**: Replace mock data with API calls
2. **Add Authentication**: Implement login/signup flow
3. **Payment Integration**: Add Stripe or similar
4. **Push Notifications**: Set up Expo notifications
5. **Document Upload**: Add image picker for claims

## Support

For issues or questions:
- Check the main README.md
- Review Expo documentation: https://docs.expo.dev
- Check React Native docs: https://reactnative.dev

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Happy Coding! 🚀**

Built with ❤️ by DigiInsure
