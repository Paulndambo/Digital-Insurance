import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from '../constants/currency';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 4,
    borderBottomColor: '#2563eb',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  companyTagline: {
    fontSize: 10,
    color: '#4b5563',
  },
  documentId: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
  },
  documentIdValue: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#bfdbfe',
    borderBottomStyle: 'solid',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  gridItem: {
    width: '50%',
    marginBottom: 10,
  },
  label: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  valueLarge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueBlue: {
    color: '#2563eb',
  },
  valueGreen: {
    color: '#16a34a',
  },
  badge: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgeYellow: {
    backgroundColor: '#fef9c3',
    color: '#854d0e',
  },
  badgeGray: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  badgeRed: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  box: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  boxBlue: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#bfdbfe',
    borderStyle: 'solid',
  },
  boxTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  deviceCard: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
    marginBottom: 15,
  },
  deviceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  deviceGridItem: {
    width: '50%',
    marginBottom: 8,
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    borderBottomStyle: 'solid',
    paddingTop: 8,
    paddingBottom: 8,
  },
  tableHeader: {
    backgroundColor: '#dbeafe',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableCell: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 9,
  },
  tableCellBold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 4,
    borderTopColor: '#2563eb',
    borderTopStyle: 'solid',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
  },
  termsSection: {
    marginTop: 20,
  },
  termsItem: {
    marginBottom: 10,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  termsText: {
    fontSize: 9,
    color: '#4b5563',
    marginLeft: 15,
    lineHeight: 1.5,
  },
  componentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  componentItem: {
    width: '50%',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    marginRight: 5,
    color: '#16a34a',
  },
});

