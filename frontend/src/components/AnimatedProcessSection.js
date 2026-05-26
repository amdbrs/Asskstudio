export const AnimatedProcessSection = ({ steps }) => {
  return (
    <section 
      id="process" 
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden" 
      aria-labelledby="process-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
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
          <div 
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              paddingLeft: 'calc(50% - 140px)',
              paddingRight: 'calc(50% - 140px)',
              touchAction: 'pan-x'
            }}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <article 
                  key={index} 
                  className="relative flex-shrink-0 w-[280px] h-[180px] snap-center"
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[calc(100%-8px)] w-8 h-0.5 bg-[#0047FF]/20 z-0" />
                  )}
                  
                  <div className="relative p-5 bg-white border-2 border-[#0047FF]/20 h-full flex flex-col active:scale-[0.98]">
                    {/* Step number */}
                    <div className="absolute -top-3 left-5 px-2 bg-white">
                      <span className="font-anton text-sm text-[#0047FF]/40">{step.step}</span>
                    </div>
                    
                    <div className="flex items-start gap-4 mt-2 flex-1">
                      <div className="w-14 h-14 bg-[#0047FF] flex items-center justify-center flex-shrink-0">
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
          {/* Horizontal timeline line */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-[#0047FF]" />
          
          {/* Steps container */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <div key={index} className="relative">
                  {/* Circle on timeline */}
                  <div className="flex justify-center mb-6">
                    <div className="w-8 h-8 rounded-full z-10 shadow-lg flex items-center justify-center bg-[#0047FF]">
                      <span className="font-anton text-sm text-white">{step.step}</span>
                    </div>
                  </div>
                  
                  {/* Content card - fixed height */}
                  <article className="group relative p-6 bg-white border-2 border-[#0047FF] h-[280px] flex flex-col">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-5 flex items-center justify-center mx-auto bg-[#0047FF]">
                      <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-anton text-xl text-center mb-3 text-[#0047FF]">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-futura text-gray-600 text-sm text-center leading-relaxed flex-1">
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
