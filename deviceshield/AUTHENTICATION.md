# DeviceShield - Authentication System

Complete guide to the authentication system in DeviceShield.

---

## 🔐 Overview

The app now includes a complete authentication flow with:
- **Login Screen**: Username and password authentication
- **Registration Screen**: New user signup with user type selection
- **Protected Routes**: Automatic redirection based on auth state
- **User Types**: 4 different account types for different user roles

---

## 👥 User Types

### 1. Customer
- **Purpose**: Regular users who purchase insurance
- **Access**: 
  - View and purchase policies
  - File and track claims
  - Manage profile
- **Description**: Purchase insurance and file claims

### 2. Seller
- **Purpose**: Device sellers and retailers
- **Access**:
  - Sell devices
  - Offer insurance policies
  - View sales data
- **Description**: Sell devices and insurance policies

### 3. Repair
- **Purpose**: Device repair service providers
- **Access**:
  - Manage repair requests
  - View claim repairs
  - Update repair status
- **Description**: Provide device repair services

### 4. Seller & Repair
- **Purpose**: Combined seller and repair services
- **Access**:
  - All seller features
  - All repair features
  - Integrated workflow
- **Description**: Sell devices and provide repairs

---

## 🚀 Getting Started

### Demo Credentials

**Customer Account:**
- Username: `johndoe`
- Password: `password123`

**Seller Account:**
- Username: `seller1`
- Password: `seller123`

---

## 📱 Screen Flow

### Login Flow
```
App Start
    ↓
Login Screen
    ↓
[Enter Credentials]
    ↓
Validate → Success → Home (Tabs)
         → Failure → Error Message
```

### Registration Flow
```
Login Screen
    ↓
[Tap "Sign Up"]
    ↓
Registration Screen
    ↓
[Fill Form + Select User Type]
    ↓
[Submit]
    ↓
Validate → Success → Home (Tabs)
         → Failure → Error Message
```

### Logout Flow
```
Profile Screen
    ↓
[Tap "Log Out"]
    ↓
Clear Session
    ↓
Login Screen
```

---

## 🎨 Login Screen

### Features
- ✅ Username input
- ✅ Password input (secure)
- ✅ "Forgot Password" link
- ✅ Demo credentials display
- ✅ Sign up link
- ✅ Loading state
- ✅ Error handling

### Validation
- Username and password required
- Shows alert for empty fields
- Shows alert for invalid credentials

### UI Elements
```typescript
- Logo with shield icon
- Welcome message
- Input fields with icons
- Primary action button
- Demo credentials card
- Register link
```

---

## 📝 Registration Screen

### Features
- ✅ Username input
- ✅ Full name input
- ✅ Email input with validation
- ✅ Phone number input
- ✅ User type dropdown selector
- ✅ Password input (secure)
- ✅ Confirm password
- ✅ Form validation
- ✅ Loading state
- ✅ Error handling

### User Type Selector

**Dropdown Component:**
- Tap to expand/collapse
- 4 selectable options
- Visual checkmark for selected type
- Description for each type
- Smooth animations

**Options Display:**
```
┌─────────────────────────────────┐
│ Customer                      ✓ │
│ Purchase insurance and file...  │
├─────────────────────────────────┤
│ Seller                          │
│ Sell devices and insurance...   │
├─────────────────────────────────┤
│ Repair                          │
│ Provide device repair services  │
├─────────────────────────────────┤
│ Seller & Repair                 │
│ Sell devices and provide...     │
└─────────────────────────────────┘
```

### Form Validation

**Required Fields:**
- Username (unique)
- Full name
- Email (valid format)
- Phone number
- Password (min 6 characters)
- Confirm password (must match)
- User type (default: customer)

**Validation Rules:**
```typescript
✓ All fields must be filled
✓ Email must be valid format (regex)
✓ Password must be at least 6 characters
✓ Passwords must match
✓ Username must be unique
```

**Error Messages:**
- "Please fill in all fields"
- "Password must be at least 6 characters"
- "Passwords do not match"
- "Please enter a valid email address"
- "Username already exists"

---

## 🔧 Technical Implementation

### File Structure
```
app/
├── index.tsx              # Root redirect to login
├── login.tsx              # Login screen
├── register.tsx           # Registration screen
├── _layout.tsx            # Auth routing logic
└── (tabs)/                # Protected tab screens
    ├── index.tsx          # Home
    ├── policies.tsx       # Policies
    ├── claims.tsx         # Claims
    └── profile.tsx        # Profile (with logout)

context/
└── AppContext.tsx         # Auth state management

types/
└── index.ts               # Auth types
```

### Authentication State

**AppContext:**
```typescript
interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  // ... other app state
}
```

**User Type:**
```typescript
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  userType: 'customer' | 'seller' | 'repair' | 'seller_repair';
  joinDate: Date;
}
```

### Protected Routes

**Root Layout Logic:**
```typescript
useEffect(() => {
  const inAuthGroup = segments[0] === '(tabs)';

  if (!isAuthenticated && inAuthGroup) {
    // Redirect to login
    router.replace('/login');
  } else if (isAuthenticated && !inAuthGroup) {
    // Redirect to tabs
    router.replace('/(tabs)');
  }
}, [isAuthenticated, segments]);
```

**How It Works:**
1. Monitor authentication state
2. Check current route segment
3. Redirect if unauthorized
4. Allow access if authorized

---

## 🔒 Security Considerations

### Current Implementation (Demo)
⚠️ **For demonstration purposes only**

- Passwords stored in plain text
- No encryption
- Client-side only
- Mock database

### Production Requirements

**Must Implement:**
1. **Backend API**
   - Secure authentication endpoint
   - Token-based auth (JWT)
   - Session management

