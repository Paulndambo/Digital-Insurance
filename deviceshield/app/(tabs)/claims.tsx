import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Claim } from '@/types';
import { Plus, AlertTriangle, Lock, Wrench, FileText, Calendar, AlertCircle, CheckCircle, Shield, X } from 'lucide-react-native';

export default function ClaimsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { claims, policies, addClaim } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [claimType, setClaimType] = useState<Claim['type']>('damage');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date());
  const insets = useSafeAreaInsets();

  const activePolicies = policies.filter(p => p.status === 'active');

  const handleCreateClaim = () => {
    if (!selectedPolicyId || !description) {
      return;
    }

    const policy = policies.find(p => p.id === selectedPolicyId);
    if (!policy) return;

    const newClaim: Claim = {
      id: Date.now().toString(),
      policyId: selectedPolicyId,
      policy,
      claimNumber: `CLM-${new Date().getFullYear()}-${String(claims.length + 1).padStart(3, '0')}`,
      status: 'pending',
      type: claimType,
      description,
      dateReported: new Date(),
      dateOfIncident: incidentDate,
      documents: [],
    };

    addClaim(newClaim);
    setShowCreateModal(false);
    setDescription('');
    setSelectedPolicyId('');
  };

  const getStatusVariant = (status: Claim['status']) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      default: return 'default';
    }
  };

  const getClaimTypeIcon = (type: Claim['type']) => {
    switch (type) {
      case 'damage': return AlertTriangle;
      case 'theft': return Lock;
      case 'malfunction': return Wrench;
      default: return FileText;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <ThemedText type="title">My Claims</ThemedText>
              <ThemedText style={{ color: colors.muted }}>
                Track and manage your insurance claims
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => setShowCreateModal(true)}
              style={[styles.addButton, { backgroundColor: colors.primary }]}
            >
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Claims Summary */}
        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <ThemedText type="title" style={{ color: colors.warning }}>
              {claims.filter(c => c.status === 'pending' || c.status === 'processing').length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Pending
            </ThemedText>
          </Card>
          <Card style={styles.summaryCard}>
            <ThemedText type="title" style={{ color: colors.success }}>
              {claims.filter(c => c.status === 'approved').length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Approved
            </ThemedText>
          </Card>
          <Card style={styles.summaryCard}>
            <ThemedText type="title" style={{ color: colors.danger }}>
              {claims.filter(c => c.status === 'rejected').length}
            </ThemedText>
            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
              Rejected
            </ThemedText>
          </Card>
        </View>

        {/* Claims List */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            All Claims ({claims.length})
          </ThemedText>

          {claims.length > 0 ? (
            claims.map((claim) => {
              const ClaimIcon = getClaimTypeIcon(claim.type);
              return (
                <Card key={claim.id} style={styles.claimCard}>
                  <View style={styles.claimHeader}>
                    <View style={styles.claimTitleRow}>
                      <View style={[
                        styles.claimIcon,
                        { backgroundColor: colors.primary + '20' }
                      ]}>
                        <ClaimIcon 
                          size={24} 
                          color={colors.primary}
                        />
                      </View>
                      <View style={styles.claimInfo}>
                        <ThemedText type="defaultSemiBold">
                          {claim.claimNumber}
                        </ThemedText>
                        <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                          {claim.policy.device.name}
                        </ThemedText>
                      </View>
                    </View>
                    <Badge 
                      label={claim.status} 
                      variant={getStatusVariant(claim.status)}
                    />
                  </View>

                  <View style={styles.claimBody}>
                    <View style={styles.claimDetail}>
                      <Calendar size={16} color={colors.muted} />
                      <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                        Reported: {new Date(claim.dateReported).toLocaleDateString()}
                      </ThemedText>
                    </View>
                    <View style={styles.claimDetail}>
                      <AlertCircle size={16} color={colors.muted} />
                      <ThemedText style={{ color: colors.muted, fontSize: 12, textTransform: 'capitalize' }}>
                        Type: {claim.type}
                      </ThemedText>
                    </View>
                  </View>

                  <View style={styles.claimDescription}>
                    <ThemedText style={{ color: colors.text }}>
                      {claim.description}
                    </ThemedText>
                  </View>

                  {claim.approvedAmount && (
                    <View style={[styles.approvedAmount, { backgroundColor: colors.success + '10' }]}>
                      <CheckCircle size={20} color={colors.success} />
                      <ThemedText style={{ color: colors.success, fontWeight: '600' }}>
                        Approved: ${claim.approvedAmount}
                      </ThemedText>
                    </View>
                  )}
                </Card>
              );
            })
          ) : (
            <Card style={styles.emptyCard}>
              <FileText 
                size={48} 
                color={colors.muted}
                style={{ marginBottom: 12 }}
              />
              <ThemedText type="subtitle" style={{ color: colors.muted, textAlign: 'center' }}>
                No Claims Yet
              </ThemedText>
              <ThemedText style={{ color: colors.muted, textAlign: 'center', marginTop: 8 }}>
                File your first claim to get started
              </ThemedText>
              <Button
                title="Create Claim"
                onPress={() => setShowCreateModal(true)}
                variant="primary"
                style={{ marginTop: 16 }}
              />
            </Card>
          )}
        </View>
      </ScrollView>

      {/* Create Claim Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">File a Claim</ThemedText>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={28} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Select Policy */}
              <View style={styles.formGroup}>
                <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                  Select Policy
                </ThemedText>
                {activePolicies.length > 0 ? (
                  activePolicies.map((policy) => (
                    <TouchableOpacity
                      key={policy.id}
                      onPress={() => setSelectedPolicyId(policy.id)}
                      activeOpacity={0.7}
                    >
                      <Card style={[
                        styles.policyOption,
                        selectedPolicyId === policy.id && {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        }
                      ]}>
                        <View style={styles.policyOptionContent}>
                          <Shield 
                            size={24} 
                            color={colors.primary}
                          />
                          <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold">
                              {policy.device.name}
                            </ThemedText>
                            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                              {policy.policyNumber}
                            </ThemedText>
                          </View>
                          {selectedPolicyId === policy.id && (
                            <CheckCircle 
                              size={24} 
                              color={colors.primary}
                            />
                          )}
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Card style={styles.emptyPolicies}>
                    <ThemedText style={{ color: colors.muted, textAlign: 'center' }}>
                      No active policies found. Please purchase a policy first.
                    </ThemedText>
                  </Card>
                )}
              </View>

              {/* Claim Type */}
              <View style={styles.formGroup}>
                <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                  Claim Type
                </ThemedText>
                <View style={styles.typeGrid}>
                  {(['damage', 'theft', 'malfunction', 'other'] as const).map((type) => {
                    const TypeIcon = getClaimTypeIcon(type);
                    return (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setClaimType(type)}
                        activeOpacity={0.7}
                      >
                        <Card style={[
                          styles.typeOption,
                          claimType === type && {
                            borderColor: colors.primary,
                            borderWidth: 2,
                            backgroundColor: colors.primary + '10',
                          }
                        ]}>
                          <TypeIcon 
                            size={24} 
                            color={claimType === type ? colors.primary : colors.muted}
                          />
                          <ThemedText style={[
                            styles.typeLabel,
                            claimType === type && { color: colors.primary, fontWeight: '600' }
                          ]}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </ThemedText>
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Description */}
              <View style={styles.formGroup}>
                <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                  Description
                </ThemedText>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      color: colors.text,
                    }
                  ]}
                  placeholder="Describe what happened..."
                  placeholderTextColor={colors.muted}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <Button
                title="Submit Claim"
                onPress={handleCreateClaim}
                variant="primary"
                disabled={!selectedPolicyId || !description}
                style={{ marginTop: 8 }}
              />
              <Button
                title="Cancel"
                onPress={() => setShowCreateModal(false)}
                variant="outline"
                style={{ marginTop: 12 }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  header: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
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
  claimCard: {
    marginBottom: 18,
    padding: 20,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  claimTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  claimIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimInfo: {
    flex: 1,
  },
  claimBody: {
    gap: 8,
    marginBottom: 12,
  },
  claimDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  claimDescription: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  approvedAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  emptyCard: {
    padding: 48,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalBody: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    marginBottom: 12,
  },
  policyOption: {
    marginBottom: 12,
    padding: 12,
  },
  policyOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emptyPolicies: {
    padding: 24,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeOption: {
    width: 160,
    alignItems: 'center',
    padding: 16,
  },
  typeLabel: {
    marginTop: 8,
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
});
