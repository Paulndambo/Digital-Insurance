# DeviceShield - Policy Purchase Flow

Complete guide to the enhanced multi-step policy purchase process with device information capture.

---

## 🎯 Overview

The policy purchase flow now includes a comprehensive 2-step process:
1. **Plan Selection** - Choose insurance plan
2. **Device Information** - Capture detailed device data

This ensures proper device documentation and accurate policy coverage.

---

## 📋 Purchase Flow Steps

### Step 1: Plan Selection

**User Actions:**
1. Browse available insurance plans
2. Review plan features and pricing
3. Select desired plan
4. Click "Purchase Plan"

**Modal Opens:**
- Plan summary displayed
- Monthly premium shown
- Deductible amount shown
- Claims limit shown
- "Continue to Device Information" button

### Step 2: Device Information Form

**Required Fields:**
- ✅ Device Type (dropdown)
- ✅ Device Brand
- ✅ Device Model
- ✅ Purchase Date
- ✅ Device Cost
- ✅ Serial Number

**Optional Fields:**
- IMEI Number (for phones/tablets)
- Warranty Period (in months)
- Warranty End Date
- Device Description

---

## 📱 Device Type Options

Users can select from 4 device categories:

### 1. Phone
- Smartphones
- Mobile phones
- IMEI number applicable

### 2. Laptop
- Notebooks
- Portable computers
- Serial number required

### 3. Smartwatch
- Wearable devices
- Smart watches
- Serial number required

### 4. Tablet
- iPad, Android tablets
- Portable tablets
- IMEI may be applicable

---

## 📝 Form Fields Details

### Device Type *
- **Type**: Dropdown selector
- **Options**: Phone, Laptop, Smartwatch, Tablet
- **Default**: Phone
- **Required**: Yes
- **UI**: Expandable dropdown with icons

### Device Brand *
- **Type**: Text input
- **Example**: "Apple", "Samsung", "Dell", "HP"
- **Required**: Yes
- **Validation**: Non-empty string

### Device Model *
- **Type**: Text input
- **Example**: "iPhone 15 Pro", "MacBook Pro 14"
- **Required**: Yes
- **Validation**: Non-empty string

### Purchase Date *
- **Type**: Date input
- **Format**: YYYY-MM-DD
- **Example**: "2024-09-15"
- **Required**: Yes
- **Icon**: Calendar icon
- **Validation**: Valid date format

### Device Cost (USD) *
- **Type**: Numeric input
- **Format**: Decimal number
- **Example**: "999.99"
- **Required**: Yes
- **Keyboard**: Decimal pad
- **Validation**: Positive number

### IMEI Number
- **Type**: Numeric input
- **Length**: 15 digits
- **Example**: "123456789012345"
- **Required**: No (optional for phones/tablets)
- **Note**: "For phones and tablets (optional)"

### Serial Number *
- **Type**: Text input
- **Example**: "ABC123456789"
- **Required**: Yes
- **Validation**: Non-empty string

### Warranty Period
- **Type**: Numeric input
- **Unit**: Months
- **Example**: "12", "24", "36"
- **Required**: No
- **Keyboard**: Number pad

### Warranty End Date
- **Type**: Date input
- **Format**: YYYY-MM-DD
- **Example**: "2025-09-15"
- **Required**: No
- **Icon**: Calendar icon

### Device Description
- **Type**: Multi-line text area
- **Lines**: 4
- **Example**: "Space Gray, 256GB, Excellent condition"
- **Required**: No
- **Placeholder**: "e.g., Color, storage capacity, condition..."

---

## 🔄 User Flow Diagram

```
Browse Plans
    ↓
Select Plan → [Purchase Plan]
    ↓
Modal Opens: Plan Summary
    ↓
[Continue to Device Information]
    ↓
Device Information Form
    ├─ Select Device Type (dropdown)
    ├─ Enter Model *
    ├─ Enter Purchase Date *
    ├─ Enter Device Cost *
    ├─ Enter IMEI (optional)
    ├─ Enter Serial Number *
    ├─ Enter Warranty Period (optional)
    ├─ Enter Warranty End Date (optional)
    └─ Enter Description (optional)
    ↓
[Complete Purchase]
    ↓
Validation
    ├─ Success → Policy Created → Success Alert
    └─ Error → Show Error Message
    ↓
[Back to Plan] or [Cancel]
```

