import { useState, useEffect } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Portfolio avec les vraies images
const FALLBACK_PORTFOLIO = [
  {
    id: '1',
    title: 'Sellerie Garcia',
    description: 'Site vitrine artisan sellier - Automobile, moto, mobilier',
    category: 'Site Web',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/xbxushaa_IMG_0412.png',
    link: 'https://selleriegarcia.fr'
  },
  {
    id: '2',
    title: 'Liberty Van',
    description: 'Entreprise de location de Vans dans l\'Allier 03',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/1aifryat_IMG_0347.png',
    link: '#'
  },
  {
    id: '3',
    title: 'Club Football Laforest',
    description: 'Création logo et t-shirts vintage/moderne pour le club',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9zz84ry3_IMG_0348.jpeg',
    link: '#'
  },
  {
    id: '4',
    title: 'IRIS',
    description: 'Identité visuelle marque créateur prêt-à-porter',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/lq95pan1_IMG_0349.png',
    link: '#'
  },
  {
    id: '5',
    title: 'Entreprise Lesly',
    description: 'Logo, carte de visite et signalétique - Peintre & Décorateur',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/drjnh37d_IMG_0350.png',
    link: '#'
  },
  {
    id: '6',
    title: 'Sneakers Design',
    description: 'Visuels graphiques de paires de chaussures favorites',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/zlk12w3k_IMG_0356.png',
    link: '#'
  },
  {
    id: '7',
    title: 'Kates Agency',
    description: 'Logo pour une agence au pair aux États-Unis',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/nzex1bji_IMG_0157.png',
    link: '#'
  },
  {
    id: '8',
    title: 'Manga Posters',
    description: 'Posters de personnages manga que j\'apprécie',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/yrpzu4yj_IMG_0352.png',
    link: '#'
  },
  {
    id: '9',
    title: 'Posters en vrac',
    description: 'Sélection de posters réalisés lors de projets pro ou perso',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/228szjo1_IMG_0353.png',
    link: '#'
  },
  {
    id: '10',
    title: 'Rappeur Figurine',
    description: 'Figurines de rappeurs virtuels avec boîte de collection',
    category: '3D',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/t8ve9seo_IMG_0333.jpg',
    link: '#'
  },
  {
    id: '11',
    title: 'Other Posters',
    description: 'Autres créations graphiques personnelles',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/5lixsbhf_IMG_0354.png',
    link: '#'
  },
  {
    id: '12',
    title: 'Liberty Van Blueprint',
    description: 'Design technique van pour Liberty Van',
    category: 'Graphisme',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/p3o8ddqr_IMG_0357.png',
    link: '#'
  }
];

export default function PortfolioPage() {
  const [items, setItems] = useState(FALLBACK_PORTFOLIO);
  const [filter, setFilter] = useState('Tous');
  const [loading, setLoading] = useState(true);

  const categories = ['Tous', 'Graphisme', 'Site Web', '3D'];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`${API}/portfolio`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setItems(data);
        }
      }
    } catch (error) {
      console.log('Using fallback portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = filter === 'Tous' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white" data-testid="portfolio-page">
      <SEO 
        title="Réalisations | ASSK Studio - Portfolio Graphisme & Web"
        description="Découvrez nos réalisations en graphisme, création de sites web et modélisation 3D. Portfolio de projets créatifs réalisés en Auvergne."
      />
      
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">
            Portfolio
          </p>
          <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0047FF] leading-tight mb-4 sm:mb-6">
            Nos Réalisations
          </h1>
          <p className="font-futura text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Une sélection de projets en graphisme, développement web et modélisation 3D réalisés pour nos clients.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 border-b border-[#0047FF]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 font-futura text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-[#0047FF] text-white' 
                    : 'bg-white text-[#0047FF] border border-[#0047FF]/20 hover:border-[#0047FF]'
                }`}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-[4/3] bg-[#0047FF]/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item, index) => (
                <article 
                  key={item.id}
                  className="group relative overflow-hidden bg-white border border-[#0047FF]/10 hover:border-[#0047FF]/30 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,71,255,0.15)]"
                  data-testid={`portfolio-item-${index}`}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#0047FF]/5">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-futura text-[10px] sm:text-xs text-[#0047FF] uppercase tracking-wider">
                        {item.category}
                      </span>
                      {item.link && item.link !== '#' && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#0047FF]/40 hover:text-[#0047FF] transition-colors"
                          aria-label={`Voir le projet ${item.title}`}
                        >
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                    <h3 className="font-anton text-lg sm:text-xl text-[#0047FF]">{item.title}</h3>
                    <p className="font-futura text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="font-futura text-gray-500 text-lg">Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-20 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-white mb-4 sm:mb-6">
            Un projet en tête ?
          </h2>
          <p className="font-futura text-white/70 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto">
            Discutons de votre vision et créons ensemble quelque chose d'unique.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0047FF] font-anton text-sm sm:text-base uppercase transition-all duration-300 hover:bg-[#0047FF] hover:text-white hover:shadow-lg border-2 border-white"
          >
            Démarrer un projet
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
