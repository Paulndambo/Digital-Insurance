import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  FileText, 
  Users, 
  DollarSign, 
  CreditCard,
  Store,
  Smartphone,
  Menu,
  X,
  Search,
  Filter
} from 'lucide-react';
import AdminMetrics from './AdminMetrics';
import PoliciesTable from './PoliciesTable';
import ClaimsTable from './ClaimsTable';
import PolicyOwnersTable from './PolicyOwnersTable';
import PremiumsTable from './PremiumsTable';
import PaymentsTable from './PaymentsTable';
import DeviceOutletsTable from './DeviceOutletsTable';
import InsuredDevicesTable from './InsuredDevicesTable';

const AdminDashboard = ({ 
  user, 
  policies, 
  claims,
  onPolicyClick,
  onClaimDetailClick,
  onCreateClaim
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  // Set sidebar open on desktop by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'metrics', label: 'Metrics', icon: LayoutDashboard },
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'claims', label: 'Claims', icon: FileText },
    { id: 'policy-owners', label: 'Policy Owners', icon: Users },
    { id: 'premiums', label: 'Premiums', icon: DollarSign },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'device-outlets', label: 'Device Outlets', icon: Store },
    { id: 'insured-devices', label: 'Insured Devices', icon: Smartphone },
  ];

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
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } bg-slate-800/50 backdrop-blur-sm border-r border-white/10 transition-all duration-300 flex flex-col fixed md:relative h-full z-20`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold">Admin Panel</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'hover:bg-white/10 text-slate-300'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <div className="text-sm text-slate-400">Logged in as</div>
            <div className="font-semibold mt-1 truncate">{user.name || user.username}</div>
            <div className="text-xs text-slate-500 mt-1">{user.role}</div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
        sidebarOpen ? 'md:ml-0' : 'md:ml-0'
      }`}>
        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
