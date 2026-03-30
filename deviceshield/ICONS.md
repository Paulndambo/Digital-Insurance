# DeviceShield - Icon Reference Guide

This app uses **Lucide React Native** for all icons - a beautiful, consistent, and cross-platform icon library.

## Why Lucide Icons?

- ✅ **Cross-platform**: Works perfectly on iOS, Android, and Web
- ✅ **Consistent design**: All icons follow the same design language
- ✅ **Lightweight**: Tree-shakeable, only imports what you use
- ✅ **Customizable**: Easy to change size and color
- ✅ **Well-maintained**: Active community and regular updates

## Installation

Already installed in this project:
```bash
npm install lucide-react-native
```

## Usage

### Basic Import and Usage

```typescript
import { Shield, Home, FileText } from 'lucide-react-native';

// In your component
<Shield size={24} color="#2563eb" />
<Home size={28} color="#10b981" />
<FileText size={20} color="#f59e0b" />
```

### With Theme Colors

```typescript
import { Shield } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

function MyComponent() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return <Shield size={24} color={colors.primary} />;
}
```

## Icons Used in DeviceShield

### Tab Navigation
| Icon | Component | Usage |
|------|-----------|-------|
| 🏠 | `Home` | Home tab |
| 🛡️ | `Shield` | Policies tab |
| 📋 | `FileText` | Claims tab |
| 👤 | `User` | Profile tab |

### Home Screen
| Icon | Component | Usage |
|------|-----------|-------|
| 🛡️ | `Shield` | Active policies metric, welcome card |
| 📋 | `FileText` | Pending claims metric, activity items |
| 💰 | `DollarSign` | Total coverage metric |
| 📱 | `Smartphone` | Devices protected metric |
| ➕ | `PlusCircle` | New policy action |
| ⚠️ | `AlertTriangle` | File claim action |
| 📝 | `List` | My policies action |
| ❓ | `HelpCircle` | Support action |

### Policies Screen
| Icon | Component | Usage |
|------|-----------|-------|
| 🛡️ | `Shield` | Policy cards |
| ⚠️ | `AlertTriangle` | Accidental damage coverage |
| 🔒 | `Lock` | Theft protection coverage |
| 💧 | `Droplet` | Liquid damage coverage |
| 📱 | `Smartphone` | Screen protection coverage |
| ✅ | `CheckCircle` | Plan features |
| ❌ | `X` | Close modal |

### Claims Screen
| Icon | Component | Usage |
|------|-----------|-------|
| ➕ | `Plus` | Create new claim button |
| ⚠️ | `AlertTriangle` | Damage claim type |
| 🔒 | `Lock` | Theft claim type |
| 🔧 | `Wrench` | Malfunction claim type |
| 📋 | `FileText` | Other claim type, empty state |
| 📅 | `Calendar` | Date information |
| ⚠️ | `AlertCircle` | Claim type indicator |
| ✅ | `CheckCircle` | Approved claims, policy selection |
| 🛡️ | `Shield` | Policy selection |
| ❌ | `X` | Close modal |

### Profile Screen
| Icon | Component | Usage |
|------|-----------|-------|
| 🛡️ | `Shield` | Active policies stat |
| 📋 | `FileText` | Total claims stat |
| ✅ | `CheckCircle` | Approved claims stat |
| 📧 | `Mail` | Email contact |
| 📞 | `Phone` | Phone contact |
| 🏠 | `Home` | Address contact |
| 👤 | `User` | Personal information |
| 🔒 | `Lock` | Security & privacy |
| 💳 | `CreditCard` | Payment methods |
| ❓ | `HelpCircle` | Help center |
| ✅ | `FileCheck` | Terms & conditions |
| 🤝 | `HandHeart` | Privacy policy |
| 🔔 | `Bell` | Notifications |
| 🌙 | `Moon` | Dark mode |
| ℹ️ | `Info` | About |
| ➡️ | `ChevronRight` | Menu navigation |
| 🚪 | `LogOut` | Logout |

## Common Icon Patterns

### Icon with Background Circle

```typescript
<View style={[
  styles.iconContainer, 
  { backgroundColor: colors.primary + '20' }
]}>
  <Shield size={24} color={colors.primary} />
</View>
```

### Dynamic Icon Selection

```typescript
const getClaimIcon = (type: string) => {
  switch (type) {
    case 'damage': return AlertTriangle;
    case 'theft': return Lock;
    case 'malfunction': return Wrench;
    default: return FileText;
  }
};

// Usage
const ClaimIcon = getClaimIcon(claim.type);
<ClaimIcon size={24} color={colors.primary} />
```