const PolicyPDFDocument = ({ policy }) => {
  const getStatusBadgeStyle = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'created' || statusLower === 'active') {
      return styles.badgeGreen;
    } else if (statusLower === 'draft') {
      return styles.badgeYellow;
    }
    return styles.badgeGray;
  };

  const getPremiumStatusBadgeStyle = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'paid') {
      return styles.badgeGreen;
    } else if (statusLower === 'future') {
      return styles.badgeBlue;
    } else if (statusLower === 'overdue') {
      return styles.badgeRed;
    }
    return styles.badgeGray;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.companyName}>DeviceShield Insurance</Text>
              <Text style={styles.companyTagline}>Protecting Your Digital Life</Text>
            </View>
            <View>
              <Text style={styles.documentId}>Document ID</Text>
              <Text style={styles.documentIdValue}>{policy.policy_number}</Text>
            </View>
          </View>
          <Text style={styles.title}>INSURANCE POLICY CERTIFICATE</Text>
          <Text style={styles.subtitle}>Device Insurance Policy</Text>
        </View>

        {/* Policy Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Policy Number</Text>
              <Text style={styles.value}>{policy.policy_number}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Policy Status</Text>
              <Text style={[styles.badge, getStatusBadgeStyle(policy.status)]}>
                {policy.status}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{formatDate(policy.start_date)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Maturity Date</Text>
              <Text style={styles.value}>{formatDate(policy.maturity_date)}</Text>
            </View>
          </View>
        </View>

        {/* Policy Owner */}
        <View style={[styles.box, styles.section]}>
          <Text style={styles.boxTitle}>Policy Owner</Text>
          <Text style={styles.ownerName}>{policy.policy_owner_name}</Text>
        </View>

        {/* Coverage Details */}
        {policy.gadget_pricing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coverage Details</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <Text style={styles.label}>Cover Type: </Text>
              <Text style={[styles.badge, styles.badgeBlue]}>
                {policy.gadget_pricing.cover_type || 'Standard Cover'}
              </Text>
              {policy.gadget_pricing.cover_percentage && (
                <>
                  <Text style={[styles.label, { marginLeft: 15 }]}>Cover Percentage: </Text>
                  <Text style={[styles.badge, styles.badgeGreen]}>
                    {policy.gadget_pricing.cover_percentage}%
                  </Text>
                </>
              )}
            </View>
            {policy.gadget_pricing.pricingcomponents && policy.gadget_pricing.pricingcomponents.length > 0 && (
              <View>
                <Text style={[styles.label, { fontWeight: 'bold', marginBottom: 8 }]}>
                  Included Coverage Components:
                </Text>
                <View style={styles.componentList}>
                  {policy.gadget_pricing.pricingcomponents
                    .filter(component => component.included)
                    .map((component) => (
                      <View key={component.id} style={styles.componentItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.value}>{component.name}</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Insured Devices */}
        {policy.policy_gadgets && policy.policy_gadgets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insured Devices</Text>
            {policy.policy_gadgets.map((gadget, index) => (
              <View key={gadget.id} style={styles.deviceCard}>
                <Text style={styles.deviceTitle}>
                  Device {index + 1}: {gadget.device_brand} {gadget.device_model}
                </Text>
                <View style={styles.deviceGrid}>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>Device Type</Text>
                    <Text style={styles.value}>{gadget.device_type}</Text>
                  </View>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>Serial Number</Text>
                    <Text style={[styles.value, { fontFamily: 'Courier', fontSize: 9 }]}>
                      {gadget.serial_number}
                    </Text>
                  </View>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>IMEI Number</Text>
                    <Text style={[styles.value, { fontFamily: 'Courier', fontSize: 9 }]}>
                      {gadget.imei_number}
                    </Text>
                  </View>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>Purchase Date</Text>
                    <Text style={styles.value}>{formatDate(gadget.purchase_date)}</Text>
                  </View>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>Device Cost</Text>
                    <Text style={styles.valueLarge}>
                      {formatCurrency(parseFloat(gadget.device_cost || 0))}
                    </Text>
                  </View>
                  <View style={styles.deviceGridItem}>
                    <Text style={styles.label}>Premium</Text>
                    <Text style={[styles.valueLarge, styles.valueBlue]}>
                      {formatCurrency(parseFloat(gadget.premium || 0))}
                    </Text>
                  </View>
                </View>
                {gadget.description && (
                  <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#e5e7eb', borderTopStyle: 'solid' }}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.value}>{gadget.description}</Text>
                  </View>
                )}
                {gadget.seller && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={styles.label}>Seller</Text>
                    <Text style={[styles.value, { fontSize: 10 }]}>{gadget.seller}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Financial Summary */}
        <View style={[styles.box, styles.boxBlue, styles.section]}>
          <Text style={styles.sectionTitle}>Financial Summary</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Total Cover Amount</Text>
              <Text style={[styles.valueLarge, styles.valueBlue]}>
                {formatCurrency(parseFloat(policy.cover_amount || 0))}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Total Premium</Text>
              <Text style={[styles.valueLarge, styles.valueGreen]}>
                {formatCurrency(parseFloat(policy.premium || 0))}
              </Text>
            </View>
          </View>
        </View>

        {/* Premium Schedule */}
        {policy.policypremiums && policy.policypremiums.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium Payment Schedule</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Policy Number</Text>
                <Text style={styles.tableCell}>Expected Amount</Text>
                <Text style={styles.tableCell}>Due Date</Text>
                <Text style={styles.tableCell}>Status</Text>
              </View>
              {policy.policypremiums.map((premium) => (
                <View key={premium.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{premium.policy_number}</Text>
                  <Text style={[styles.tableCell, styles.tableCellBold]}>
                    {formatCurrency(parseFloat(premium.expected_amount || 0))}
                  </Text>
                  <Text style={styles.tableCell}>{formatDate(premium.due_date)}</Text>
                  <Text style={[styles.badge, getPremiumStatusBadgeStyle(premium.status), { fontSize: 8 }]}>
                    {premium.status}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          <View style={styles.termsItem}>
            <Text style={styles.termsTitle}>1. Coverage Period</Text>
            <Text style={styles.termsText}>
              This policy is valid from {formatDate(policy.start_date)} until {formatDate(policy.maturity_date)}.
            </Text>
          </View>
          <View style={styles.termsItem}>
            <Text style={styles.termsTitle}>2. Premium Payment</Text>
            <Text style={styles.termsText}>
              Premiums must be paid according to the schedule outlined above. Failure to pay premiums may result in policy cancellation.
            </Text>
          </View>
          <View style={styles.termsItem}>
            <Text style={styles.termsTitle}>3. Claims Process</Text>
            <Text style={styles.termsText}>
              Claims can be filed 24/7 through your online dashboard. All claims are subject to verification and approval by our claims department.
            </Text>
          </View>
          <View style={styles.termsItem}>
            <Text style={styles.termsTitle}>4. Coverage Limitations</Text>
            <Text style={styles.termsText}>
              Coverage is limited to the devices listed in this policy document. Any modifications or additions must be reported and approved.
            </Text>
          </View>
          <View style={styles.termsItem}>
            <Text style={styles.termsTitle}>5. Policy Cancellation</Text>
            <Text style={styles.termsText}>
              This policy may be cancelled by either party with written notice. Refunds are subject to our cancellation policy.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View>
              <Text style={styles.termsTitle}>Issued By</Text>
              <Text style={styles.termsText}>DeviceShield Insurance</Text>
              <Text style={styles.termsText}>Nairobi, Kenya</Text>
            </View>
            <View>
              <Text style={styles.termsTitle}>Document Generated</Text>
              <Text style={styles.termsText}>{formatDateTime(new Date().toISOString())}</Text>
            </View>
          </View>
          <Text style={styles.footerText}>
            This is an official policy document. Please keep this document safe.
          </Text>
          <Text style={styles.footerText}>
            For inquiries, contact our customer service team.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PolicyPDFDocument;
