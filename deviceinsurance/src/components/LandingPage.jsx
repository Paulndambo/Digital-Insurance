import React from 'react';
import { Shield, Zap, Clock, Star, Users, Award, TrendingUp, DollarSign, ChevronRight, Check, Lock, FileText, Smartphone, BadgeCheck, PhoneCall, MessageCircle, CheckCircle2 } from 'lucide-react';
import { devices } from '../constants/devices';
import { formatCurrency } from '../constants/currency';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div>
      {/* Hero Section - Enhanced with trust elements */}
      <div className="relative overflow-hidden">
        {/* Background with improved gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-slate-900 to-secondary-900/20"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
        
        {/* Animated gradient orbs for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-28">
          <div className="text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 glass px-3 sm:px-5 py-2 sm:py-2.5 rounded-full mb-4 sm:mb-6 animate-slide-down text-xs sm:text-sm">
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-security-400 flex-shrink-0" />
              <span className="font-semibold">Trusted by 500,000+ customers across Kenya</span>
              <div className="hidden sm:flex -space-x-1 ml-2">
                <div className="w-6 h-6 rounded-full bg-primary-500 border-2 border-slate-900"></div>
                <div className="w-6 h-6 rounded-full bg-secondary-500 border-2 border-slate-900"></div>
                <div className="w-6 h-6 rounded-full bg-accent-500 border-2 border-slate-900"></div>
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-slide-up px-2">
              <span className="gradient-text">Protect What Matters</span>
              <br />
              <span className="text-white">with DigiInsure</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto animate-slide-up leading-relaxed px-2" style={{ animationDelay: '0.1s' }}>
              Comprehensive device insurance designed for peace of mind. 
              <span className="text-primary-400 font-semibold"> Fair pricing</span>, instant coverage, and 24/7 support.
            </p>
            
            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-1.5 sm:gap-2 glass px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-white/15 transition-all text-xs sm:text-sm">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">Instant Activation</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 glass px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-white/15 transition-all text-xs sm:text-sm">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-security-400 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">24/7 Support</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 glass px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-white/15 transition-all text-xs sm:text-sm">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">4.9/5 Rating</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8 animate-scale-in px-4" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={onGetStarted}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full font-bold text-base sm:text-lg hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Get Protected Now
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 glass-strong rounded-full font-semibold text-base sm:text-lg hover:bg-white/30 transition-all w-full sm:w-auto">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                Talk to an Expert
              </button>
            </div>
            
            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400 animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-security-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Secure & Licensed</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400 flex-shrink-0" />
                <span className="whitespace-nowrap">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Fast Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Enhanced design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="group relative overflow-hidden card-hover text-center p-4 sm:p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-primary-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 gradient-text">500K+</div>
            <div className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">Protected Devices</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-4 sm:p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-secondary-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 gradient-text">98%</div>
            <div className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">Customer Satisfaction</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-4 sm:p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-accent-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 gradient-text">24hrs</div>
            <div className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">Average Claim Time</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-4 sm:p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-warning-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-warning-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 gradient-text">KES 2B+</div>
            <div className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">Claims Processed</div>
          </div>
        </div>
      </div>

      {/* Devices Preview - Improved layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Protect Any Device</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            From smartphones to gaming consoles - comprehensive coverage for all your valuable devices
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="group relative overflow-hidden card-hover p-4 sm:p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-3 md:mb-4 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${device.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center">{device.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">Full Coverage</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works - Enhanced with better visuals */}
      <div className="relative py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
              <span className="gradient-text">Get Protected in Minutes</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Simple, transparent process with no complicated paperwork
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 md:gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 opacity-30" style={{ top: '4rem' }}></div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg z-20">1</div>
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Choose Device</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 px-2">Select the device type you want to protect from our wide range</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white text-secondary-600 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg z-20">2</div>
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Enter Details</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 px-2">Provide device information and personal details securely</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-600 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white text-accent-600 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg z-20">3</div>
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Get Fair Quote</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 px-2">Transparent pricing at 1% of your device value per month</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-warning-600 to-warning-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white text-warning-600 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg z-20">4</div>
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">You're Protected</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 px-2">Instant coverage activation after secure payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Enhanced value presentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="relative overflow-hidden glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-primary-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/10 to-accent-600/20"></div>
          <div className="relative">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500/20 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
                <span className="font-semibold text-primary-300">Transparent Pricing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
                <span className="gradient-text">Fair, Simple Pricing</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 px-2">
                Pay only <strong className="text-primary-400">1% of your device's value</strong> per month. No hidden fees, no surprises.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform border-2 border-primary-500/40 bg-slate-800/60 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-xs sm:text-sm text-primary-300 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">Entry Level</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{formatCurrency(20000)}</div>
                  <div className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4 sm:mb-6"></div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{formatCurrency(200)}/month</div>
                  <div className="text-xs text-slate-300">Minimum premium</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-secondary-500/60 hover:scale-105 transition-transform shadow-glow bg-slate-800/80 backdrop-blur-xl">
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 bg-gradient-to-r from-secondary-600 to-secondary-500 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-xs sm:text-sm text-secondary-300 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">Mid Range</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{formatCurrency(100000)}</div>
                  <div className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4 sm:mb-6"></div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{formatCurrency(1000)}/month</div>
                  <div className="text-xs text-slate-300">1.5% of device value</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform border-2 border-accent-500/40 bg-slate-800/60 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-xs sm:text-sm text-accent-300 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">Premium</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{formatCurrency(200000)}</div>
                  <div className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4 sm:mb-6"></div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{formatCurrency(2000)}/month</div>
                  <div className="text-xs text-slate-300">Premium protection</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs sm:text-sm md:text-base text-slate-400 mb-4 sm:mb-6 px-2">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 inline text-security-400 mr-1 sm:mr-2" />
                No hidden fees • No complicated tiers • Just fair pricing based on your device's value
              </p>
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full font-bold text-sm sm:text-base hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
              >
                Calculate Your Premium
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Enhanced with trust elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Why Choose DigiInsure?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Comprehensive protection backed by industry-leading service and support
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Instant Activation</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">Your coverage starts immediately after payment - no waiting periods, no delays. Protect your device right now.</p>
          </div>
          
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Comprehensive Coverage</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">Protection against accidental damage, theft, loss, liquid damage, and mechanical breakdown. Complete peace of mind.</p>
          </div>
          
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent-600 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Fast Claims Process</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">File claims 24/7 online and get replacements in as little as 24 hours. Quick, hassle-free service when you need it.</p>
          </div>
          
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-warning-600 to-warning-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Fair Pricing</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">Premium calculated based on device value - you only pay for what you protect. Transparent, no hidden fees.</p>
          </div>
          
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">24/7 Support</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">Expert support team available round the clock to assist you. Get help whenever you need it via phone, email, or chat.</p>
          </div>
          
          <div className="group card-hover p-5 sm:p-6 md:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-600 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <BadgeCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Licensed & Trusted</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">Fully licensed insurance provider with industry certifications. Your protection is backed by a trusted institution.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/10 via-transparent to-secondary-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
              <span className="gradient-text">Loved by Customers</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              See what our protected customers have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                "My phone was stolen and DigiInsure processed my claim in just 24 hours. Amazing service and zero hassle!"
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-base sm:text-lg font-bold flex-shrink-0">
                  JM
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">John Mwangi</div>
                  <div className="text-xs sm:text-sm text-slate-400">Nairobi, Kenya</div>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-secondary-500/30">
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                "Best insurance decision I've made. The pricing is fair and transparent. I know exactly what I'm paying for."
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-base sm:text-lg font-bold flex-shrink-0">
                  SA
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Sarah Achieng</div>
                  <div className="text-xs sm:text-sm text-slate-400">Kisumu, Kenya</div>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                "Protected all my family's devices with DigiInsure. The customer service team is incredibly helpful and responsive."
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent-500 to-warning-500 flex items-center justify-center text-base sm:text-lg font-bold flex-shrink-0">
                  DK
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">David Kamau</div>
                  <div className="text-xs sm:text-sm text-slate-400">Mombasa, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="relative overflow-hidden glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center border-2 border-primary-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/20 to-accent-600/20"></div>
          <div className="relative">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary-400 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
              <span className="gradient-text">Ready to Protect Your Device?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
              Join 500,000+ satisfied customers who trust DigiInsure for comprehensive device protection
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <button 
                onClick={onGetStarted}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full font-bold text-base sm:text-lg hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-4 sm:py-5 glass-strong rounded-full font-semibold text-base sm:text-lg hover:bg-white/30 transition-all border border-white/20 w-full sm:w-auto">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                0745491093
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-security-400 flex-shrink-0" />
                <span className="text-slate-400 whitespace-nowrap">Licensed Provider</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-security-400 flex-shrink-0" />
                <span className="text-slate-400 whitespace-nowrap">Secure Payments</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-security-400 flex-shrink-0" />
                <span className="text-slate-400 whitespace-nowrap">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="relative py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-900/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                  <span className="gradient-text">Get in Touch</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-400">
                  Have questions? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Call Us</h3>
                    <p className="text-slate-400 text-sm sm:text-base">0745491093</p>
                    <p className="text-slate-500 text-xs sm:text-sm">Mon-Fri 8AM - 6PM EAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Email Us</h3>
                    <p className="text-slate-400 text-sm sm:text-base">support@digiinsure.co.ke</p>
                    <p className="text-slate-500 text-xs sm:text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Business Hours</h3>
                    <p className="text-slate-400 text-sm sm:text-base">Monday - Friday: 8AM - 6PM</p>
                    <p className="text-slate-400 text-sm sm:text-base">Saturday: 9AM - 2PM</p>
                    <p className="text-slate-500 text-xs sm:text-sm">Claims available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-security-400" />
                  Your information is secure and will never be shared with third parties
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10">
              <form className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name <span className="text-accent-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address <span className="text-accent-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="0712345678"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject <span className="text-accent-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Get a Quote</option>
                    <option value="claim">Claim Support</option>
                    <option value="policy">Policy Information</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message <span className="text-accent-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl font-bold text-base sm:text-lg hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-slate-500">
                  By submitting this form, you agree to our privacy policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
