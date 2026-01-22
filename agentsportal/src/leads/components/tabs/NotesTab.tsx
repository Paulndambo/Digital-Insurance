import React, { useState } from 'react';
import { Plus, User, MoreVertical, Edit, Copy, Trash2 } from 'lucide-react';
import { Lead } from '../../types';
import { formatDate } from '../../utils';

interface NotesTabProps {
  lead: Lead;
  newNote: string;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ lead, newNote, onNewNoteChange, onAddNote }) => {
  const [showNoteActions, setShowNoteActions] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notes & Comments</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Note</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {lead.notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{note.author}</p>
                  <p className="text-sm text-gray-500">{formatDate(note.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {note.type === 'important' && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Important
                  </span>
                )}
                <button 
                  onClick={() => setShowNoteActions(showNoteActions === note.id ? null : note.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed">{note.content}</p>
            
            {showNoteActions === note.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <textarea
          value={newNote}
          onChange={(e) => onNewNoteChange(e.target.value)}
          placeholder="Add a new note..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Mark as Important
            </button>
          </div>
          <button
            onClick={onAddNote}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesTab; 