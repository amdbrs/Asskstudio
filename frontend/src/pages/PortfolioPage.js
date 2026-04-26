import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Fallback portfolio data with real images
const FALLBACK_PORTFOLIO = [
  { id: '1', title: 'Sellerie Garcia', description: 'Site vitrine artisan sellier - Automobile, moto, mobilier', category: 'Site Web', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/xbxushaa_IMG_0412.png', link: 'https://selleriegarcia.fr' },
  { id: '2', title: 'Posters en vrac', description: 'Nombreux design de posters', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/1aifryat_IMG_0347.png', link: '#' },
  { id: '3', title: 'RAPPEUR FIGURINE', description: 'Figurines de rappeurs virtuels avec leur boîte de collection respective.', category: '3D', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/t8ve9seo_IMG_0333.jpg', link: '#' },
  { id: '4', title: 'Sneakers Design', description: 'Visuels graphiques sneakers', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/zlk12w3k_IMG_0356.png', link: '#' },
  { id: '5', title: 'Club Football Laforest', description: 'Logo et t-shirts vintage', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9zz84ry3_IMG_0348.jpeg', link: '#' },
  { id: '6', title: 'IRIS', description: 'Identité visuelle prêt-à-porter', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/lq95pan1_IMG_0349.png', link: '#' },
  { id: '7', title: 'Liberty Van', description: 'Location de Vans - Allier', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/p3o8ddqr_IMG_0357.png', link: '#' },
  { id: '8', title: 'Manga Posters', description: 'Posters personnages manga', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/5lixsbhf_IMG_0354.png', link: '#' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.3, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(FALLBACK_PORTFOLIO);
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', 'Graphisme', 'Site Web', '3D'];

  useEffect(() => {
    fetch(`${API}/portfolio`)
      .then(r => r.json())
      .then(data => { if (data?.length > 0) setPortfolio(data); })
      .catch(() => {});
  }, []);

  const filteredPortfolio = filter === 'Tous' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-testid="portfolio-page">
      <SEO 
        title="Réalisations | ASSK Studio"
        description="Découvrez nos réalisations en graphisme, création de sites web et modélisation 3D. Portfolio de projets créatifs en Auvergne."
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm text-white/40">(Portfolio)</span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter mt-2 mb-6">
              Nos réalisations
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Une sélection de projets en graphisme, développement web et modélisation 3D réalisés pour nos clients.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 font-mono text-sm border transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-white text-[#0a0a0a] border-white' 
                    : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
                }`}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredPortfolio.map((item, index) => (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500"
                data-testid={`portfolio-item-${index}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#0047FF] uppercase tracking-wider">{item.category}</span>
                    {item.link && item.link !== '#' && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-[#0047FF] transition-colors"
                        aria-label={`Voir le projet ${item.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            Un projet en tête ?
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto mb-10">
            Discutons de votre vision et créons ensemble quelque chose d'unique.
          </p>
          <a 
            href="/contact" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-heading font-medium text-base transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
          >
            Démarrer un projet
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