2. **Password Security**
   - Hash passwords (bcrypt, argon2)
   - Salt passwords
   - Never store plain text

3. **Secure Storage**
   - Use secure storage for tokens
   - Encrypt sensitive data
   - HTTPS only

4. **Validation**
   - Server-side validation
   - Rate limiting
   - CAPTCHA for registration

5. **Token Management**
   - Access tokens (short-lived)
   - Refresh tokens (long-lived)
   - Token rotation

**Example Production Flow:**
```typescript
// Login
const response = await fetch('https://api.example.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

const { token, refreshToken, user } = await response.json();

// Store securely
await SecureStore.setItemAsync('accessToken', token);
await SecureStore.setItemAsync('refreshToken', refreshToken);
```

---

## 🎯 Usage Examples

### Login a User

```typescript
import { useApp } from '@/context/AppContext';

function LoginComponent() {
  const { login } = useApp();
  
  const handleLogin = async () => {
    const success = await login({
      username: 'johndoe',
      password: 'password123'
    });
    
    if (success) {
      // User is logged in, navigation handled automatically
    } else {
      // Show error
    }
  };
}
```

### Register a New User

```typescript
import { useApp } from '@/context/AppContext';

function RegisterComponent() {
  const { register } = useApp();
  
  const handleRegister = async () => {
    const success = await register({
      username: 'newuser',
      name: 'New User',
      email: 'new@example.com',
      phone: '+1234567890',
      password: 'securepass',
      confirmPassword: 'securepass',
      userType: 'customer'
    });
    
    if (success) {
      // User registered and logged in
    } else {
      // Username exists or error
    }
  };
}
```

### Logout a User

```typescript
import { useApp } from '@/context/AppContext';

function ProfileComponent() {
  const { logout } = useApp();
  
  const handleLogout = () => {
    logout();
    // User logged out, redirected to login
  };
}
```

### Check Authentication Status

```typescript
import { useApp } from '@/context/AppContext';

function ProtectedComponent() {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated) {
    return <Text>Please log in</Text>;
  }
  
  return <Text>Welcome, {user?.name}!</Text>;
}
```

### Access User Type

```typescript
import { useApp } from '@/context/AppContext';

function DashboardComponent() {
  const { user } = useApp();
  
  switch (user?.userType) {
    case 'customer':
      return <CustomerDashboard />;
    case 'seller':
      return <SellerDashboard />;
    case 'repair':
      return <RepairDashboard />;
    case 'seller_repair':
      return <CombinedDashboard />;
  }
}
```

---

## 🧪 Testing

### Test Scenarios

**Login:**
1. ✅ Valid credentials → Success
2. ✅ Invalid username → Error
3. ✅ Invalid password → Error
4. ✅ Empty fields → Error
5. ✅ Loading state displays
6. ✅ Navigation after success

**Registration:**
1. ✅ Valid data → Success
2. ✅ Existing username → Error
3. ✅ Invalid email → Error
4. ✅ Short password → Error
5. ✅ Password mismatch → Error
6. ✅ Empty fields → Error
7. ✅ User type selection works
8. ✅ Navigation after success

**Logout:**
1. ✅ Logout clears state
2. ✅ Redirects to login
3. ✅ Protected routes blocked

**Protected Routes:**
1. ✅ Unauthenticated → Login
2. ✅ Authenticated → Tabs
3. ✅ Auto-redirect works

---

## 🎨 UI/UX Features

### Visual Design
- Clean, modern interface
- Consistent with app theme
- Professional insurtech branding
- Smooth animations
- Loading states
- Error feedback

### User Experience
- Clear form labels
- Input validation
- Helpful error messages
- Demo credentials visible
- Easy navigation
- Keyboard-aware scrolling
- Safe area support

### Accessibility
- Proper input types
- Secure text entry
- Touch targets
- Color contrast
- Screen reader support

---

## 🔄 Future Enhancements

### Planned Features
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Social login (Google, Apple)
- [ ] Biometric authentication
- [ ] Two-factor authentication
- [ ] Password strength meter
- [ ] Remember me option
- [ ] Session timeout
- [ ] Account deletion
- [ ] Profile picture upload

### Backend Integration
- [ ] REST API endpoints
- [ ] JWT token management
- [ ] Refresh token rotation
- [ ] OAuth 2.0 support
- [ ] Rate limiting
- [ ] IP blocking
- [ ] Audit logging

---

## 📚 Resources

### Related Documentation
- [README.md](./README.md) - Main documentation
- [FEATURES.md](./FEATURES.md) - Feature details
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Developer guide

### External Resources
- [Expo Router Auth](https://docs.expo.dev/router/reference/authentication/)
- [React Native Security](https://reactnative.dev/docs/security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 🐛 Troubleshooting

### Common Issues

**Login not working:**
- Check username/password are correct
- Verify credentials match demo data
- Check console for errors

**Registration fails:**
- Ensure all fields are filled
- Check email format
- Verify passwords match
- Try different username

**Stuck on login screen:**
- Clear app data
- Restart app
- Check authentication state

**Logout not working:**
- Check logout function is called
- Verify state is cleared
- Check navigation redirect

---

## ✅ Summary

The authentication system provides:
- ✅ Complete login/register flow
- ✅ 4 user types with descriptions
- ✅ Form validation
- ✅ Protected routes
- ✅ Automatic navigation
- ✅ Clean UI/UX
- ✅ Error handling
- ✅ Loading states
- ✅ Demo credentials
- ✅ Production-ready structure

**Status**: ✅ Complete and functional  
**Version**: 1.0.0  
**Last Updated**: January 2026

---

For questions or issues, refer to the main documentation or development guide.
