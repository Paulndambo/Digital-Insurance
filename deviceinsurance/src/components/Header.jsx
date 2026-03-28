import React, { useState } from 'react';
import { Shield, ArrowLeft, LogIn, LogOut, Home, Menu, X, Calculator } from 'lucide-react';
import { BRAND_NAME } from '../constants/branding';

const Header = ({ 
  currentView, 
  user, 
  showFlow, 
  step, 
  onHomeClick, 
  onLoginClick, 
  onLogout, 
  onDashboardClick, 
  onBackClick,
  onRequestQuote,
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

  const handleRequestQuote = () => {
    setMobileMenuOpen(false);
    onRequestQuote?.();
  };

  const showRequestQuoteCta =
    onRequestQuote &&
    (currentView === 'landing' ||
      currentView === 'request-quote' ||
      currentView === 'login');

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold tracking-tight">{BRAND_NAME}</span>
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
                {(currentView === 'landing' || currentView === 'request-quote') && (
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2 rounded-full font-medium text-slate-200 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <Calculator className="w-4 h-4 text-primary-400" />
                    Request quote
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
            <>
              {showRequestQuoteCta && (
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-2 sm:px-4 rounded-full font-medium text-xs sm:text-sm text-slate-200 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <Calculator className="w-4 h-4 shrink-0 text-primary-400" />
                  <span className="whitespace-nowrap">Quote</span>
                </button>
              )}
              {(currentView === 'landing' || currentView === 'request-quote' || currentView === 'login') && (
                <button 
                  onClick={onLoginClick}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </>
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
            {(currentView === 'landing' || currentView === 'request-quote') && onRequestQuote && (
              <button
                type="button"
                onClick={handleRequestQuote}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors text-left"
              >
                <Calculator className="w-5 h-5 text-primary-400" />
                <span>Request quote</span>
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
