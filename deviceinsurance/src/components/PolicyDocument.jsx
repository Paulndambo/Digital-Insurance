import React from 'react';
import { Shield, Download, FileText, Calendar, DollarSign, User, Smartphone, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { pdf } from '@react-pdf/renderer';
import PolicyPDFDocument from './PolicyPDFDocument';

const PolicyDocument = ({ policy, onClose }) => {
  if (!policy) return null;

  const handleDownload = async () => {
    try {
      const blob = await pdf(<PolicyPDFDocument policy={policy} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${policy.policy_number}_Policy_Document.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'created' || statusLower === 'active') {
      return 'bg-green-100 text-green-800 border-green-300';
    } else if (statusLower === 'draft') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Action Bar - Not included in PDF */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-lg z-10">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl font-bold">Policy Document</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-8 md:p-12 text-gray-800 bg-white">
            {/* Header */}
            <div className="border-b-4 border-blue-600 pb-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-10 h-10 text-blue-600" />
                    <h1 className="text-4xl font-bold text-blue-600">DeviceShield Insurance</h1>
                  </div>
                  <p className="text-gray-600 text-sm">Protecting Your Digital Life</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Document ID</p>
                  <p className="font-mono text-lg font-bold">{policy.policy_number}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800">INSURANCE POLICY CERTIFICATE</h2>
                <p className="text-gray-600 mt-1">Device Insurance Policy</p>
              </div>
            </div>

            {/* Policy Information Section */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Policy Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Policy Number</p>
                  <p className="text-lg font-bold">{policy.policy_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Policy Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="text-lg font-semibold">
                    {policy.start_date ? new Date(policy.start_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Maturity Date</p>
                  <p className="text-lg font-semibold">
                    {policy.maturity_date ? new Date(policy.maturity_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : '-'}
                  </p>
                </div>
              </div>
            </section>

            {/* Policy Owner Section */}
            <section className="mb-8 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-600">Policy Owner</h3>
              </div>
              <p className="text-lg font-semibold">{policy.policy_owner_name}</p>
            </section>

            {/* Coverage Details */}
            {policy.gadget_pricing && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Coverage Details</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-gray-600">Cover Type:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {policy.gadget_pricing.cover_type || 'Standard Cover'}
                    </span>
                    {policy.gadget_pricing.cover_percentage && (
                      <>
                        <span className="text-sm text-gray-600">Cover Percentage:</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          {policy.gadget_pricing.cover_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {policy.gadget_pricing.pricingcomponents && policy.gadget_pricing.pricingcomponents.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Included Coverage Components:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {policy.gadget_pricing.pricingcomponents
                        .filter(component => component.included)
                        .map((component) => (
                          <div key={component.id} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{component.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Insured Devices */}
            {policy.policy_gadgets && policy.policy_gadgets.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Insured Devices</h3>
                {policy.policy_gadgets.map((gadget, index) => (
                  <div key={gadget.id} className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-bold">Device {index + 1}: {gadget.device_brand} {gadget.device_model}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Device Type</p>
                        <p className="font-semibold capitalize">{gadget.device_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                        <p className="font-mono text-sm font-semibold">{gadget.serial_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">IMEI Number</p>
                        <p className="font-mono text-sm font-semibold">{gadget.imei_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Purchase Date</p>
                        <p className="font-semibold">
                          {gadget.purchase_date ? new Date(gadget.purchase_date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Device Cost</p>
                        <p className="font-semibold text-lg">{formatCurrency(parseFloat(gadget.device_cost || 0))}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Premium</p>
                        <p className="font-semibold text-lg text-blue-600">{formatCurrency(parseFloat(gadget.premium || 0))}</p>
                      </div>
                    </div>
                    {gadget.description && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Description</p>
                        <p className="text-sm">{gadget.description}</p>
                      </div>
                    )}
                    {gadget.seller && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">Seller</p>
                        <p className="text-sm font-semibold">{gadget.seller}</p>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Financial Summary */}
            <section className="mb-8 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Financial Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Cover Amount</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(parseFloat(policy.cover_amount || 0))}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Premium</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(parseFloat(policy.premium || 0))}</p>
                </div>
              </div>
            </section>

            {/* Premium Schedule */}
            {policy.policypremiums && policy.policypremiums.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Premium Payment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Policy Number</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Expected Amount</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Due Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policy.policypremiums.map((premium) => (
                        <tr key={premium.id}>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{premium.policy_number}</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm font-semibold">{formatCurrency(parseFloat(premium.expected_amount || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {premium.due_date ? new Date(premium.due_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : '-'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              premium.status?.toLowerCase() === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : premium.status?.toLowerCase() === 'future'
                                ? 'bg-blue-100 text-blue-800'
                                : premium.status?.toLowerCase() === 'overdue'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {premium.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Terms and Conditions */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Terms and Conditions</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-semibold mb-2">1. Coverage Period</p>
                <p className="ml-4">
                  This policy is valid from {policy.start_date ? new Date(policy.start_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'the start date'} until {policy.maturity_date ? new Date(policy.maturity_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'the maturity date'}.
                </p>
                
                <p className="font-semibold mt-4 mb-2">2. Premium Payment</p>
                <p className="ml-4">
                  Premiums must be paid according to the schedule outlined above. Failure to pay premiums may result in policy cancellation.
                </p>

                <p className="font-semibold mt-4 mb-2">3. Claims Process</p>
                <p className="ml-4">
                  Claims can be filed 24/7 through your online dashboard. All claims are subject to verification and approval by our claims department.
                </p>

                <p className="font-semibold mt-4 mb-2">4. Coverage Limitations</p>
                <p className="ml-4">
                  Coverage is limited to the devices listed in this policy document. Any modifications or additions must be reported and approved.
                </p>

                <p className="font-semibold mt-4 mb-2">5. Policy Cancellation</p>
                <p className="ml-4">
                  This policy may be cancelled by either party with written notice. Refunds are subject to our cancellation policy.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t-4 border-blue-600">
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Issued By</p>
                  <p className="text-sm text-gray-600">DeviceShield Insurance</p>
                  <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Document Generated</p>
                  <p className="text-sm text-gray-600">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500">
                <p>This is an official policy document. Please keep this document safe.</p>
                <p className="mt-1">For inquiries, contact our customer service team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDocument;
