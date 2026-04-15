import { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MobileServiceAccordion = ({ 
  title, 
  services, 
  linkTo, 
  color = '#0047FF' 
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleService = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="sm:hidden">
      {/* Section Title - More compact */}
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-1 h-6" 
          style={{ backgroundColor: color }}
        />
        <h3 className="font-anton text-xl text-[#0047FF]">{title}</h3>
      </div>

      {/* Accordion Services - Tighter spacing */}
      <div className="space-y-1.5">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          const isExpanded = expandedIndex === index;
          
          return (
            <div 
              key={index}
              className={`border transition-all duration-300 ${
                isExpanded 
                  ? 'border-[#0047FF] bg-[#0047FF]/5' 
                  : 'border-[#0047FF]/10 bg-white'
              }`}
            >
              {/* Header - Compact */}
              <button
                onClick={() => toggleService(index)}
                className="w-full flex items-center justify-between p-3 touch-feedback"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                    isExpanded ? 'bg-[#0047FF]' : 'bg-[#0047FF]/10'
                  }`}>
                    <IconComponent className={`w-4 h-4 transition-colors duration-300 ${
                      isExpanded ? 'text-white' : 'text-[#0047FF]'
                    }`} />
                  </div>
                  <span className="font-anton text-[#0047FF] text-base">{service.name}</span>
                </div>
                <div className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-[#0047FF] rotate-0' 
                    : 'bg-transparent'
                }`}>
                  {isExpanded ? (
                    <Minus className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-[#0047FF]" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-3 pb-3">
                  <p className="font-futura text-gray-600 text-xs pl-[42px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Link - Compact */}
      <Link 
        to={linkTo} 
        className="inline-flex items-center gap-1.5 font-futura text-xs text-[#0047FF] mt-3 touch-feedback"
      >
        En savoir plus 
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

export default MobileServiceAccordion;
