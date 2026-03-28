import React from 'react';
import AdminMetrics from './AdminMetrics';
import PoliciesTable from './PoliciesTable';
import ClaimsTable from './ClaimsTable';
import PolicyOwnersTable from './PolicyOwnersTable';
import PremiumsTable from './PremiumsTable';
import PaymentsTable from './PaymentsTable';
import DeviceOutletsTable from './DeviceOutletsTable';
import InsuredDevicesTable from './InsuredDevicesTable';

const AdminDashboard = ({
  policies,
  claims,
  onPolicyClick,
  onClaimDetailClick,
  onCreateClaim,
  activeTab = 'metrics',
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'metrics':
        return <AdminMetrics policies={policies} claims={claims} />;
      case 'policies':
        return <PoliciesTable onPolicyClick={onPolicyClick} />;
      case 'claims':
        return <ClaimsTable onClaimDetailClick={onClaimDetailClick} onCreateClaim={onCreateClaim} />;
      case 'policy-owners':
        return <PolicyOwnersTable policies={policies} />;
      case 'premiums':
        return <PremiumsTable policies={policies} />;
      case 'payments':
        return <PaymentsTable policies={policies} />;
      case 'device-outlets':
        return <DeviceOutletsTable />;
      case 'insured-devices':
        return <InsuredDevicesTable />;
      default:
        return <AdminMetrics policies={policies} claims={claims} />;
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
