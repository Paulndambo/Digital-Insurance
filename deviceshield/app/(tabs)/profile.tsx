import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { 
  Shield, FileText, CheckCircle, Mail, Phone, Home, User, 
  Lock, CreditCard, HelpCircle, FileCheck, HandHeart, 
  Bell, Moon, Info, ChevronRight, LogOut 
} from 'lucide-react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, policies, claims, logout } = useApp();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: User, label: 'Personal Information', onPress: () => {} },
        { icon: Mail, label: 'Email & Notifications', onPress: () => {} },
        { icon: Lock, label: 'Security & Privacy', onPress: () => {} },
        { icon: CreditCard, label: 'Payment Methods', onPress: () => {} },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', onPress: () => {} },
        { icon: Phone, label: 'Contact Support', onPress: () => {} },
        { icon: FileCheck, label: 'Terms & Conditions', onPress: () => {} },
        { icon: HandHeart, label: 'Privacy Policy', onPress: () => {} },
      ],
    },
    {
      section: 'App',
      items: [
        { icon: Bell, label: 'Notifications', onPress: () => {} },
        { icon: Moon, label: 'Dark Mode', onPress: () => {} },
        { icon: Info, label: 'About', onPress: () => {} },
      ],
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={[styles.avatarText, { color: colors.primary }]}>
                {user?.name.split(' ').map(n => n[0]).join('')}
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="title">{user?.name}</ThemedText>
              <ThemedText style={{ color: colors.muted }}>{user?.email}</ThemedText>
              <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                Member since {new Date(user?.joinDate || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Shield 
              size={24} 
              color={colors.primary}
              style={{ marginBottom: 8 }}
            />
            <ThemedText type="title" style={{ color: colors.primary }}>
              {policies.filter(p => p.status === 'active').length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Active Policies
            </ThemedText>
          </Card>
          <Card style={styles.statCard}>
            <FileText 
              size={24} 
              color={colors.success}
              style={{ marginBottom: 8 }}
            />
            <ThemedText type="title" style={{ color: colors.success }}>
              {claims.length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Total Claims
            </ThemedText>
          </Card>
          <Card style={styles.statCard}>
            <CheckCircle 
              size={24} 
              color={colors.info}
              style={{ marginBottom: 8 }}
            />
            <ThemedText type="title" style={{ color: colors.info }}>
              {claims.filter(c => c.status === 'approved').length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Approved
            </ThemedText>
          </Card>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Contact Information
          </ThemedText>
          <Card>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Mail size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <ThemedText style={{ color: colors.muted, fontSize: 12 }}>Email</ThemedText>
                <ThemedText type="defaultSemiBold">{user?.email}</ThemedText>
              </View>
            </View>
            <View style={[styles.contactItem, styles.contactItemBorder]}>
              <View style={styles.contactIcon}>
                <Phone size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <ThemedText style={{ color: colors.muted, fontSize: 12 }}>Phone</ThemedText>
                <ThemedText type="defaultSemiBold">{user?.phone}</ThemedText>
              </View>
            </View>
            <View style={[styles.contactItem, styles.contactItemBorder]}>
              <View style={styles.contactIcon}>
                <Home size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <ThemedText style={{ color: colors.muted, fontSize: 12 }}>Address</ThemedText>
                <ThemedText type="defaultSemiBold">{user?.address || 'Not provided'}</ThemedText>
              </View>
            </View>
          </Card>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              {section.section}
            </ThemedText>
            <Card>
              {section.items.map((item, itemIndex) => {
                const ItemIcon = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.menuItem,
                      itemIndex > 0 && styles.menuItemBorder
                    ]}>
                      <View style={styles.menuItemLeft}>
                        <View style={[styles.menuIcon, { backgroundColor: colors.primary + '10' }]}>
                          <ItemIcon size={20} color={colors.primary} />
                        </View>
                        <ThemedText>{item.label}</ThemedText>
                      </View>
                      <ChevronRight size={20} color={colors.muted} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          activeOpacity={0.7}
          style={styles.logoutButton}
        >
          <Card style={[styles.logoutCard, { borderColor: colors.danger }]}>
            <View style={styles.logoutContent}>
              <LogOut size={24} color={colors.danger} />
              <ThemedText style={{ color: colors.danger, fontWeight: '600' }}>
                Log Out
              </ThemedText>
            </View>
          </Card>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <ThemedText style={{ color: colors.muted, fontSize: 12, textAlign: 'center' }}>
            DeviceShield v1.0.0
          </ThemedText>
          <ThemedText style={{ color: colors.muted, fontSize: 12, textAlign: 'center' }}>
            © 2026 DigiInsure. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  contactItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginBottom: 16,
  },
  logoutCard: {
    borderWidth: 2,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  versionContainer: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 16,
  },
});
