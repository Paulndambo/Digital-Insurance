import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PlanDetails from './components/PlanDetails';
import PurchaseFlow from './components/PurchaseFlow';
import QuickQuote from './components/QuickQuote';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

type ViewType = 'landing' | 'plan-details' | 'quick-quote' | 'purchase' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // For demo purposes, you can set this to true to access dashboard

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartPurchase = () => {
    setCurrentView('purchase');
    setSelectedPlanId(''); // Always start from plan selection
  };

  const handleViewPlanDetails = (planId: string) => {
    setSelectedPlanId(planId);
    setCurrentView('plan-details');
  };

  const handleBuyNow = () => {
    setCurrentView('purchase');
    // Keep the selected plan ID for the purchase flow
  };

  const handleGetQuote = () => {
    setCurrentView('quick-quote');
  };

  const handleProceedToPurchase = () => {
    setCurrentView('landing'); // This will show the plans section
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedPlanId('');
  };

  const handleBackToPlans = () => {
    setCurrentView('landing');
  };

  const handleBackToPlansFromPurchase = () => {
    setCurrentView('landing');
    // Scroll to plans section after a short delay to ensure the page has loaded
    setTimeout(() => {
      const plansSection = document.getElementById('plans');
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentView('landing');
  };

  // For demo purposes - you can toggle this to access the dashboard
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-pet">
            <div className="spinner"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Loading PetGuard...</h2>
          <p className="text-gray-600">Preparing your pet insurance experience</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'landing' && (
          <LandingPage
            onStartPurchase={handleStartPurchase}
            onViewPlanDetails={handleViewPlanDetails}
            onGetQuote={handleGetQuote}
            onLogin={toggleAdmin}
          />
        )}
        {currentView === 'plan-details' && (
          <PlanDetails
            planId={selectedPlanId}
            onBack={handleBackToPlans}
            onBuyNow={handleBuyNow}
          />
        )}
        {currentView === 'quick-quote' && (
          <QuickQuote
            onBack={handleBackToLanding}
            onProceedToPurchase={handleProceedToPurchase}
          />
        )}
        {currentView === 'purchase' && (
          <PurchaseFlow
            onBack={handleBackToLanding}
            selectedPlanId={selectedPlanId}
            onBackToPlans={handleBackToPlansFromPurchase}
          />
        )}
        {currentView === 'dashboard' && (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;