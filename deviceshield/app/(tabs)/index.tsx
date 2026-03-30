import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Shield, FileText, DollarSign, Smartphone, PlusCircle, AlertTriangle, List, HelpCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { user, policies, claims } = useApp();
  const insets = useSafeAreaInsets();

  const activePolicies = policies.filter(p => p.status === 'active').length;
  const pendingClaims = claims.filter(c => c.status === 'pending' || c.status === 'processing').length;
  const totalCoverage = policies
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.device.value, 0);

  const metrics = [
    {
      label: 'Active Policies',
      value: activePolicies,
      icon: Shield,
      color: colors.primary,
    },
    {
      label: 'Pending Claims',
      value: pendingClaims,
      icon: FileText,
      color: colors.warning,
    },
    {
      label: 'Total Coverage',
      value: `$${totalCoverage.toLocaleString()}`,
      icon: DollarSign,
      color: colors.success,
    },
    {
      label: 'Devices Protected',
      value: policies.length,
      icon: Smartphone,
      color: colors.info,
    },
  ];

  const quickActions = [
    {
      label: 'New Policy',
      icon: PlusCircle,
      color: colors.primary,
      onPress: () => router.push('/policies'),
    },
    {
      label: 'File Claim',
      icon: AlertTriangle,
      color: colors.danger,
      onPress: () => router.push('/claims'),
    },
    {
      label: 'My Policies',
      icon: List,
      color: colors.secondary,
      onPress: () => router.push('/policies'),
    },
    {
      label: 'Support',
      icon: HelpCircle,
      color: colors.accent,
      onPress: () => {},
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.greeting}>
              Welcome back,
            </ThemedText>
            <ThemedText type="title" style={[styles.userName, { color: colors.primary }]}>
              {user?.name.split(' ')[0]}! 👋
            </ThemedText>
          </View>
        </View>

        {/* Welcome Card */}
        <Card style={[styles.welcomeCard, { backgroundColor: colors.primary + '08', borderColor: colors.primary + '20' }]}>
          <View style={styles.welcomeContent}>
            <View style={[styles.welcomeIconContainer, { backgroundColor: colors.primary + '15' }]}>
              <Shield 
                size={44} 
                color={colors.primary}
              />
            </View>
            <View style={styles.welcomeText}>
              <ThemedText type="subtitle" style={{ fontWeight: '700', marginBottom: 6 }}>
                Your devices are protected
              </ThemedText>
              <ThemedText style={{ color: colors.muted, fontSize: 14, lineHeight: 20 }}>
                We're here to help keep your devices safe and secure.
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Metrics Grid */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Overview
          </ThemedText>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} style={styles.metricCard}>
                  <View style={[styles.iconContainer, { backgroundColor: metric.color + '20' }]}>
                    <IconComponent size={24} color={metric.color} />
                  </View>
                  <ThemedText type="defaultSemiBold" style={styles.metricValue}>
                    {metric.value}
                  </ThemedText>
                  <ThemedText style={[styles.metricLabel, { color: colors.muted }]}>
                    {metric.label}
                  </ThemedText>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quick Actions
          </ThemedText>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={action.onPress}
                  activeOpacity={0.7}
                >
                  <Card style={styles.actionCard}>
                    <View style={[styles.actionIconContainer, { backgroundColor: action.color + '20' }]}>
                      <IconComponent size={28} color={action.color} />
                    </View>
                    <ThemedText style={styles.actionLabel}>
                      {action.label}
                    </ThemedText>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recent Activity
          </ThemedText>
          {claims.length > 0 ? (
            claims.slice(0, 3).map((claim) => (
              <Card key={claim.id} style={styles.activityCard}>
                <View style={styles.activityContent}>
                  <View style={[
                    styles.activityIcon,
                    { backgroundColor: colors.info + '20' }
                  ]}>
                    <FileText size={20} color={colors.info} />
                  </View>
                  <View style={styles.activityDetails}>
                    <ThemedText type="defaultSemiBold">
                      Claim {claim.claimNumber}
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                      {claim.description}
                    </ThemedText>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(claim.status, colors) + '20' }
                  ]}>
                    <ThemedText style={[
                      styles.statusText,
                      { color: getStatusColor(claim.status, colors) }
                    ]}>
                      {claim.status}
                    </ThemedText>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <ThemedText style={{ color: colors.muted, textAlign: 'center' }}>
                No recent activity
              </ThemedText>
            </Card>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function getStatusColor(status: string, colors: any) {
  switch (status) {
    case 'approved': return colors.success;
    case 'rejected': return colors.danger;
    case 'pending': return colors.warning;
    case 'processing': return colors.info;
    default: return colors.muted;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  userName: {
    fontSize: 34,
    marginTop: 6,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  welcomeCard: {
    marginBottom: 28,
    padding: 24,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  welcomeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    flex: 1,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metricCard: {
    flex: 1,
    minWidth: '47%',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 28,
    marginBottom: 6,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  actionCard: {
    width: 165,
    alignItems: 'center',
    padding: 20,
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  activityCard: {
    marginBottom: 14,
    padding: 18,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
});
