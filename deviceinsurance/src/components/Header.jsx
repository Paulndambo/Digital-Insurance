import React, { useState } from 'react';
import { Shield, ArrowLeft, LogIn, LogOut, Home, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    setMobileMenuOpen(false);
    onDashboardClick();
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    onLogout();
  };

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
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3">
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
                  <span>Logout</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </>
          ) : (
            currentView === 'landing' && (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
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
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {user && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-sm animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
            {currentView !== 'dashboard' && (
              <button
                onClick={handleDashboardClick}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors text-left"
              >
                <Home className="w-5 h-5 text-primary-400" />
                <span>Dashboard</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors text-left text-slate-300 hover:text-white"
            >
              <LogOut className="w-5 h-5 text-accent-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
