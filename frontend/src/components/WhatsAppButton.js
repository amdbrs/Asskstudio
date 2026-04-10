import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const phoneNumber = '33665097008';
  const message = encodeURIComponent('Bonjour ! Je suis intéressé par vos services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactez-nous sur WhatsApp"
      data-testid="whatsapp-button"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Discutons sur WhatsApp !
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900 dark:border-l-white" />
          </div>
        </div>
      </div>
    </a>
  );
};
