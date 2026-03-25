import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
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
      <Header />

      {/* Hero */}
      <section className="bg-[#0047FF] py-16 px-4 sm:px-6 lg:px-12">
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
