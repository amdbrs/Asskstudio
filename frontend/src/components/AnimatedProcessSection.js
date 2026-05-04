import { useRef, useEffect, useState } from 'react';

export const AnimatedProcessSection = ({ steps }) => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      
      // Start animation when section enters viewport
      const startOffset = windowHeight * 0.8;
      const endOffset = -sectionHeight * 0.3;
      
      const scrollProgress = (startOffset - rect.top) / (startOffset - endOffset);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      setProgress(clampedProgress);
      
      // Calculate active step based on progress
      const stepProgress = clampedProgress * steps.length;
      setActiveStep(Math.min(Math.floor(stepProgress), steps.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  // Calculate timeline fill height
  const timelineFill = Math.min(progress * 120, 100);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden" 
      aria-labelledby="process-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div 
          className="absolute top-1/4 left-0 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `scale(${0.8 + progress * 0.4})` }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `scale(${0.8 + progress * 0.4})` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header 
          className="text-center mb-12 sm:mb-16 lg:mb-24 transition-all duration-700"
          style={{ 
            opacity: Math.min(1, progress * 3),
            transform: `translateY(${Math.max(0, 30 - progress * 90)}px)`
          }}
        >
          <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Notre Processus
          </p>
          <h2 id="process-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
            Comment on travaille
          </h2>
          <p className="font-futura text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Un processus simple et transparent pour des résultats qui dépassent tes attentes
          </p>
        </header>

        {/* Mobile/Tablet view - Horizontal Timeline */}
        <div className="lg:hidden overflow-hidden">
          {/* Horizontal scroll container */}
          <div 
            className="flex gap-4 overflow-x-auto pb-6 px-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const stepProgress = Math.max(0, Math.min(1, (progress * steps.length) - index + 0.5));
              
              return (
                <article 
                  key={index} 
                  className="relative flex-shrink-0 w-[280px] transition-all duration-700 ease-out"
                  style={{
                    opacity: stepProgress,
                    transform: `translateY(${(1 - stepProgress) * 20}px)`,
                    scrollSnapAlign: 'center'
                  }}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(100%-8px)] w-8 h-0.5 bg-[#0047FF]/20 z-0" />
                  )}
                  
                  <div className="relative p-5 bg-white border-2 border-[#0047FF]/20 h-full">
                    {/* Step number */}
                    <div className="absolute -top-3 left-5 px-2 bg-white">
                      <span className="font-anton text-sm text-[#0047FF]/40">{step.step}</span>
                    </div>
                    
                    <div className="flex items-start gap-4 mt-2">
                      <div 
                        className="w-14 h-14 bg-[#0047FF] flex items-center justify-center flex-shrink-0"
                        style={{ transform: `scale(${0.9 + stepProgress * 0.1})` }}
                      >
                        <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-anton text-lg text-[#0047FF] mb-1">{step.title}</h3>
                        <p className="font-futura text-gray-600 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          
          {/* Scroll hint */}
          <p className="text-center text-xs text-gray-400 font-futura mt-2">
            Glissez pour voir les étapes
          </p>
        </div>

        {/* Desktop view - Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Horizontal timeline line - background */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-[#0047FF]/10" />
          
          {/* Horizontal timeline line - fill */}
          <div 
            className="absolute top-[60px] left-0 h-1 bg-gradient-to-r from-[#0047FF] to-[#0047FF]/80 transition-all duration-500 ease-out"
            style={{ width: `${timelineFill}%` }}
          />
          
          {/* Steps container */}
          <div className="flex justify-between gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              // Calculate individual step progress (0 to 1)
              const stepStart = index / steps.length;
              const stepEnd = (index + 1) / steps.length;
              const stepProgress = Math.max(0, Math.min(1, (progress - stepStart) / (stepEnd - stepStart) * 1.5));
              
              const isActive = index <= activeStep;
              const isCurrentlyAnimating = index === activeStep;
              
              return (
                <div 
                  key={index} 
                  className="flex-1 relative"
                  style={{
                    opacity: stepProgress,
                    transform: `translateY(${(1 - stepProgress) * 30}px)`
                  }}
                >
                  {/* Circle on timeline */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className={`w-8 h-8 rounded-full z-10 shadow-lg transition-all duration-500 flex items-center justify-center ${
                        isActive 
                          ? 'bg-[#0047FF] scale-110' 
                          : 'bg-white border-4 border-[#0047FF]/20'
                      }`}
                    >
                      <span className={`font-anton text-sm ${isActive ? 'text-white' : 'text-[#0047FF]/40'}`}>
                        {step.step}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <article 
                    className={`group relative p-6 bg-white border-2 transition-all duration-500 hover:-translate-y-2 ${
                      isActive 
                        ? 'border-[#0047FF] shadow-[0_20px_50px_-15px_rgba(0,71,255,0.25)]' 
                        : 'border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_50px_-15px_rgba(0,71,255,0.2)]'
                    }`}
                  >
                    {/* Icon */}
                    <div 
                      className={`w-16 h-16 mb-5 flex items-center justify-center mx-auto transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#0047FF] to-[#0033CC]' 
                          : 'bg-[#0047FF]/20'
                      }`}
                      style={{ 
                        transform: `scale(${0.9 + stepProgress * 0.1}) ${isCurrentlyAnimating ? 'rotate(3deg)' : 'rotate(0deg)'}`,
                      }}
                    >
                      <IconComponent className={`w-8 h-8 ${isActive ? 'text-white' : 'text-[#0047FF]'}`} aria-hidden="true" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`font-anton text-xl text-center mb-3 transition-colors duration-500 ${
                      isActive ? 'text-[#0047FF]' : 'text-[#0047FF]/60'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-futura text-gray-600 text-sm text-center leading-relaxed">
                      {step.desc}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedProcessSection;
