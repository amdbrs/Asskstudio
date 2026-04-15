import { useState, useEffect } from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const interval = 20;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Start exit animation
          setTimeout(() => setIsExiting(true), 300);
          // Complete after exit animation
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      {/* Logo container with animations */}
      <div className={`relative transition-all duration-1000 ${isExiting ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Pulsing ring behind logo */}
        <div 
          className="absolute inset-0 -m-8 rounded-full border-2 border-[#0047FF]/20 animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <div 
          className="absolute inset-0 -m-4 rounded-full border border-[#0047FF]/10 animate-pulse"
          style={{ animationDuration: '1.5s' }}
        />
        
        {/* Logo */}
        <div 
          className={`relative w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-700 ${
            progress < 100 ? 'animate-float' : ''
          }`}
          style={{ 
            animationDuration: '3s',
          }}
        >
          <img 
            src={LOGO_URL} 
            alt="ASSK Studio" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className={`mt-12 w-48 sm:w-64 transition-all duration-500 ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Progress track */}
        <div className="h-0.5 bg-[#0047FF]/10 overflow-hidden">
          <div 
            className="h-full bg-[#0047FF] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress text */}
        <div className="flex justify-between items-center mt-3">
          <span className="font-futura text-[#0047FF]/40 text-xs uppercase tracking-widest">
            Chargement
          </span>
          <span className="font-anton text-[#0047FF] text-sm">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p 
        className={`mt-8 font-futura text-[#0047FF]/60 text-xs sm:text-sm tracking-wider transition-all duration-500 ${
          isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: '100ms' }}
      >
        Studio Créatif • Graphisme • Web • 3D
      </p>
    </div>
  );
};

export default Preloader;
