import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Temporary blog posts data (will be replaced by API)
const defaultPosts = [
  {
    id: '1',
    title: "Comment créer un logo mémorable pour votre entreprise",
    excerpt: "Découvrez les 5 principes fondamentaux pour concevoir un logo qui marque les esprits et représente parfaitement votre marque.",
    image_url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
    category: "Graphisme",
    author: "Amaury De Barros",
    read_time: "5 min",
    created_at: "2025-01-15"
  },
  {
    id: '2',
    title: "Site vitrine vs Site e-commerce : lequel choisir ?",
    excerpt: "Guide complet pour comprendre les différences et faire le bon choix selon vos objectifs business.",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Sites Web",
    author: "Amaury De Barros",
    read_time: "7 min",
    created_at: "2025-01-10"
  },
  {
    id: '3',
    title: "L'impression 3D filament : possibilités infinies",
    excerpt: "De la conception à l'objet fini, explorez les applications créatives de l'impression 3D pour vos projets personnalisés.",
    image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    category: "3D",
    author: "Amaury De Barros",
    read_time: "6 min",
    created_at: "2025-01-05"
  },
  {
    id: '4',
    title: "Tendances graphisme 2025 : ce qui va marquer l'année",
    excerpt: "Couleurs, typographies, styles : anticipez les tendances pour garder une longueur d'avance sur vos concurrents.",
    image_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    category: "Graphisme",
    author: "Amaury De Barros",
    read_time: "8 min",
    created_at: "2024-12-28"
  },
  {
    id: '5',
    title: "Pourquoi investir dans une identité visuelle professionnelle",
    excerpt: "ROI, crédibilité, mémorabilité : les arguments concrets pour convaincre de l'importance du branding.",
    image_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    category: "Branding",
    author: "Amaury De Barros",
    read_time: "4 min",
    created_at: "2024-12-20"
  },
  {
    id: '6',
    title: "Art Toys : de la passion à la création sur-mesure",
    excerpt: "Plongez dans l'univers des figurines collector et découvrez notre processus de création unique.",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "3D",
    author: "Amaury De Barros",
    read_time: "5 min",
    created_at: "2024-12-15"
  }
];

const categories = ["Tous", "Graphisme", "Sites Web", "3D", "Branding"];

export default function BlogPage() {
  const [posts, setPosts] = useState(defaultPosts);
  const [filteredPosts, setFilteredPosts] = useState(defaultPosts);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch blog posts from API
    fetch(`${API}/blog`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setPosts(data);
          setFilteredPosts(data);
        }
      })
      .catch(() => {
        // Use default posts if API fails
      });
  }, []);

  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white" data-testid="blog-page">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0047FF]">
            Blog & Actualités
          </h1>
          <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Conseils, tendances et coulisses de nos projets créatifs
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 border-b border-[#0047FF]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0047FF]/40" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura focus:border-[#0047FF] focus:outline-none transition-colors"
                data-testid="blog-search"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-futura text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#0047FF] text-white'
                      : 'bg-[#0047FF]/10 text-[#0047FF] hover:bg-[#0047FF]/20'
                  }`}
                  data-testid={`category-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-futura text-[#0047FF]/60 text-lg">
                Aucun article trouvé pour cette recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white border border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-300"
                  data-testid={`blog-post-${post.id}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0047FF] text-white text-xs font-futura uppercase">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[#0047FF]/50 text-xs font-futura mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.read_time}
                      </span>
                    </div>

                    <h2 className="font-anton text-xl text-[#0047FF] group-hover:text-[#0047FF] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="font-futura text-[#0047FF]/70 text-sm mt-3 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#0047FF]/10">
                      <button className="group/btn inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] hover:gap-3 transition-all">
                        Lire l'article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl text-white">
            Un projet en tête ?
          </h2>
          <p className="font-futura text-white/70 mt-4">
            Discutons de vos idées et transformons-les en réalité.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 py-4 bg-white text-[#0047FF] font-anton text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
