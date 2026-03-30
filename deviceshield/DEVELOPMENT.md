# DeviceShield - Development Guide

Technical guide for developers working on the DeviceShield insurance management app.

## Table of Contents
1. [Architecture](#architecture)
2. [Code Structure](#code-structure)
3. [Development Workflow](#development-workflow)
4. [Adding New Features](#adding-new-features)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## Architecture

### Technology Stack

**Core:**
- React Native 0.81.5
- Expo SDK 54
- TypeScript 5.9.2
- Expo Router 6.0.22

**Navigation:**
- Expo Router (file-based routing)
- React Navigation 7.x (under the hood)
- Tab-based navigation

**State Management:**
- React Context API
- Custom hooks for state access
- Mock data layer (ready for API integration)

**UI/UX:**
- Custom component library
- SF Symbols (iOS) / Material Icons (Android)
- Themed styling system
- Dark mode support

---

## Code Structure

### Directory Layout

```
deviceshield/
├── app/                      # Application screens (Expo Router)
│   ├── (tabs)/              # Tab-based navigation group
│   │   ├── _layout.tsx      # Tab navigator configuration
│   │   ├── index.tsx        # Home screen
│   │   ├── policies.tsx     # Policies screen
│   │   ├── claims.tsx       # Claims screen
│   │   └── profile.tsx      # Profile screen
│   ├── _layout.tsx          # Root layout with providers
│   └── modal.tsx            # Modal screen example
│
├── components/              # Reusable components
│   ├── ui/                  # UI component library
│   │   ├── card.tsx         # Card wrapper component
│   │   ├── button.tsx       # Button with variants
│   │   ├── badge.tsx        # Status badge component
│   │   └── icon-symbol.tsx  # Cross-platform icon component
│   ├── themed-text.tsx      # Themed text component
│   └── themed-view.tsx      # Themed view component
│
├── context/                 # Global state management
│   └── AppContext.tsx       # Main app context provider
│
├── types/                   # TypeScript definitions
│   └── index.ts             # All type definitions
│
├── constants/               # App constants
│   └── theme.ts             # Color and font definitions
│
└── hooks/                   # Custom React hooks
    ├── use-color-scheme.ts  # Color scheme detection
    └── use-theme-color.ts   # Theme color utilities
```

---

## Development Workflow

### Setup

1. **Clone and Install:**
```bash
git clone <repository-url>
cd deviceshield
npm install
```

2. **Start Development Server:**
```bash
npm start
```

3. **Run on Platform:**
```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web Browser
```

### Development Commands

```bash
# Start with cache cleared
npm start -- --clear

# Run linter
npm run lint

# Type checking
npx tsc --noEmit

# Reset project (clean slate)
npm run reset-project
```

### Hot Reload

- Changes to `.tsx` files trigger automatic reload
- Context changes may require manual reload
- Native module changes require rebuild

---

## Adding New Features

### 1. Adding a New Screen

**Step 1: Create Screen File**
```bash
# Create in app/(tabs)/ for tab screen
# Or in app/ for modal/stack screen
touch app/(tabs)/new-screen.tsx
```

**Step 2: Implement Screen**
```typescript
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function NewScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title">New Screen</ThemedText>
    </ThemedView>
  );
}
```

**Step 3: Add to Navigation**
```typescript
// In app/(tabs)/_layout.tsx
<Tabs.Screen
  name="new-screen"
  options={{
    title: 'New Screen',
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
  }}
/>
```

### 2. Adding a New Component

**Step 1: Create Component File**
```bash
touch components/ui/new-component.tsx
```

**Step 2: Implement Component**
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface NewComponentProps {
  // Define props
}

export function NewComponent({ }: NewComponentProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Styles
  },
});
```

**Step 3: Export and Use**
```typescript
// In other files
import { NewComponent } from '@/components/ui/new-component';
```

### 3. Adding New Data Types

**Step 1: Define Types**
```typescript
// In types/index.ts
export interface NewType {
  id: string;
  // Add properties
}
```

**Step 2: Update Context**
```typescript
// In context/AppContext.tsx
interface AppContextType {
  // Add new state
  newItems: NewType[];
  addNewItem: (item: NewType) => void;
}
```

**Step 3: Implement State Management**
```typescript
const [newItems, setNewItems] = useState<NewType[]>([]);

const addNewItem = (item: NewType) => {
  setNewItems([...newItems, item]);
};
```

### 4. Adding API Integration

**Step 1: Create API Service**
```typescript
// Create services/api.ts
const API_BASE_URL = 'https://api.example.com';

export async function fetchPolicies() {
  const response = await fetch(`${API_BASE_URL}/policies`);
  return response.json();
}
```

**Step 2: Update Context**
```typescript
// Replace mock data with API calls
useEffect(() => {
  fetchPolicies().then(setPolicies);
}, []);
```

**Step 3: Add Loading States**
```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetchPolicies()
    .then(setPolicies)
    .finally(() => setLoading(false));
}, []);
```

---

## Testing

### Manual Testing Checklist

**Home Screen:**
- [ ] Metrics display correctly
- [ ] Quick actions navigate properly
- [ ] Recent activity shows claims
- [ ] Empty states work

**Policies Screen:**
- [ ] Active policies list displays
- [ ] Policy details are accurate
- [ ] Plan cards show correctly
- [ ] Purchase modal opens/closes
- [ ] Coverage icons display

**Claims Screen:**
- [ ] Claims list displays
- [ ] Status badges show correct colors
- [ ] Create claim modal works
- [ ] Form validation works
- [ ] Claim submission succeeds

**Profile Screen:**
- [ ] User info displays
- [ ] Stats are accurate
- [ ] Menu items are clickable
- [ ] Contact info shows

**General:**
- [ ] Tab navigation works
- [ ] Dark mode toggles correctly
- [ ] Scrolling is smooth
- [ ] No console errors

### Unit Testing (Future)

```bash
# Install testing libraries
npm install --save-dev @testing-library/react-native jest

