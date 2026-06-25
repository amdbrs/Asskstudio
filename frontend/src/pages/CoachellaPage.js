import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, Sparkles, Music, Ticket, Shirt } from 'lucide-react';

const COACHELLA_IMAGES = [
  {
    id: '1',
    title: 'T-shirt Coachella',
    description: 'Design recto/verso avec soleil et TV rétro',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/agi6m675_tshirt-coachella.png',
    icon: Shirt
  },
  {
    id: '2',
    title: 'Cartes d\'invitation',
    description: 'QR code personnalisé pour les invités',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/501jn97f_7a427e9e-28f2-4634-bbc9-c5b47ca5cc35_rw_1920.jpg',
    icon: Ticket
  },
  {
    id: '3',
    title: 'Stickers',
    description: 'Illustrations festives et colorées',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/7ezep602_85cbe771-e46e-47e6-8a88-9894433d980a_rw_1920.jpg',
    icon: Sparkles
  },
  {
    id: '4',
    title: 'Passes d\'entrée',
    description: 'Badges officiels de la soirée',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/jmj8ndle_df1868bd-ca2b-48bb-b4e5-5deed18a5748_rw_1920.jpg',
    icon: Music
  }
];

export default function CoachellaPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="coachella-page">
      <SEO 
        title="Coachella 2K24 - Soirée à thème | ASSK Studio"
        description="Direction artistique complète pour une soirée à thème Coachella : t-shirts, invitations, stickers et passes."
      />
      
      <Header />
      
      {/* Hero Section - Pink gradient theme */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-pink-100 via-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-600 font-futura text-xs sm:text-sm mb-6 border border-pink-300/50">
              <Sparkles className="w-4 h-4" />
              <span>Projet Événementiel</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">Coachella 2K24</span>
              <br />
              <span className="text-pink-400/70">Soirée à thème</span>
            </h1>
            
            <p className="font-futura text-pink-600/80 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              Direction artistique complète pour une soirée privée à thème festival : 
              t-shirts personnalisés, cartes d&apos;invitation avec QR code, stickers et passes d&apos;entrée.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.4)]"
              >
                Créer mon événement
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What was created */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-pink-500 to-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <Shirt className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">T-shirts</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Design recto/verso</p>
            </div>
            <div>
              <Ticket className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Invitations</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">QR code personnalisé</p>
            </div>
            <div>
              <Sparkles className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Stickers</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Illustrations custom</p>
            </div>
            <div>
              <Music className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Passes</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Badges d&apos;entrée</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-pink-500 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Les créations</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Visuels du projet
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COACHELLA_IMAGES.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden bg-white border-2 border-pink-100 hover:border-pink-400 hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.2)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-white">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500/10 to-red-500/10 group-hover:from-pink-500 group-hover:to-red-500 flex items-center justify-center transition-all duration-300">
                        <IconComponent className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-anton text-xl sm:text-2xl text-pink-600">{item.title}</h3>
                    </div>
                    <p className="font-futura text-pink-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-pink-500 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">À propos du projet</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                Une soirée inoubliable
              </h2>
              <p className="font-futura text-pink-600/80 text-base sm:text-lg mt-6 leading-relaxed">
                Pour cette soirée privée à thème Coachella, j&apos;ai créé une identité visuelle complète 
                dans un style rétro-festival avec des tons roses et rouges vibrants.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-pink-600">T-shirts personnalisés</h4>
                    <p className="font-futura text-pink-400 text-sm">Design unique avec soleil stylisé et TV rétro &quot;More Love Por Favor&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-pink-600">Cartes d&apos;invitation</h4>
                    <p className="font-futura text-pink-400 text-sm">QR code pour confirmer sa présence et accéder aux infos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-pink-600">Goodies</h4>
                    <p className="font-futura text-pink-400 text-sm">Stickers illustrés et passes VIP pour les invités</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-300/20 to-red-300/20 blur-2xl" />
              <div className="relative bg-gradient-to-r from-pink-500 to-red-500 p-8 sm:p-12">
                <Sparkles className="w-12 h-12 text-white/50 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  &quot;Chaque détail compte pour créer une expérience mémorable.&quot;
                </p>
                <p className="font-futura text-white/60 text-sm mt-4">— ASSK Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-pink-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Un événement à organiser ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Créons ensemble une identité visuelle unique pour votre soirée, mariage, anniversaire ou événement d&apos;entreprise.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 sm:px-10 py-4 sm:py-5 bg-white text-pink-500 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Discutons de votre projet
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