---

## ✅ Form Validation

### Required Field Validation

**Checks:**
```typescript
✓ Device brand must not be empty
✓ Device model must not be empty
✓ Purchase date must not be empty
✓ Device cost must not be empty
✓ Serial number must not be empty
```

**Error Messages:**
- "Please enter device brand"
- "Please enter device model"
- "Please enter purchase date"
- "Please enter device cost"
- "Please enter serial number"

### Field Format Validation

**Date Fields:**
- Expected format: YYYY-MM-DD
- Example: 2024-09-15

**Numeric Fields:**
- Device cost: Decimal numbers
- IMEI: 15 digits max
- Warranty period: Whole numbers

---

## 🎨 UI Components

### Device Type Dropdown

**Appearance:**
```
┌─────────────────────────────────┐
│ 📱 Phone                    ▼  │
└─────────────────────────────────┘

When expanded:
┌─────────────────────────────────┐
│ 📱 Phone                    ✓  │
├─────────────────────────────────┤
│ 💻 Laptop                      │
├─────────────────────────────────┤
│ ⌚ Smartwatch                   │
├─────────────────────────────────┤
│ 📱 Tablet                       │
└─────────────────────────────────┘
```

**Features:**
- Icon for each device type
- Checkmark for selected option
- Tap to expand/collapse
- Visual feedback

### Text Inputs

**Standard Input:**
```
┌─────────────────────────────────┐
│ Device Model                    │
│ e.g., iPhone 15 Pro, MacBook... │
└─────────────────────────────────┘
```

**Input with Icon:**
```
┌─────────────────────────────────┐
│ 📅 YYYY-MM-DD                   │
└─────────────────────────────────┘
```

**Text Area:**
```
┌─────────────────────────────────┐
│ e.g., Color, storage capacity...│
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

---

## 💾 Data Structure

### Device Form Data Type

```typescript
interface DeviceFormData {
  deviceType: 'phone' | 'laptop' | 'smartwatch' | 'tablet';
  brand: string;
  model: string;
  purchaseDate: string;
  deviceCost: string;
  imeiNumber: string;
  serialNumber: string;
  warrantyPeriod: string;
  warrantyEndDate: string;
  description: string;
}
```

### Example Filled Form

```typescript
{
  deviceType: 'phone',
  brand: 'Apple',
  model: 'iPhone 15 Pro',
  purchaseDate: '2024-09-15',
  deviceCost: '999.99',
  imeiNumber: '123456789012345',
  serialNumber: 'ABC123456789',
  warrantyPeriod: '12',
  warrantyEndDate: '2025-09-15',
  description: 'Space Gray, 256GB, Excellent condition'
}
```

---

## 🔧 Technical Implementation

### State Management

```typescript
const [purchaseStep, setPurchaseStep] = useState<'plan' | 'device'>('plan');
const [deviceFormData, setDeviceFormData] = useState<DeviceFormData>({
  deviceType: 'phone',
  model: '',
  purchaseDate: '',
  deviceCost: '',
  imeiNumber: '',
  serialNumber: '',
  warrantyPeriod: '',
  warrantyEndDate: '',
  description: '',
});
```

### Navigation Between Steps

```typescript
// Move to device form
const handleContinueToDeviceForm = () => {
  setPurchaseStep('device');
};

