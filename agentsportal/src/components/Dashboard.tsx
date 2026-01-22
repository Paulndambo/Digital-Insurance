import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Calculator, 
  Users, 
  DollarSign,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Revenue',
      value: '$284,500',
      change: '+12.3%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Active Policies',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: FileText,
    },
    {
      name: 'Pending Quotes',
      value: '23',
      change: '-4.1%',
      changeType: 'negative',
      icon: Calculator,
    },
    {
      name: 'Active Leads',
      value: '42',
      change: '+15.7%',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'policy',
      title: 'Auto Policy Renewed',
      client: 'Sarah Johnson',
      amount: '$1,200',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'quote',
      title: 'Home Insurance Quote',
      client: 'Mike Davis',
      amount: '$850',
      time: '4 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'lead',
      title: 'New Lead Assigned',
      client: 'Emma Wilson',
      amount: 'Life Insurance',
      time: '6 hours ago',
      status: 'new',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, John! Here's your performance overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100' :
                    activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className={`w-5 h-5 text-green-600`} />
                    ) : activity.status === 'pending' ? (
                      <Clock className={`w-5 h-5 text-yellow-600`} />
                    ) : (
                      <Target className={`w-5 h-5 text-blue-600`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/policies"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-900">View All Policies</span>
            </Link>
            <Link
              to="/quotes"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <Calculator className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Manage Quotes</span>
            </Link>
            <Link
              to="/leads"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Follow Up Leads</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;