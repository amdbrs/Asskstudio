import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { QuoteForm } from '@/components/QuoteForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="contact-page">
      <SEO 
        title="Contact | ASSK Studio - Demande de Devis"
        description="Contactez ASSK Studio pour vos projets de graphisme, création de sites web et modélisation 3D en Auvergne. Devis gratuit sous 24h."
      />
      
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">
              Contact
            </p>
            <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0047FF] leading-tight mb-3 sm:mb-4">
              Discutons de<br className="sm:hidden" /> votre projet
            </h1>
            <p className="font-futura text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
              Une idée en tête ? Contactez-nous et transformons votre vision en réalité.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Contact Info - Mobile: After form on smaller screens */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 space-y-4 sm:space-y-6">
                <h2 className="font-anton text-xl sm:text-2xl text-[#0047FF] mb-4 sm:mb-6">
                  Coordonnées
                </h2>
                
                {/* Contact Cards */}
                <a 
                  href="mailto:amaurydebarros1607@gmail.com" 
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:bg-[#0047FF]/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider">Email</p>
                    <p className="font-anton text-[#0047FF] text-sm sm:text-base truncate">amaurydebarros1607@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+33665097008" 
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:bg-[#0047FF]/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider">Téléphone</p>
                    <p className="font-anton text-[#0047FF] text-sm sm:text-base">06 65 09 70 08</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/amau.psd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:bg-[#0047FF]/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider">Instagram</p>
                    <p className="font-anton text-[#0047FF] text-sm sm:text-base">@amau.psd</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-[#0047FF]/10 bg-[#0047FF]/5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF]" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider">Localisation</p>
                    <p className="font-futura text-[#0047FF]/70 text-xs sm:text-sm">Clermont-Ferrand, Vichy, Moulins</p>
                    <p className="font-futura text-[#0047FF]/50 text-xs">Auvergne, France</p>
                  </div>
                </div>

                {/* Réponse rapide badge */}
                <div className="mt-6 p-4 bg-[#0047FF] text-white text-center">
                  <p className="font-anton text-sm sm:text-base">Réponse sous 24h</p>
                  <p className="font-futura text-white/70 text-xs sm:text-sm">Du lundi au vendredi</p>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="bg-white border-2 border-[#0047FF]/10 p-4 sm:p-8 lg:p-10">
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-anton text-xl sm:text-2xl lg:text-3xl text-[#0047FF]">Demande de devis</h2>
                  <p className="font-futura text-gray-600 text-xs sm:text-sm mt-1">
                    Remplissez ce formulaire pour recevoir votre devis personnalisé
                  </p>
                </div>
                
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
