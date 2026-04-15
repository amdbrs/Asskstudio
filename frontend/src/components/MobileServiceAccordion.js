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
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-1 h-8" 
          style={{ backgroundColor: color }}
        />
        <h3 className="font-anton text-2xl text-[#0047FF]">{title}</h3>
      </div>

      {/* Accordion Services */}
      <div className="space-y-2">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          const isExpanded = expandedIndex === index;
          
          return (
            <div 
              key={index}
              className={`border-2 transition-all duration-300 ${
                isExpanded 
                  ? 'border-[#0047FF] bg-[#0047FF]/5' 
                  : 'border-[#0047FF]/10 bg-white'
              }`}
            >
              {/* Header - Always visible */}
              <button
                onClick={() => toggleService(index)}
                className="w-full flex items-center justify-between p-4 touch-feedback"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                    isExpanded ? 'bg-[#0047FF]' : 'bg-[#0047FF]/10'
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                      isExpanded ? 'text-white' : 'text-[#0047FF]'
                    }`} />
                  </div>
                  <span className="font-anton text-[#0047FF] text-lg">{service.name}</span>
                </div>
                <div className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-300 ${
                  isExpanded 
                    ? 'border-[#0047FF] bg-[#0047FF] rotate-180' 
                    : 'border-[#0047FF]/20'
                }`}>
                  {isExpanded ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#0047FF]" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-4">
                  <p className="font-futura text-gray-600 text-sm pl-[52px]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Link */}
      <Link 
        to={linkTo} 
        className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] mt-4 touch-feedback"
      >
        En savoir plus 
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default MobileServiceAccordion;
