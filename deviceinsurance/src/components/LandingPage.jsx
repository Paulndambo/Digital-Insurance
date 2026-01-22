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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-6 animate-slide-down">
              <BadgeCheck className="w-5 h-5 text-security-400" />
              <span className="text-sm font-semibold">Trusted by 500,000+ customers across Kenya</span>
              <div className="flex -space-x-1 ml-2">
                <div className="w-6 h-6 rounded-full bg-primary-500 border-2 border-slate-900"></div>
                <div className="w-6 h-6 rounded-full bg-secondary-500 border-2 border-slate-900"></div>
                <div className="w-6 h-6 rounded-full bg-accent-500 border-2 border-slate-900"></div>
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Protect What Matters</span>
              <br />
              <span className="text-white">with DigiInsure</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Comprehensive device insurance designed for peace of mind. 
              <span className="text-primary-400 font-semibold"> Fair pricing</span>, instant coverage, and 24/7 support.
            </p>
            
            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 glass px-4 py-3 rounded-xl hover:bg-white/15 transition-all">
                <Zap className="w-5 h-5 text-warning-400" />
                <span className="font-medium">Instant Activation</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-3 rounded-xl hover:bg-white/15 transition-all">
                <Clock className="w-5 h-5 text-security-400" />
                <span className="font-medium">24/7 Claims Support</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-3 rounded-xl hover:bg-white/15 transition-all">
                <Star className="w-5 h-5 text-accent-400" />
                <span className="font-medium">4.9/5 Customer Rating</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={onGetStarted}
                className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full font-bold text-lg hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
              >
                Get Protected Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-10 py-5 glass-strong rounded-full font-semibold text-lg hover:bg-white/30 transition-all">
                <PhoneCall className="w-5 h-5" />
                Talk to an Expert
              </button>
            </div>
            
            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-security-400" />
                <span>Secure & Licensed</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-primary-400" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-secondary-400" />
                <span>Fast Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Enhanced design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="group relative overflow-hidden card-hover text-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Users className="w-14 h-14 text-primary-400 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2 gradient-text">500K+</div>
            <div className="text-slate-400 font-medium">Protected Devices</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Award className="w-14 h-14 text-secondary-400 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2 gradient-text">98%</div>
            <div className="text-slate-400 font-medium">Customer Satisfaction</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <TrendingUp className="w-14 h-14 text-accent-400 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2 gradient-text">24hrs</div>
            <div className="text-slate-400 font-medium">Average Claim Time</div>
          </div>
          <div className="group relative overflow-hidden card-hover text-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-warning-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Shield className="w-14 h-14 text-warning-400 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2 gradient-text">KES 2B+</div>
            <div className="text-slate-400 font-medium">Claims Processed</div>
          </div>
        </div>
      </div>

      {/* Devices Preview - Improved layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Protect Any Device</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From smartphones to gaming consoles - comprehensive coverage for all your valuable devices
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="group relative overflow-hidden card-hover p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center">
                  <div className={`w-20 h-20 mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br ${device.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center">{device.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">Full Coverage</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works - Enhanced with better visuals */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get Protected in Minutes</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, transparent process with no complicated paperwork
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 opacity-30" style={{ top: '4rem' }}></div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">1</div>
              </div>
              <h3 className="font-bold text-xl mb-3">Choose Device</h3>
              <p className="text-slate-400">Select the device type you want to protect from our wide range</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-secondary-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">2</div>
              </div>
              <h3 className="font-bold text-xl mb-3">Enter Details</h3>
              <p className="text-slate-400">Provide device information and personal details securely</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-600 to-accent-500 rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-accent-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">3</div>
              </div>
              <h3 className="font-bold text-xl mb-3">Get Fair Quote</h3>
              <p className="text-slate-400">Transparent pricing at 1% of your device value per month</p>
            </div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-warning-600 to-warning-500 rounded-2xl flex items-center justify-center mx-auto shadow-glow relative z-10">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-warning-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">4</div>
              </div>
              <h3 className="font-bold text-xl mb-3">You're Protected</h3>
              <p className="text-slate-400">Instant coverage activation after secure payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Enhanced value presentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden glass-strong rounded-3xl p-8 md:p-12 border-2 border-primary-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/10 to-accent-600/20"></div>
          <div className="relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 rounded-full mb-4">
                <DollarSign className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-semibold text-primary-300">Transparent Pricing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Fair, Simple Pricing</span>
              </h2>
              <p className="text-xl text-slate-300">
                Pay only <strong className="text-primary-400">1% of your device's value</strong> per month. No hidden fees, no surprises.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-transform border-2 border-primary-500/40 bg-slate-800/60 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-sm text-primary-300 font-semibold mb-2 uppercase tracking-wide">Entry Level</div>
                  <div className="text-4xl font-bold text-white mb-2">{formatCurrency(20000)}</div>
                  <div className="text-sm text-slate-300 mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(200)}/month</div>
                  <div className="text-xs text-slate-300">Minimum premium</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 border-2 border-secondary-500/60 hover:scale-105 transition-transform shadow-glow bg-slate-800/80 backdrop-blur-xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-secondary-600 to-secondary-500 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-sm text-secondary-300 font-semibold mb-2 uppercase tracking-wide">Mid Range</div>
                  <div className="text-4xl font-bold text-white mb-2">{formatCurrency(100000)}</div>
                  <div className="text-sm text-slate-300 mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(1000)}/month</div>
                  <div className="text-xs text-slate-300">1.5% of device value</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-transform border-2 border-accent-500/40 bg-slate-800/60 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/20 to-transparent"></div>
                <div className="relative">
                  <div className="text-sm text-accent-300 font-semibold mb-2 uppercase tracking-wide">Premium</div>
                  <div className="text-4xl font-bold text-white mb-2">{formatCurrency(200000)}</div>
                  <div className="text-sm text-slate-300 mb-6">Device Value</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(2000)}/month</div>
                  <div className="text-xs text-slate-300">Premium protection</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-slate-400 mb-6">
                <Check className="w-4 h-4 inline text-security-400 mr-2" />
                No hidden fees • No complicated tiers • Just fair pricing based on your device's value
              </p>
              <button 
                onClick={onGetStarted}
                className="btn-primary"
              >
                Calculate Your Premium
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Enhanced with trust elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Why Choose DigiInsure?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive protection backed by industry-leading service and support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Instant Activation</h3>
            <p className="text-slate-400 leading-relaxed">Your coverage starts immediately after payment - no waiting periods, no delays. Protect your device right now.</p>
          </div>
          
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Comprehensive Coverage</h3>
            <p className="text-slate-400 leading-relaxed">Protection against accidental damage, theft, loss, liquid damage, and mechanical breakdown. Complete peace of mind.</p>
          </div>
          
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-accent-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Fast Claims Process</h3>
            <p className="text-slate-400 leading-relaxed">File claims 24/7 online and get replacements in as little as 24 hours. Quick, hassle-free service when you need it.</p>
          </div>
          
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-warning-600 to-warning-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Fair Pricing</h3>
            <p className="text-slate-400 leading-relaxed">Premium calculated based on device value - you only pay for what you protect. Transparent, no hidden fees.</p>
          </div>
          
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">24/7 Support</h3>
            <p className="text-slate-400 leading-relaxed">Expert support team available round the clock to assist you. Get help whenever you need it via phone, email, or chat.</p>
          </div>
          
          <div className="group card-hover p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <BadgeCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Licensed & Trusted</h3>
            <p className="text-slate-400 leading-relaxed">Fully licensed insurance provider with industry certifications. Your protection is backed by a trusted institution.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/10 via-transparent to-secondary-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Loved by Customers</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See what our protected customers have to say
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "My phone was stolen and DigiInsure processed my claim in just 24 hours. Amazing service and zero hassle!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-lg font-bold">
                  JM
                </div>
                <div>
                  <div className="font-semibold">John Mwangi</div>
                  <div className="text-sm text-slate-400">Nairobi, Kenya</div>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-2xl p-8 border-2 border-secondary-500/30">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "Best insurance decision I've made. The pricing is fair and transparent. I know exactly what I'm paying for."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-lg font-bold">
                  SA
                </div>
                <div>
                  <div className="font-semibold">Sarah Achieng</div>
                  <div className="text-sm text-slate-400">Kisumu, Kenya</div>
                </div>
              </div>
            </div>
            
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "Protected all my family's devices with DigiInsure. The customer service team is incredibly helpful and responsive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-warning-500 flex items-center justify-center text-lg font-bold">
                  DK
                </div>
                <div>
                  <div className="font-semibold">David Kamau</div>
                  <div className="text-sm text-slate-400">Mombasa, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden glass-strong rounded-3xl p-12 text-center border-2 border-primary-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/20 to-accent-600/20"></div>
          <div className="relative">
            <Shield className="w-20 h-20 text-primary-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Ready to Protect Your Device?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join 500,000+ satisfied customers who trust DigiInsure for comprehensive device protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onGetStarted}
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full font-bold text-lg hover:from-primary-700 hover:to-primary-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-10 py-5 glass-strong rounded-full font-semibold text-lg hover:bg-white/30 transition-all border border-white/20">
                <PhoneCall className="w-5 h-5" />
                0745491093
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-security-400" />
                <span className="text-slate-400">Licensed Provider</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-security-400" />
                <span className="text-slate-400">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-security-400" />
                <span className="text-slate-400">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
