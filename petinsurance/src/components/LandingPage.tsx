import React, { useState } from 'react';
import { ArrowRight, Menu, X, Shield, Heart, Star, Check, PawPrint, Phone, Mail, MapPin, LogIn } from 'lucide-react';

interface LandingPageProps {
  onStartPurchase: () => void;
  onViewPlanDetails: (planId: string) => void;
  onGetQuote: () => void;
  onLogin: () => void;
}

const plans = [
  {
    id: 'accident_only',
    name: 'Accident Only',
    description: 'Basic protection for unexpected accidents',
    price: 'KSh 250',
    period: 'per month',
    features: [
      'Accident coverage up to KSh 150,000',
      'Emergency vet visits',
      'X-rays & diagnostics'
    ],
    popular: false,
    icon: '🛡️'
  },
  {
    id: 'essential',
    name: 'Essential',
    description: 'Complete care for most health issues',
    price: 'KSh 400',
    period: 'per month',
    features: [
      'Everything in Accident Only',
      'Illness coverage up to KSh 300,000',
      'Prescription medications'
    ],
    popular: true,
    icon: '🏥'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    description: 'Complete protection including wellness',
    price: 'KSh 600',
    period: 'per month',
    features: [
      'Everything in Essential',
      'Coverage up to KSh 500,000',
      'Routine checkups & vaccinations'
    ],
    popular: false,
    icon: '👑'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onStartPurchase, onViewPlanDetails, onGetQuote, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200 sticky top-0 z-50" role="banner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-pet" aria-label="PetGuard Logo">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gradient">PetGuard</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Protecting your furry family</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <a href="#plans" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Plans</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</a>
              <button
                onClick={onLogin}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center space-x-2"
                aria-label="Login to admin dashboard"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button
                onClick={onGetQuote}
                className="btn-primary flex items-center space-x-2"
                aria-label="Get free quote"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-orange-200 py-4" role="navigation" aria-label="Mobile navigation">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <a href="#plans" className="block text-gray-700 hover:text-orange-600 transition-colors font-medium">Plans</a>
              <a href="#about" className="block text-gray-700 hover:text-orange-600 transition-colors font-medium">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</a>
              <button
                onClick={onLogin}
                className="w-full text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center justify-center space-x-2 py-2"
                aria-label="Login to admin dashboard"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button
                onClick={onGetQuote}
                className="w-full btn-primary flex items-center justify-center space-x-2"
                aria-label="Get free quote"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" role="banner" aria-labelledby="hero-heading">
        <div className="absolute inset-0 paw-print opacity-5" aria-hidden="true"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <div className="mb-6" aria-hidden="true">
              <span className="inline-block text-6xl sm:text-8xl mb-4">🐕🐱</span>
            </div>
            <h1 id="hero-heading" className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Protect Your <span className="text-gradient">Furry Family</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Give your beloved pets the care they deserve with comprehensive insurance coverage. 
              From routine checkups to emergency care, we've got your pets covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetQuote}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                aria-label="Get free quote for your pet"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={scrollToPlans}
                className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                aria-label="View our pet insurance plans"
              >
                <Shield className="h-5 w-5" />
                <span>View Plans</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" role="region" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">PetGuard</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand that pets are family. That's why we provide comprehensive coverage 
              with the care and attention your pets deserve.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="card-pet p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-pet" aria-hidden="true">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                From accidents to illnesses, we cover all the essential care your pets need 
                to stay healthy and happy.
              </p>
            </article>
            
            <article className="card-pet p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-pet" aria-hidden="true">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is available round the clock to help you and your pets 
                whenever you need assistance.
              </p>
            </article>
            
            <article className="card-pet p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-pet" aria-hidden="true">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trusted by Thousands</h3>
              <p className="text-gray-600">
                Join thousands of pet parents who trust PetGuard to protect their beloved 
                furry family members.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 bg-gradient-pet" role="region" aria-labelledby="plans-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 id="plans-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-gradient">Perfect Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer flexible plans designed to meet the unique needs of your pets. 
              Find the perfect coverage for your furry family.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <article key={plan.id} className={`card-pet p-8 relative ${plan.popular ? 'ring-2 ring-orange-400 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-pet">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4" aria-hidden="true">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8" role="list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3" role="listitem">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <button
                    onClick={() => onViewPlanDetails(plan.id)}
                    className="w-full btn-secondary"
                    aria-label={`View details for ${plan.name} plan`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={onStartPurchase}
                    className="w-full btn-primary"
                    aria-label={`Get started with ${plan.name} plan`}
                  >
                    Get Started
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white" role="region" aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                About <span className="text-gradient">PetGuard</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                PetGuard was founded with a simple mission: to ensure that every pet receives 
                the care they deserve. We understand that pets are more than just animals - 
                they're family members who bring joy, love, and companionship to our lives.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive insurance plans are designed to provide peace of mind, 
                knowing that your beloved pets will receive the best possible care when 
                they need it most.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">10K+</div>
                  <div className="text-gray-600">Happy Pets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-8 shadow-pet">
                <div className="text-center">
                  <div className="text-6xl mb-4" aria-hidden="true">🏥🐾</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Veterinary Network</h3>
                  <p className="text-gray-600">
                    We partner with the best veterinary clinics across Kenya to ensure 
                    your pets receive top-quality care whenever they need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-pet" role="region" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our pet insurance plans? Our friendly team is here to help!
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="card-pet p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">1-800-PET-GUARD</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </article>
            
            <article className="card-pet p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">hello@petguard.co.ke</p>
              <p className="text-sm text-gray-500">We'll respond within 2 hours</p>
            </article>
            
            <article className="card-pet p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Nairobi, Kenya</p>
              <p className="text-sm text-gray-500">By appointment only</p>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center" aria-label="PetGuard Logo">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PetGuard</span>
              </div>
              <p className="text-gray-400">
                Protecting your furry family with love and care since 2020.
              </p>
            </div>
            
            <nav aria-labelledby="footer-products">
              <h3 id="footer-products" className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400" role="list">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Pet Insurance</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Wellness Plans</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Emergency Care</a></li>
              </ul>
            </nav>
            
            <nav aria-labelledby="footer-support">
              <h3 id="footer-support" className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400" role="list">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Claims</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
              </ul>
            </nav>
            
            <nav aria-labelledby="footer-company">
              <h3 id="footer-company" className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400" role="list">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetGuard. All rights reserved. Made with ❤️ for pets everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;