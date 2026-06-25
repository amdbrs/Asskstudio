import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, ExternalLink, Globe, FileText, Palette, Truck } from 'lucide-react';

const LIBERTY_IMAGES = [
  {
    id: '1',
    title: 'Cartes de visite',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/nq51eqoq_Business-Card-Mockup.png'
  },
  {
    id: '2',
    title: 'Site web',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/o67hf9nd_SITEWEB.png'
  },
  {
    id: '3',
    title: 'Stickers',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/wszusaxv_1.png'
  }
];

export default function LibertyVanPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="liberty-van-page">
      <SEO 
        title="Liberty Van - Identité Visuelle | ASSK Studio"
        description="Identité visuelle complète pour Liberty Van, entreprise de location de vans dans l'Allier (03)."
      />
      
      <Header />
      
      {/* Hero Section - Turquoise/Orange theme */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-cyan-600 via-cyan-500 to-teal-500 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 font-futura text-xs sm:text-sm mb-6 border border-white/20">
              <Truck className="w-4 h-4" />
              <span>Projet Client</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              Liberty Van
              <br />
              <span className="text-orange-300">Location de Vans</span>
            </h1>
            
            <p className="font-futura text-white/80 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              Identité visuelle complète pour une entreprise de location de vans aménagés 
              dans l&apos;Allier (03) : logo, cartes de visite, stickers et site web.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://drive.google.com/file/d/1E5MIV0tl0YNAvMiz5QtD-85HuEEc_EqJ/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-600 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
              >
                Présentation
                <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-white hover:text-cyan-600"
              >
                Projet similaire ?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What was created */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <Palette className="w-8 h-8 text-orange-300 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Logo</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Identité visuelle</p>
            </div>
            <div>
              <FileText className="w-8 h-8 text-orange-300 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Print</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Cartes & stickers</p>
            </div>
            <div>
              <Globe className="w-8 h-8 text-orange-300 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Site Web</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Design responsive</p>
            </div>
            <div>
              <Truck className="w-8 h-8 text-orange-300 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Branding</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Charte graphique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-cyan-600 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Les créations</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-cyan-700">
              Visuels du projet
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {LIBERTY_IMAGES.map((item) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden bg-white border-2 border-cyan-100 hover:border-cyan-400 hover:shadow-[0_30px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-cyan-50 to-white">
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-cyan-600 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">À propos du projet</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-cyan-700">
                L&apos;aventure en liberté
              </h2>
              <p className="font-futura text-cyan-700/80 text-base sm:text-lg mt-6 leading-relaxed">
                Liberty Van propose la location de vans aménagés dans l&apos;Allier (03) pour des escapades 
                en toute liberté. L&apos;identité visuelle reflète l&apos;esprit vintage et aventurier de la marque.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-cyan-700">Logo rétro</h4>
                    <p className="font-futura text-cyan-600 text-sm">Van vintage stylisé avec damier racing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-cyan-700">Palette turquoise & orange</h4>
                    <p className="font-futura text-cyan-600 text-sm">Couleurs évoquant l&apos;évasion et l&apos;énergie</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-cyan-700">Supports complets</h4>
                    <p className="font-futura text-cyan-600 text-sm">Cartes de visite, stickers et site web</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-200/30 blur-2xl" />
              <div className="relative bg-gradient-to-r from-cyan-500 to-teal-500 p-8 sm:p-12">
                <Truck className="w-12 h-12 text-orange-300 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  &quot;Une identité qui donne envie de prendre la route.&quot;
                </p>
                <p className="font-futura text-white/60 text-sm mt-4">— ASSK Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-cyan-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Un projet voyage ou location ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Agence de voyage, location de véhicules, camping : créons une identité qui inspire l&apos;aventure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="https://drive.google.com/file/d/1E5MIV0tl0YNAvMiz5QtD-85HuEEc_EqJ/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-cyan-600 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
            >
              Voir la présentation
              <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-white text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-white hover:text-cyan-600"
            >
              Discutons de votre projet
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