### Icon in List/Map

```typescript
{items.map((item, index) => {
  const ItemIcon = item.icon;
  return (
    <View key={index}>
      <ItemIcon size={20} color={colors.primary} />
      <Text>{item.label}</Text>
    </View>
  );
})}
```

## Customization

### Size Guidelines
- **Small**: 16px - For inline text or compact spaces
- **Medium**: 20-24px - For cards, buttons, list items
- **Large**: 28-32px - For tab bars, headers
- **XLarge**: 40-48px - For hero sections, empty states

### Color Usage
- **Primary**: Main brand actions (blue)
- **Secondary**: Success states (green)
- **Accent**: Warnings, highlights (amber)
- **Danger**: Errors, destructive actions (red)
- **Muted**: Inactive, disabled states (gray)

## Available Icons

Lucide provides 1000+ icons. Here are some commonly used ones:

### Navigation & Actions
- `Home`, `Menu`, `Search`, `Settings`, `Filter`
- `Plus`, `Minus`, `X`, `Check`, `ChevronRight`, `ChevronLeft`
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`

### Communication
- `Mail`, `Phone`, `MessageCircle`, `Send`, `Bell`
- `Video`, `Mic`, `MicOff`, `Volume`, `VolumeX`

### Files & Documents
- `File`, `FileText`, `Folder`, `Download`, `Upload`
- `Save`, `Copy`, `Clipboard`, `Paperclip`

### User & Account
- `User`, `Users`, `UserPlus`, `UserCheck`, `UserX`
- `LogIn`, `LogOut`, `Lock`, `Unlock`, `Key`

### Business & Finance
- `DollarSign`, `CreditCard`, `ShoppingCart`, `TrendingUp`
- `BarChart`, `PieChart`, `Activity`

### Status & Alerts
- `CheckCircle`, `XCircle`, `AlertCircle`, `AlertTriangle`
- `Info`, `HelpCircle`, `AlertOctagon`

### Devices & Tech
- `Smartphone`, `Tablet`, `Laptop`, `Monitor`, `Wifi`
- `Bluetooth`, `Battery`, `Power`, `Cpu`

### Media & Images
- `Image`, `Camera`, `Video`, `Music`, `Play`, `Pause`
- `SkipForward`, `SkipBack`, `Volume`

### Social & Sharing
- `Share`, `Heart`, `Star`, `Bookmark`, `ThumbsUp`
- `MessageSquare`, `AtSign`, `Hash`

### Time & Calendar
- `Calendar`, `Clock`, `Timer`, `Watch`, `Hourglass`

### Weather & Nature
- `Sun`, `Moon`, `Cloud`, `CloudRain`, `Zap`
- `Wind`, `Droplet`, `Umbrella`

## Resources

- **Official Docs**: https://lucide.dev/guide/packages/lucide-react-native
- **Icon Search**: https://lucide.dev/icons/
- **GitHub**: https://github.com/lucide-icons/lucide
- **NPM Package**: https://www.npmjs.com/package/lucide-react-native

## Migration from Other Icon Libraries

### From React Native Vector Icons
```typescript
// Before
import Icon from 'react-native-vector-icons/FontAwesome';
<Icon name="home" size={24} color="#000" />

// After
import { Home } from 'lucide-react-native';
<Home size={24} color="#000" />
```

### From Expo Icons
```typescript
// Before
import { Ionicons } from '@expo/vector-icons';
<Ionicons name="shield-checkmark" size={24} color="#000" />

// After
import { Shield } from 'lucide-react-native';
<Shield size={24} color="#000" />
```

## Tips & Best Practices

1. **Import only what you need**: Tree-shaking works automatically
2. **Use consistent sizes**: Stick to the size guidelines
3. **Match colors to theme**: Always use theme colors for consistency
4. **Add accessibility**: Consider adding `accessibilityLabel` for screen readers
5. **Test on all platforms**: Ensure icons look good on iOS, Android, and Web

## Example: Creating a Custom Icon Button

```typescript
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';
import { Colors } from '@/constants/theme';

interface IconButtonProps {
  onPress: () => void;
  color?: string;
  size?: number;
}

export function IconButton({ onPress, color, size = 24 }: IconButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Shield size={size} color={color || Colors.light.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
  },
});
```

---

**Version**: 1.0.0  
**Icon Library**: Lucide React Native  
**Last Updated**: January 2026
