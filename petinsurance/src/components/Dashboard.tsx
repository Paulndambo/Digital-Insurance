import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Shield, 
  PawPrint, 
  CreditCard, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';
import PoliciesList from './PoliciesList';
import PetsList from './PetsList';
import PaymentsList from './PaymentsList';
import ClaimsList from './ClaimsList';
import PolicyDetails from './PolicyDetails';

interface DashboardProps {
  onLogout: () => void;
}

type DashboardView = 'overview' | 'policies' | 'pets' | 'payments' | 'claims' | 'policy-details';

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('');

  const metrics = [
    {
      title: 'Total Policies',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Pets',
      value: '2,891',
      change: '+8%',
      changeType: 'positive' as const,
      icon: PawPrint,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: 'KSh 4.2M',
      change: '+15%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Pending Claims',
      value: '23',
      change: '-5%',
      changeType: 'negative' as const,
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'pets', label: 'Pets', icon: PawPrint },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'claims', label: 'Claims', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="card-pet p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} from last month
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-pet p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Claims</h3>
          <div className="space-y-4">
            {[
              { id: 'CLM-001', pet: 'Max (Dog)', amount: 'KSh 15,000', status: 'Approved' },
              { id: 'CLM-002', pet: 'Luna (Cat)', amount: 'KSh 8,500', status: 'Pending' },
              { id: 'CLM-003', pet: 'Buddy (Dog)', amount: 'KSh 22,000', status: 'Under Review' }
            ].map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{claim.id}</p>
                  <p className="text-sm text-gray-600">{claim.pet}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{claim.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-pet p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Policies</h3>
          <div className="space-y-4">
            {[
              { id: 'POL-001', owner: 'John Doe', plan: 'Essential', status: 'Active' },
              { id: 'POL-002', owner: 'Jane Smith', plan: 'Comprehensive', status: 'Active' },
              { id: 'POL-003', owner: 'Mike Johnson', plan: 'Accident Only', status: 'Pending' }
            ].map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{policy.id}</p>
                  <p className="text-sm text-gray-600">{policy.owner}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{policy.plan}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PetGuard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as DashboardView)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-pet'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {navigation.find(nav => nav.id === currentView)?.label}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@petguard.co.ke</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {currentView === 'overview' && renderOverview()}
          {currentView === 'policies' && (
            <PoliciesList 
              onViewPolicy={(policyId) => {
                setSelectedPolicyId(policyId);
                setCurrentView('policy-details');
              }}
            />
          )}
          {currentView === 'pets' && <PetsList />}
          {currentView === 'payments' && <PaymentsList />}
          {currentView === 'claims' && <ClaimsList />}
          {currentView === 'policy-details' && (
            <PolicyDetails 
              policyId={selectedPolicyId}
              onBack={() => setCurrentView('policies')}
            />
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
