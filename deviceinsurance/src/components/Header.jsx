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
    <header className="border-b border-white/[0.06] bg-[#0b0f1a]/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="w-full px-4 sm:px-5 lg:px-6 xl:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15 ring-1 ring-primary-500/30">
            <Shield className="h-4 w-4 text-primary-400" />
          </div>
          <span className="text-base font-bold tracking-tight">{BRAND_NAME}</span>
        </button>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3">
                {currentView !== 'dashboard' && (
                  <button
                    onClick={onDashboardClick}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.09]"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </button>
                )}
                {(currentView === 'landing' || currentView === 'request-quote') && (
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <Calculator className="h-4 w-4 text-primary-400" />
                    Request quote
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              {showRequestQuoteCta && (
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <Calculator className="h-4 w-4 shrink-0 text-primary-400" />
                  Quote
                </button>
              )}
              {(currentView === 'login' || currentView === 'purchase' || currentView === 'request-quote') && (
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
                >
                  <LogIn className="h-4 w-4" />
                  Log in
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
        <div className="md:hidden border-t border-white/[0.06] bg-[#0d1220] animate-slide-down">
          <div className="w-full px-4 sm:px-5 lg:px-6 xl:px-8 py-3 space-y-1">
            {currentView !== 'dashboard' && (
              <button
                onClick={handleDashboardClick}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white text-left"
              >
                <Home className="h-4 w-4 text-primary-400" />
                Dashboard
              </button>
            )}
            {(currentView === 'landing' || currentView === 'request-quote') && onRequestQuote && (
              <button
                type="button"
                onClick={handleRequestQuote}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white text-left"
              >
                <Calculator className="h-4 w-4 text-primary-400" />
                Request quote
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-200 text-left"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
