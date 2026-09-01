import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, Sparkles, Grid3X3, Flower2, Monitor, Music } from 'lucide-react';

const POSTER_BANNER_URL = 'https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/n3lf6b18_b5913da9-b747-483b-81f8-6f0bea71ee9a.webp';

const BITFLOWER_IMAGES = [
  {
    id: '1',
    title: 'Bitflower - Face',
    image_url: 'https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/dk5j9s9q_2b44aa9f-6833-4e8e-a99b-8626e8e18dbf_rw_1920.png'
  },
  {
    id: '2',
    title: 'Bitflower - Dos',
    image_url: 'https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/v76ht7nc_90331076-7f71-42bc-bf73-747c7fd9795f_rw_1920.png'
  }
];

export default function BlendedWorldsPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="blended-worlds-page">
      <SEO 
        title="Blended Worlds - Projet Créatif | ASSK Studio"
        description="Blended Worlds : alliance entre le monde numérique et le réel en combinant des éléments pixelisés à des objets de la vie courante."
      />
      
      <Header />
      
      {/* Hero Section with Poster Banner */}
      <section className="relative pt-20 sm:pt-24 overflow-hidden">
        {/* Banner Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1]">
          <img 
            src={POSTER_BANNER_URL}
            alt="Blended Worlds - Pixel Melody, Pixel Essence, Pixel Flower"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-futura text-xs sm:text-sm mb-4 border border-white/30">
                <Grid3X3 className="w-4 h-4" />
                <span>Projet Créatif</span>
              </div>
              <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
                Blended Worlds
              </h1>
              <p className="font-futura text-white/80 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl">
                L&apos;alliance entre le monde numérique et le réel en combinant des éléments 
                pixelisés à des objets de la vie courante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <Grid3X3 className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Pixel Art</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Esthétique rétro</p>
            </div>
            <div>
              <Monitor className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Digital</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Monde virtuel</p>
            </div>
            <div>
              <Flower2 className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="font-anton text-2xl sm:text-3xl text-white">Réel</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Objets du quotidien</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual: Bitflower */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-600 font-futura text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Visuel #1</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-amber-600">
              Bitflower
            </h2>
            <p className="font-futura text-gray-600 text-base sm:text-lg mt-4 max-w-xl mx-auto">
              Une fleur pixelisée qui pousse d&apos;une canette écrasée. 
              Le numérique qui donne vie au déchet urbain.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {BITFLOWER_IMAGES.map((item) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 hover:border-amber-400 hover:shadow-[0_30px_60px_-15px_rgba(245,158,11,0.2)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
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

      {/* Visual: Pixel Essence */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 font-futura text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Visuel #2</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-blue-600">
              Pixel Essence
            </h2>
            <p className="font-futura text-gray-600 text-base sm:text-lg mt-4 max-w-xl mx-auto">
              Des cœurs pixelisés emprisonnés dans une bouteille en verre. 
              L&apos;essence du digital capturée dans un objet du réel.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-400 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/drdrmkqc_f1b34d2b-0936-4f4d-8e9f-1a95d3f73195_rw_1920.png" 
                  alt="Pixel Essence - Dos"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-400 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/212bwgm2_5700fddf-5ce6-4ed0-a18e-4097fb228cdc_rw_1920.png" 
                  alt="Pixel Essence - Face"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual: Pixel Melody */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 font-futura text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Visuel #3</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-purple-600">
              Pixel Melody
            </h2>
            <p className="font-futura text-gray-600 text-base sm:text-lg mt-4 max-w-xl mx-auto">
              Un vinyle qui libère des notes de musique pixelisées. 
              Quand le son analogique rencontre l&apos;esthétique digitale.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-400 hover:shadow-[0_30px_60px_-15px_rgba(147,51,234,0.2)] transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/bjnyz0qe_fe112235-450f-4c02-a17c-9d8132d6154c_rw_1920.jpg" 
                  alt="Pixel Melody - Dos"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-400 hover:shadow-[0_30px_60px_-15px_rgba(147,51,234,0.2)] transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets-jai6qajn.emergentagent.net/job_leave-your-mark/artifacts/a98lg519_530c2a39-1107-4c68-b74f-87b1170300b7_rw_1920.jpg" 
                  alt="Pixel Melody - Face"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Poster Full Width */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <p className="font-futura text-gray-500 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Collection complète</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-gray-800">
              Les 3 visuels
            </h2>
          </header>
          <div className="overflow-hidden border-2 border-gray-100 hover:border-gray-300 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
            <img 
              src={POSTER_BANNER_URL}
              alt="Blended Worlds - Collection complète"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-amber-600 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Le concept</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-amber-700">
                Deux mondes, une vision
              </h2>
              <p className="font-futura text-amber-700/80 text-base sm:text-lg mt-6 leading-relaxed">
                Blended Worlds explore la frontière entre le digital et le tangible. 
                Chaque création associe l&apos;esthétique rétro du pixel art à des éléments 
                concrets de notre quotidien.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-amber-500 mt-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                  <div>
                    <h4 className="font-anton text-lg text-amber-700">Pixel Art nostalgique</h4>
                    <p className="font-futura text-amber-600 text-sm">Références aux jeux vidéo 8-bit et à la culture rétro</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-amber-500 mt-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                  <div>
                    <h4 className="font-anton text-lg text-amber-700">Objets du quotidien</h4>
                    <p className="font-futura text-amber-600 text-sm">Canettes, objets urbains transformés en supports artistiques</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-amber-500 mt-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                  <div>
                    <h4 className="font-anton text-lg text-amber-700">Message écologique</h4>
                    <p className="font-futura text-amber-600 text-sm">La beauté peut naître de ce qu&apos;on jette</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-amber-200/30 blur-2xl" />
              <div className="relative bg-gradient-to-r from-amber-400 to-orange-400 p-8 sm:p-12">
                <Grid3X3 className="w-12 h-12 text-white/50 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  &quot;Le pixel est au digital ce que l&apos;atome est au réel.&quot;
                </p>
                <p className="font-futura text-white/60 text-sm mt-4">— Blended Worlds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-amber-400 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Envie d&apos;un design unique ?
          </h2>
          <p className="font-futura text-white/80 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Commandez un visuel Blended Worlds personnalisé pour vos t-shirts, affiches ou supports créatifs.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 sm:px-10 py-4 sm:py-5 bg-white text-amber-600 font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.4)]"
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