# Run tests
npm test
```

### E2E Testing (Future)

```bash
# Install Detox
npm install --save-dev detox

# Run E2E tests
detox test
```

---

## Styling Guidelines

### Color Usage

```typescript
// Always use theme colors
const colors = Colors[colorScheme ?? 'light'];

// Good
<View style={{ backgroundColor: colors.primary }} />

// Bad
<View style={{ backgroundColor: '#2563eb' }} />
```

### Component Styling

```typescript
// Use StyleSheet.create for performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

// Use inline styles sparingly
<View style={[styles.container, { marginTop: 20 }]} />
```

### Responsive Design

```typescript
// Use flexbox for layouts
container: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
}

// Use percentages for responsive sizing
card: {
  width: '48%',
  minWidth: 160,
}
```

---

## Performance Optimization

### Best Practices

1. **Memoization:**
```typescript
const memoizedValue = useMemo(() => 
  expensiveCalculation(data), 
  [data]
);
```

2. **Callback Optimization:**
```typescript
const handlePress = useCallback(() => {
  // Handle press
}, [dependencies]);
```

3. **List Optimization:**
```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
/>
```

4. **Image Optimization:**
```typescript
<Image
  source={uri}
  style={styles.image}
  resizeMode="cover"
  cachePolicy="memory-disk"
/>
```

---

## Deployment

### Building for Production

**iOS:**
```bash
# Create production build
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

**Android:**
```bash
# Create production build
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

### Environment Variables

```bash
# Create .env file
API_BASE_URL=https://api.production.com
API_KEY=your_api_key
```

```typescript
// Access in code
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

### Version Management

```json
// In app.json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    },
    "android": {
      "versionCode": 1
    }
  }
}
```

---

## Common Issues and Solutions

### Issue: Metro Bundler Cache

**Solution:**
```bash
npm start -- --clear
```

### Issue: iOS Build Fails

**Solution:**
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Type Errors

**Solution:**
```bash
npx tsc --noEmit
# Fix reported type errors
```

### Issue: Navigation Not Working

**Solution:**
- Check file naming in `app/` directory
- Ensure `_layout.tsx` is configured correctly
- Verify Expo Router setup

---

## Code Quality

### ESLint Configuration

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Pre-commit Hooks (Future)

```bash
# Install husky
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm test"
```

---

## Resources

### Documentation
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Tools
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com)
- [Expo DevTools](https://docs.expo.dev/workflow/debugging/)

### Community
- [Expo Discord](https://chat.expo.dev)
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## Contributing

### Git Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with descriptive message
5. Create pull request
6. Code review
7. Merge to main

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

**Example:**
```
feat(claims): add photo upload to claim submission

- Added image picker integration
- Updated claim model to include photos
- Added photo preview in claim details

Closes #123
```

---

## Roadmap

### Phase 1 (Current)
- ✅ Basic app structure
- ✅ Home screen with metrics
- ✅ Policies management
- ✅ Claims management
- ✅ Profile screen

### Phase 2 (Next)
- [ ] Backend API integration
- [ ] Authentication system
- [ ] Payment processing
- [ ] Push notifications
- [ ] Document upload

### Phase 3 (Future)
- [ ] Real-time updates
- [ ] Chat support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Offline mode

---

**Happy Coding! 🚀**

For questions or support, contact the development team.
