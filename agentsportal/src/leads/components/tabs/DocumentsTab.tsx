import React from 'react';
import { FileText } from 'lucide-react';

const DocumentsTab: React.FC = () => {
  return (
    <div className="text-center py-12">
      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
      <p className="text-gray-500 mb-6">Upload quotes, proposals, and other documents related to this lead.</p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Upload Document
      </button>
    </div>
  );
};

export default DocumentsTab; 