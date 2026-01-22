import { useState, useEffect } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || isDismissed) {
    return null;
  }

  const getInstructions = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return {
        browser: 'Safari (iOS)',
        steps: [
          'Tap the "aA" icon in the address bar',
          'Select "Request Desktop Website"',
          'The page will reload in desktop mode'
        ]
      };
    } else if (/android/i.test(userAgent)) {
      if (/chrome/i.test(userAgent)) {
        return {
          browser: 'Chrome (Android)',
          steps: [
            'Tap the three dots (⋮) in the top-right corner',
            'Check the box for "Desktop site"',
            'The page will reload in desktop mode'
          ]
        };
      } else if (/firefox/i.test(userAgent)) {
        return {
          browser: 'Firefox (Android)',
          steps: [
            'Tap the three dots (⋮) menu',
            'Check "Desktop site"',
            'The page will reload in desktop mode'
          ]
        };
      }
      return {
        browser: 'Android Browser',
        steps: [
          'Open your browser menu',
          'Look for "Desktop site" or "Request desktop site"',
          'Enable it to view the full desktop version'
        ]
      };
    }
    
    return {
      browser: 'Your Browser',
      steps: [
        'Open your browser menu or settings',
        'Look for "Desktop site" or "Request desktop site" option',
        'Enable it to view the full desktop experience'
      ]
    };
  };

  const instructions = getInstructions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-strong rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Desktop Mode Recommended
        </h2>
        
        {/* Description */}
        <p className="text-center text-slate-300 mb-6">
          For the best experience, please enable Desktop Site mode in {instructions.browser}
        </p>

        {/* Instructions */}
        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Enable:
          </h3>
          <ol className="space-y-2 text-sm text-slate-300">
            {instructions.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setIsDismissed(true)}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I understand, continue anyway
          </button>
          <button
            onClick={() => {
              // Store in session storage so it doesn't show again this session
              sessionStorage.setItem('mobileWarningDismissed', 'true');
              setIsDismissed(true);
            }}
            className="w-full px-4 py-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            Don't show this again (this session)
          </button>
        </div>

        {/* Additional info */}
        <p className="text-xs text-slate-500 text-center mt-4">
          This app is optimized for desktop viewing. Some features may not work properly on mobile.
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
