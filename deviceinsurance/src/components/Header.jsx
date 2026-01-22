import React from 'react';
import { Shield, ArrowLeft, LogIn, LogOut, Home } from 'lucide-react';

const Header = ({ 
  currentView, 
  user, 
  showFlow, 
  step, 
  onHomeClick, 
  onLoginClick, 
  onLogout, 
  onDashboardClick, 
  onBackClick
}) => {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold">DeviceShield</span>
        </button>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {currentView !== 'dashboard' && (
                <button 
                  onClick={onDashboardClick}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
              )}
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            currentView === 'landing' && (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )
          )}
          
          
          {showFlow && step > 1 && step < 5 && (
            <button 
              onClick={onBackClick}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
