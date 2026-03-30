import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserType } from '@/types';
import { useRouter } from 'expo-router';
import { Check, ChevronDown, CreditCard, Lock, Mail, Phone, Shield, User, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const userTypeOptions: { value: UserType; label: string; description: string }[] = [
  { value: 'customer', label: 'Customer', description: 'Purchase insurance and file claims' },
  { value: 'seller', label: 'Seller', description: 'Sell devices and insurance policies' },
  { value: 'repair', label: 'Repair', description: 'Provide device repair services' },
  { value: 'seller_repair', label: 'Seller & Repair', description: 'Sell devices and provide repairs' },
];

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register } = useApp();

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    idNumber: string;
    gender: 'male' | 'female' | 'other' | '';
    password: string;
    confirmPassword: string;
    userType: UserType;
  }>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    idNumber: '',
    gender: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
  });
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectUserType = (type: UserType) => {
    setFormData(prev => ({ ...prev, userType: type }));
    setShowUserTypeDropdown(false);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || 
        !formData.phone || !formData.idNumber || !formData.gender || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Ensure gender is not empty before registering
      if (!formData.gender) {
        Alert.alert('Error', 'Please select gender');
        setLoading(false);
        return;
      }

      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        idNumber: formData.idNumber,
        gender: formData.gender as 'male' | 'female' | 'other',
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
      };
      const success = await register(registerData);
      
      if (success) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Registration Failed', 'Username already exists');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const selectedUserType = userTypeOptions.find(opt => opt.value === formData.userType);

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { 
              paddingTop: insets.top + 20,
              paddingBottom: Math.max(insets.bottom + 20, 40)
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + '20' }]}>
              <Shield size={50} color={colors.primary} />
            </View>
            <ThemedText type="title" style={styles.title}>
              Create Account
            </ThemedText>
            <ThemedText style={{ color: colors.muted, textAlign: 'center', fontSize: 14 }}>
              Join DeviceShield today
            </ThemedText>
          </View>

          {/* Register Form */}
          <Card style={styles.formCard}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>First Name *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <User size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your first name"
                  placeholderTextColor={colors.muted}
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Last Name *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <User size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your last name"
                  placeholderTextColor={colors.muted}
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Username *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <User size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Choose a username"
                  placeholderTextColor={colors.muted}
                  value={formData.username}
                  onChangeText={(value) => updateField('username', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Mail size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.muted}
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* ID Number or Passport Number */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>ID Number or Passport Number *</ThemedText>
              <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                Enter national ID or passport number
              </ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <CreditCard size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter ID or passport number"
                  placeholderTextColor={colors.muted}
                  value={formData.idNumber}
                  onChangeText={(value) => updateField('idNumber', value)}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Gender */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Gender *</ThemedText>
              <TouchableOpacity
                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                activeOpacity={0.7}
              >
                <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  <Users size={20} color={colors.muted} />
                  <ThemedText style={{ flex: 1, fontSize: 16 }}>
                    {formData.gender 
                      ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)
                      : 'Select gender'}
                  </ThemedText>
                  <ChevronDown size={20} color={colors.muted} />
                </View>
              </TouchableOpacity>

              {showGenderDropdown && (
                <Card style={StyleSheet.flatten([styles.dropdown, { borderColor: colors.border }])}>
                  {(['male', 'female', 'other'] as const).map((gender, index) => (
                    <TouchableOpacity
                      key={gender}
                      onPress={() => {
                        updateField('gender', gender);
                        setShowGenderDropdown(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[
                        styles.dropdownItem,
                        index !== 2 ? { borderBottomWidth: 1, borderBottomColor: colors.border } : {}
                      ]}>
                        <ThemedText style={{ flex: 1, fontSize: 16 }}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </ThemedText>
                        {formData.gender === gender && (
                          <Check size={20} color={colors.primary} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </Card>
              )}
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Phone Number *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Phone size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your phone number"
                  placeholderTextColor={colors.muted}
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* User Type Selection */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Account Type *</ThemedText>
              <TouchableOpacity
                onPress={() => setShowUserTypeDropdown(!showUserTypeDropdown)}
                activeOpacity={0.7}
              >
                <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  <User size={20} color={colors.muted} />
                  <View style={{ flex: 1 }}>
                    <ThemedText style={styles.selectedType}>
                      {selectedUserType?.label}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 12, color: colors.muted }}>
                      {selectedUserType?.description}
                    </ThemedText>
                  </View>
                  <ChevronDown size={20} color={colors.muted} />
                </View>
              </TouchableOpacity>

              {/* Dropdown Options */}
              {showUserTypeDropdown && (
                <Card style={StyleSheet.flatten([styles.dropdown, { borderColor: colors.border }])}>
                  {userTypeOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => selectUserType(option.value)}
                      activeOpacity={0.7}
                    >
                      <View style={[
                        styles.dropdownItem,
                        option.value !== userTypeOptions[userTypeOptions.length - 1].value 
                          ? { borderBottomWidth: 1, borderBottomColor: colors.border }
                          : {}
                      ]}>
                        <View style={{ flex: 1 }}>
                          <ThemedText style={styles.dropdownLabel}>
                            {option.label}
                          </ThemedText>
                          <ThemedText style={{ fontSize: 12, color: colors.muted }}>
                            {option.description}
                          </ThemedText>
                        </View>
                        {formData.userType === option.value && (
                          <Check size={20} color={colors.primary} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </Card>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Lock size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Create a password (min 6 characters)"
                  placeholderTextColor={colors.muted}
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Confirm Password *</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Lock size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.muted}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 16, fontStyle: 'italic' }}>
              * Required fields
            </ThemedText>

            {/* Register Button */}
            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
            />
          </Card>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <ThemedText style={{ color: colors.muted, fontSize: 15 }}>
              Already have an account?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={{ color: colors.primary, fontWeight: '700', fontSize: 15 }}>
                Sign In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  formCard: {
    marginBottom: 24,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 56,
    gap: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    fontWeight: '500',
  },
  selectedType: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1.5,
    padding: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
});
