import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Fallback portfolio data with publicly accessible images
const FALLBACK_PORTFOLIO = [
  {
    id: '1',
    title: 'Sellerie Garcia',
    description: 'Site vitrine artisan sellier - Automobile, moto, mobilier',
    category: 'Site Web',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    link: 'https://selleriegarcia.fr'
  },
  {
    id: '2',
    title: 'Posters en vrac',
    description: 'Nombreux design de posters créatifs',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    link: 'https://amdbrs.com/posters-en-vrac'
  },
  {
    id: '3',
    title: 'Rappeur Figurine',
    description: 'Figurines de rappeurs virtuels avec boîte de collection',
    category: '3D',
    image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
    link: 'https://amdbrs.com/figurine-rap-3d-ia'
  },
  {
    id: '4',
    title: 'Sneakers Design',
    description: 'Visuels graphiques de paires de chaussures favorites',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    link: 'https://amdbrs.com/print-1'
  },
  {
    id: '5',
    title: 'Manga Posters',
    description: 'Posters de personnages manga',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80',
    link: 'https://amdbrs.com/brook-one-piece'
  },
  {
    id: '6',
    title: 'Blended Worlds',
    description: 'Alliance numérique et réel en 3D',
    category: '3D',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    link: 'https://amdbrs.com/blended-worlds'
  },
  {
    id: '7',
    title: 'Kates Agency',
    description: 'Logo pour une agence au pair aux États-Unis',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    link: 'https://amdbrs.com/kates-agency'
  },
  {
    id: '8',
    title: 'IRIS',
    description: 'Identité visuelle marque prêt-à-porter',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80',
    link: 'https://amdbrs.com/iris'
  },
  {
    id: '9',
    title: 'Club Football Laforest',
    description: 'Logo et t-shirts pour un stage de football amateur',
    category: 'Graphisme',
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    link: 'https://amdbrs.com/club-football-laforest'
  }
];

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
        } else {
          setItems(FALLBACK_PORTFOLIO);
        }
      } else {
        setItems(FALLBACK_PORTFOLIO);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setItems(FALLBACK_PORTFOLIO);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = filter === 'all'
    ? items
    : items.filter((item) => item.category === filter);

  const categories = ['all', ...new Set(items.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-white" data-testid="portfolio-page">
      <SEO page="realisations" />
      <Header />

      {/* Hero */}
      <section className="bg-[#0047FF] pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white uppercase">
            RÉALISATIONS
          </h1>
          <p className="font-futura text-white/80 text-lg mt-4 max-w-xl">
            Découvrez nos projets en graphisme, 3D et création d'identités visuelles.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 border-b-2 border-[#0047FF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-anton uppercase border-2 border-[#0047FF] transition-colors duration-200 ${
                  filter === cat
                    ? 'bg-[#0047FF] text-white'
                    : 'bg-white text-[#0047FF] hover:bg-[#0047FF] hover:text-white'
                }`}
                data-testid={`filter-${cat}`}
              >
                {cat === 'all' ? 'TOUT' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#0047FF] border-t-transparent animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-center font-futura text-[#0047FF] py-12">
              Aucun projet disponible
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link || '#'}
                  target={item.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="border-2 border-[#0047FF] bg-white portfolio-item group block"
                  data-testid={`portfolio-item-${item.id}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#0047FF] bg-[#0047FF]/10">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/0047FF/FFFFFF?text=${encodeURIComponent(item.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#0047FF]/0 group-hover:bg-[#0047FF]/20 transition-colors duration-300" />
                    {item.link && (
                      <div className="absolute top-3 right-3 p-2 bg-white border-2 border-[#0047FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ExternalLink className="w-4 h-4 text-[#0047FF]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="font-futura text-xs text-[#0047FF]/70 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-anton text-xl text-[#0047FF] uppercase mt-1">
                      {item.title}
                    </h3>
                    <p className="font-futura text-[#0047FF]/70 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
