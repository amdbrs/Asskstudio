import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, Palette, Shirt, Trophy } from 'lucide-react';

const FOOTBALL_IMAGES = [
  {
    id: '1',
    title: 'Logo du club',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/b013fktk_REPLACE-THIS-SCREEN11112111131.jpg'
  },
  {
    id: '2',
    title: 'Maillot moderne',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/kzekcg6b_t-shirt-football.png'
  },
  {
    id: '3',
    title: 'Maillot vintage - Face',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/slxa2qke_8e9c388d-ae74-47e6-98e6-b3aa23f8bc70.jpg'
  },
  {
    id: '4',
    title: 'Maillot vintage - Dos',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/fcyycolu_TSHIRT-foot-dos.jpg'
  }
];

export default function ClubFootballPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="club-football-page">
      <SEO 
        title="Club Football Laforest - Stage | ASSK Studio"
        description="Création de logo et maillots pour le stage du Club Football Laforest : design vintage et moderne."
      />
      
      <Header />
      
      {/* Hero Section - Green theme */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 font-futura text-xs sm:text-sm mb-6 border border-white/20">
              <Trophy className="w-4 h-4" />
              <span>Projet Client</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              Club Football
              <br />
              <span className="text-teal-300">Laforest</span>
            </h1>
            
            <p className="font-futura text-white/80 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              Création d&apos;un logo et de t-shirts pour le stage du club : 
              un design vintage et un design moderne aux couleurs du club.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
              >
                Projet similaire ?
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What was created */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-teal-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <Palette className="w-8 h-8 text-teal-200 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Logo</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Écusson du club</p>
            </div>
            <div>
              <Shirt className="w-8 h-8 text-teal-200 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Vintage</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">T-shirt rétro</p>
            </div>
            <div>
              <Shirt className="w-8 h-8 text-teal-200 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Moderne</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Maillot actuel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-teal-600 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Les créations</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-teal-700">
              Visuels du projet
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {FOOTBALL_IMAGES.map((item) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden bg-white border-2 border-teal-100 hover:border-teal-400 hover:shadow-[0_30px_60px_-15px_rgba(13,148,136,0.2)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-teal-50 to-white">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-teal-600 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">À propos du projet</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-teal-700">
                L&apos;esprit du club
              </h2>
              <p className="font-futura text-teal-700/80 text-base sm:text-lg mt-6 leading-relaxed">
                Pour le stage annuel du Club Football Laforest, j&apos;ai créé une identité visuelle 
                qui capture l&apos;essence du club : tradition et modernité.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-teal-700">Logo écusson</h4>
                    <p className="font-futura text-teal-600 text-sm">Design classique avec initiales LF stylisées</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-teal-700">T-shirt vintage</h4>
                    <p className="font-futura text-teal-600 text-sm">Style rétro rappelant les grandes équipes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-teal-700">Maillot moderne</h4>
                    <p className="font-futura text-teal-600 text-sm">Design actuel avec motifs topographiques</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-teal-200/30 blur-2xl" />
              <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 p-8 sm:p-12">
                <Trophy className="w-12 h-12 text-teal-200 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  &quot;Des maillots qui donnent envie de gagner.&quot;
                </p>
                <p className="font-futura text-white/60 text-sm mt-4">— Club Football Laforest</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Un projet sportif ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Club de foot, rugby, basket ou association sportive : créons ensemble votre identité visuelle.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 sm:px-10 py-4 sm:py-5 bg-white text-teal-700 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
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
