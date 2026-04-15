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

        {/* Mobile/Tablet view */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const stepProgress = Math.max(0, Math.min(1, (progress * steps.length) - index + 0.5));
            
            return (
              <article 
                key={index} 
                className="relative group transition-all duration-700 ease-out"
                style={{
                  opacity: stepProgress,
                  transform: `translateY(${(1 - stepProgress) * 40}px)`
                }}
              >
                <div className="p-6 sm:p-8 bg-[#0047FF]/5 border border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 bg-[#0047FF] flex items-center justify-center transition-transform duration-500"
                      style={{ transform: `scale(${0.8 + stepProgress * 0.2})` }}
                    >
                      <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <span className="font-anton text-4xl text-[#0047FF]/20">{step.step}</span>
                  </div>
                  <h3 className="font-anton text-xl text-[#0047FF] mb-2">{step.title}</h3>
                  <p className="font-futura text-gray-600 text-sm">{step.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop view - Animated Timeline */}
        <div className="hidden lg:block relative">
          {/* Central timeline line - background */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#0047FF]/10 -translate-x-1/2" />
          
          {/* Central timeline line - fill */}
          <div 
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-[#0047FF] to-[#0047FF]/80 -translate-x-1/2 transition-all duration-300 ease-out"
            style={{ height: `${timelineFill}%` }}
          />
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLeft = index % 2 === 0;
            
            // Calculate individual step progress (0 to 1)
            const stepStart = index / steps.length;
            const stepEnd = (index + 1) / steps.length;
            const stepProgress = Math.max(0, Math.min(1, (progress - stepStart) / (stepEnd - stepStart) * 1.5));
            
            const isActive = index <= activeStep;
            const isCurrentlyAnimating = index === activeStep;
            
            return (
              <div 
                key={index} 
                className={`relative flex items-center mb-20 last:mb-0 ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Content card */}
                <div 
                  className={`w-[calc(50%-60px)] transition-all duration-700 ease-out ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                  style={{
                    opacity: stepProgress,
                    transform: `translateX(${isLeft ? -1 : 1} * ${(1 - stepProgress) * 60}px) translateY(${(1 - stepProgress) * 20}px)`.replace('* ', '')
                  }}
                >
                  <article className={`group relative p-8 bg-white border-2 transition-all duration-500 transform hover:-translate-y-2 ${
                    isActive 
                      ? 'border-[#0047FF] shadow-[0_25px_80px_-20px_rgba(0,71,255,0.25)]' 
                      : 'border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_25px_80px_-20px_rgba(0,71,255,0.2)]'
                  }`}>
                    {/* Step number badge */}
                    <div 
                      className={`absolute top-8 ${isLeft ? '-right-4' : '-left-4'} w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-500 ${
                        isActive ? 'bg-[#0047FF] scale-110' : 'bg-[#0047FF]/50'
                      }`}
                    >
                      <span className="font-anton text-white text-sm">{step.step}</span>
                    </div>
                    
                    {/* Icon */}
                    <div 
                      className={`inline-flex items-center justify-center w-16 h-16 mb-6 transition-all duration-500 ${isLeft ? 'ml-auto' : 'mr-auto'} ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#0047FF] to-[#0047FF]/80 scale-110' 
                          : 'bg-gradient-to-br from-[#0047FF]/60 to-[#0047FF]/40'
                      }`}
                      style={{ 
                        transform: `scale(${0.9 + stepProgress * 0.2}) ${isCurrentlyAnimating ? 'rotate(5deg)' : 'rotate(0deg)'}`,
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`font-anton text-2xl mb-3 transition-colors duration-500 ${
                      isActive ? 'text-[#0047FF]' : 'text-[#0047FF]/60'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-futura text-gray-600 text-base leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Decorative corner - animated */}
                    <div 
                      className={`absolute bottom-0 ${isLeft ? 'left-0 border-l-4' : 'right-0 border-r-4'} w-16 h-16 border-b-4 transition-all duration-500`}
                      style={{
                        borderColor: isActive ? '#0047FF' : 'transparent',
                        width: `${stepProgress * 64}px`,
                        height: `${stepProgress * 64}px`
                      }}
                    />
                  </article>
                </div>

                {/* Center circle on timeline */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 shadow-lg transition-all duration-500 ${
                    isActive 
                      ? 'bg-white border-4 border-[#0047FF] scale-125' 
                      : 'bg-[#0047FF]/20 border-4 border-[#0047FF]/30'
                  }`}
                >
                  {isActive && (
                    <div 
                      className="absolute inset-1 bg-[#0047FF] rounded-full"
                      style={{
                        animation: isCurrentlyAnimating ? 'pulse 1.5s ease-in-out infinite' : 'none'
                      }}
                    />
                  )}
                </div>

                {/* Connector line to card - animated */}
                <div 
                  className={`absolute top-1/2 h-0.5 transition-all duration-500 ${isLeft ? 'left-[calc(50%+12px)]' : 'right-[calc(50%+12px)]'}`}
                  style={{ 
                    width: `${stepProgress * 48}px`,
                    backgroundColor: isActive ? 'rgba(0, 71, 255, 0.5)' : 'rgba(0, 71, 255, 0.2)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnimatedProcessSection;