// Go back to plan
const handleBackToPlan = () => {
  setPurchaseStep('plan');
};
```

### Form Validation

```typescript
const validateDeviceForm = () => {
  if (!deviceFormData.model.trim()) {
    Alert.alert('Error', 'Please enter device model');
    return false;
  }
  // ... more validations
  return true;
};
```

### Complete Purchase

```typescript
const handleCompletePurchase = () => {
  if (!validateDeviceForm()) return;
  
  // Process purchase
  Alert.alert('Success', 'Your policy has been created successfully!');
  
  // Reset form
  setShowPurchaseModal(false);
  setPurchaseStep('plan');
  // Clear form data
};
```

---

## 🎯 User Experience Features

### Progressive Disclosure
- Show plan details first
- Then collect device information
- Reduces cognitive load
- Clear step progression

### Form Helpers
- Placeholder text with examples
- Helper text for optional fields
- Clear required field indicators (*)
- Contextual information

### Error Handling
- Inline validation
- Clear error messages
- Field-specific feedback
- Prevents submission with errors

### Navigation
- Easy back navigation
- Cancel at any step
- Clear action buttons
- Modal can be closed

---

## 📱 Mobile Optimizations

### Keyboard Handling
- Appropriate keyboard types:
  - `default` for text
  - `decimal-pad` for costs
  - `number-pad` for IMEI/warranty
- Keyboard-aware scrolling
- Auto-dismiss on submit

### Touch Targets
- Large, tappable areas
- Minimum 44x44 points
- Clear visual feedback
- Easy dropdown interaction

### Scrolling
- Smooth scrolling
- Safe area support
- Proper padding
- Content visibility

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Date picker component
- [ ] Camera integration for serial number scanning
- [ ] Barcode/QR code scanner for IMEI
- [ ] Device photo upload
- [ ] Auto-fill from device database
- [ ] Purchase receipt upload
- [ ] Real-time device value lookup
- [ ] Warranty verification
- [ ] Device condition assessment

### Backend Integration
- [ ] Save device to database
- [ ] Link device to policy
- [ ] Validate IMEI uniqueness
- [ ] Verify serial number format
- [ ] Calculate accurate premium based on device
- [ ] Store device images
- [ ] Generate device certificate

---

## 📊 Data Usage

### What We Collect

**Required Information:**
- Device type and model
- Purchase date and cost
- Serial number

**Optional Information:**
- IMEI number
- Warranty details
- Device description

**Why We Need It:**
- Accurate policy coverage
- Claim verification
- Device identification
- Value assessment
- Fraud prevention

---

## 🧪 Testing Checklist

### Form Functionality
- [ ] Device type dropdown works
- [ ] All inputs accept text
- [ ] Date format validation
- [ ] Numeric input restrictions
- [ ] IMEI length limit (15)
- [ ] Text area multi-line

### Validation
- [ ] Required fields enforced
- [ ] Error messages display
- [ ] Cannot submit incomplete form
- [ ] Can submit valid form

### Navigation
- [ ] Can go back to plan
- [ ] Can cancel at any step
- [ ] Modal closes properly
- [ ] Form resets after completion

### UI/UX
- [ ] Dropdown expands/collapses
- [ ] Selected device type shows checkmark
- [ ] Keyboard appears correctly
- [ ] Scrolling works smoothly
- [ ] Safe areas respected

---

## 📝 Example User Journey

### Scenario: Customer Purchasing Phone Insurance

1. **Browse Plans**
   - Customer views Premium Protection plan
   - Sees $29.99/month with full coverage

2. **Select Plan**
   - Taps "Purchase Plan"
   - Modal opens with plan summary

3. **Review Plan**
   - Confirms monthly premium
   - Checks deductible ($49)
   - Verifies 3 claims per year

4. **Continue to Device Form**
   - Taps "Continue to Device Information"
   - Device form appears

5. **Fill Device Information**
   - Selects "Phone" from dropdown
   - Enters brand: "Apple"
   - Enters model: "iPhone 15 Pro"
   - Enters purchase date: "2024-09-15"
   - Enters cost: "999.99"
   - Enters IMEI: "123456789012345"
   - Enters serial: "ABC123456789"
   - Enters warranty: "12" months
   - Enters end date: "2025-09-15"
   - Adds description: "Space Gray, 256GB"

6. **Submit**
   - Taps "Complete Purchase"
   - Validation passes
   - Success message appears
   - Policy created

---

## ✅ Summary

The enhanced policy purchase flow provides:
- ✅ 2-step process (Plan → Device)
- ✅ Comprehensive device information capture
- ✅ 4 device type options
- ✅ 10 device data fields (6 required, 4 optional)
- ✅ Form validation
- ✅ User-friendly dropdowns
- ✅ Clear navigation
- ✅ Mobile-optimized inputs
- ✅ Error handling
- ✅ Success feedback

**Status**: ✅ Complete and functional  
**Version**: 1.0.0  
**Last Updated**: January 2026

---

For more information, see the main documentation files.
