import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, ExternalLink, Globe, FileText, Palette, PenTool } from 'lucide-react';

const SELLERIE_IMAGES = [
  {
    id: '1',
    title: 'Carte de visite - Recto',
    description: 'Design vert forêt avec logo machine à coudre',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/0mi6c65b_carte-visite-garcia.jpg',
    icon: PenTool
  },
  {
    id: '2',
    title: 'Carte de visite - Verso',
    description: 'Coordonnées et informations de contact',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/mkavvv36_dssdq.jpg',
    icon: FileText
  },
  {
    id: '3',
    title: 'Flyer promotionnel',
    description: 'Présentation des services sur voiture vintage',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/3oqqdatm_poster-post-insta-garcia.jpg',
    icon: Palette
  },
  {
    id: '4',
    title: 'Flyer détaillé',
    description: 'Savoir-faire et prestations de l\'artisan',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/xq67ay38_poster-post-insta-garcia2.jpg',
    icon: Globe
  }
];

export default function SellerieGarciaPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="sellerie-garcia-page">
      <SEO 
        title="Sellerie Garcia - Identité Visuelle | ASSK Studio"
        description="Direction artistique complète pour Sellerie Garcia, artisan sellier garnisseur : logo, cartes de visite, flyers et site web."
      />
      
      <Header />
      
      {/* Hero Section - Green theme */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 font-futura text-xs sm:text-sm mb-6 border border-white/20">
              <PenTool className="w-4 h-4" />
              <span>Projet Client</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              Sellerie Garcia
              <br />
              <span className="text-white/50">Artisan Sellier Garnisseur</span>
            </h1>
            
            <p className="font-futura text-white/70 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              Identité visuelle complète pour un artisan sellier garnisseur : 
              création du logo, cartes de visite, flyers promotionnels et site web vitrine.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://selleriegarcia.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-900 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
              >
                Voir le site web
                <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-white hover:text-emerald-900"
              >
                Projet similaire ?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What was created */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-emerald-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <PenTool className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Logo</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Identité visuelle</p>
            </div>
            <div>
              <FileText className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Print</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Cartes & flyers</p>
            </div>
            <div>
              <Globe className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Site Web</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">selleriegarcia.fr</p>
            </div>
            <div>
              <Palette className="w-8 h-8 text-white/80 mx-auto mb-2" />
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
            <p className="font-futura text-emerald-700 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Les créations</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-emerald-900">
              Visuels du projet
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SELLERIE_IMAGES.map((item) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden bg-white border-2 border-emerald-100 hover:border-emerald-500 hover:shadow-[0_30px_60px_-15px_rgba(6,78,59,0.2)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-emerald-700 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">À propos du projet</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-emerald-900">
                Un artisan, une identité
              </h2>
              <p className="font-futura text-emerald-700/80 text-base sm:text-lg mt-6 leading-relaxed">
                Victor Garcia, artisan sellier garnisseur basé à Yzeure (03), avait besoin d&apos;une identité 
                visuelle professionnelle reflétant son savoir-faire artisanal et son expertise.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-700 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-emerald-900">Logo signature</h4>
                    <p className="font-futura text-emerald-600 text-sm">Machine à coudre stylisée dans un cercle épuré</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-700 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-emerald-900">Palette naturelle</h4>
                    <p className="font-futura text-emerald-600 text-sm">Vert forêt et tons neutres évoquant le cuir et le travail artisanal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-emerald-700 rounded-full mt-2" />
                  <div>
                    <h4 className="font-anton text-lg text-emerald-900">Site web vitrine</h4>
                    <p className="font-futura text-emerald-600 text-sm">Présentation des services : auto, moto, bateau, mobilier</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-200/30 blur-2xl" />
              <div className="relative bg-emerald-800 p-8 sm:p-12">
                <PenTool className="w-12 h-12 text-white/50 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  &quot;Notre site web nous apporte des clients chaque semaine.&quot;
                </p>
                <p className="font-futura text-white/60 text-sm mt-4">— Victor Garcia, Sellerie Garcia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-emerald-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Un projet artisanal ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Artisan, commerçant ou entrepreneur : valorisez votre savoir-faire avec une identité visuelle sur-mesure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="https://selleriegarcia.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-emerald-800 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
            >
              Voir selleriegarcia.fr
              <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-white text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-white hover:text-emerald-800"
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
