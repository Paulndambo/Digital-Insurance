import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { Lock, Shield, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const success = await login({ username, password });
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

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
          {/* Logo/Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + '20' }]}>
              <Shield size={50} color={colors.primary} />
            </View>
            <ThemedText type="title" style={styles.title}>
              DeviceShield
            </ThemedText>
            <ThemedText style={{ color: colors.muted, textAlign: 'center', fontSize: 14 }}>
              Sign in to your account
            </ThemedText>
          </View>

          {/* Login Form */}
          <Card style={styles.formCard}>

            {/* Username Input */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Username</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <User size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your username"
                  placeholderTextColor={colors.muted}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Lock size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Login Button */}
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            />

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <ThemedText style={{ color: colors.primary, fontSize: 14, fontWeight: '600' }}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>
          </Card>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <ThemedText style={{ color: colors.muted, fontSize: 15 }}>
              Don't have an account?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <ThemedText style={{ color: colors.primary, fontWeight: '700', fontSize: 15 }}>
                Sign Up
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
  formTitle: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  inputGroup: {
    marginBottom: 20,
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
    height: 56,
    gap: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  demoCard: {
    padding: 12,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
});
