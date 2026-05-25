import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ScrollReveal';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Articles SEO optimisés pour les recherches locales Auvergne
const defaultPosts = [
  {
    id: '1',
    slug: 'graphiste-clermont-ferrand',
    title: "Graphiste Clermont-Ferrand : Comment choisir le bon designer pour votre entreprise",
    excerpt: "Vous cherchez un graphiste à Clermont-Ferrand ? Découvrez nos conseils pour sélectionner le designer qui transformera votre identité visuelle et boostera votre image de marque en Auvergne.",
    image_url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
    category: "Graphisme",
    author: "Amaury De Barros",
    read_time: "6 min",
    created_at: "2025-04-20",
    keywords: ["graphiste clermont-ferrand", "designer auvergne", "création logo 63"]
  },
  {
    id: '2',
    slug: 'creation-site-web-vichy',
    title: "Création de site web à Vichy : Guide complet 2025",
    excerpt: "Entreprise à Vichy ? Découvrez pourquoi un site web professionnel est essentiel et comment notre agence web locale peut vous accompagner dans votre transformation digitale.",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Sites Web",
    author: "Amaury De Barros",
    read_time: "8 min",
    created_at: "2025-04-15",
    keywords: ["création site web vichy", "agence web auvergne", "site internet allier"]
  },
  {
    id: '3',
    slug: 'impression-3d-moulins',
    title: "Impression 3D à Moulins : Services et possibilités",
    excerpt: "Basé dans l'Allier, notre service d'impression 3D filament propose des créations sur-mesure : figurines, prototypes, objets personnalisés. Découvrez nos réalisations.",
    image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    category: "3D",
    author: "Amaury De Barros",
    read_time: "5 min",
    created_at: "2025-04-10",
    keywords: ["impression 3d moulins", "impression 3d allier", "figurines personnalisées auvergne"]
  },
  {
    id: '4',
    slug: 'logo-entreprise-auvergne-erreurs',
    title: "Logo entreprise Auvergne : 5 erreurs à éviter absolument",
    excerpt: "Création de logo pour votre entreprise auvergnate ? Évitez ces erreurs courantes qui peuvent nuire à votre image de marque et découvrez nos conseils de designer professionnel.",
    image_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    category: "Graphisme",
    author: "Amaury De Barros",
    read_time: "7 min",
    created_at: "2025-04-05",
    keywords: ["logo entreprise auvergne", "création logo clermont", "identité visuelle 63"]
  },
  {
    id: '5',
    slug: 'prix-site-vitrine-2025',
    title: "Prix d'un site vitrine en 2025 : Tarifs et conseils",
    excerpt: "Combien coûte un site vitrine professionnel ? Découvrez nos tarifs transparents et comparez les offres pour faire le meilleur choix pour votre entreprise locale.",
    image_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    category: "Sites Web",
    author: "Amaury De Barros",
    read_time: "5 min",
    created_at: "2025-03-28",
    keywords: ["prix site vitrine", "tarif site web", "devis site internet auvergne"]
  },
  {
    id: '6',
    slug: 'art-toys-personnalises',
    title: "Art Toys personnalisés : Du concept à la figurine collector",
    excerpt: "Passionné de figurines ? Découvrez notre processus de création d'Art Toys sur-mesure : modélisation 3D, impression et finitions pour des pièces uniques.",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "3D",
    author: "Amaury De Barros",
    read_time: "6 min",
    created_at: "2025-03-20",
    keywords: ["art toys personnalisés", "figurines collector", "création figurine 3d"]
  },
  {
    id: '7',
    slug: 'identite-visuelle-pme',
    title: "Identité visuelle PME : Pourquoi investir dans votre image",
    excerpt: "Artisan, commerçant ou TPE en Auvergne ? Découvrez comment une identité visuelle professionnelle peut transformer votre activité et attirer plus de clients.",
    image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    category: "Branding",
    author: "Amaury De Barros",
    read_time: "4 min",
    created_at: "2025-03-15",
    keywords: ["identité visuelle pme", "branding artisan", "image de marque auvergne"]
  },
  {
    id: '8',
    slug: 'ecommerce-auvergne',
    title: "E-commerce Auvergne : Vendre en ligne depuis Clermont-Ferrand",
    excerpt: "Lancez votre boutique en ligne depuis l'Auvergne ! Guide pratique pour créer un e-commerce performant et vendre vos produits locaux partout en France.",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Sites Web",
    author: "Amaury De Barros",
    read_time: "9 min",
    created_at: "2025-03-10",
    keywords: ["e-commerce auvergne", "boutique en ligne clermont", "vente en ligne 63"]
  }
];

const categories = ["Tous", "Graphisme", "Sites Web", "3D", "Branding"];

export default function BlogPage() {
  const [posts, setPosts] = useState(defaultPosts);
  const [filteredPosts, setFilteredPosts] = useState(defaultPosts);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API}/blog`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setPosts(data);
          setFilteredPosts(data);
        }
      })
      .catch(() => {});
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

  // Schema.org Blog structured data
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog ASSK Studio",
    "description": "Conseils en graphisme, création de sites web et impression 3D en Auvergne",
    "url": "https://asskstudio.fr/blog",
    "author": {
      "@type": "Person",
      "name": "Amaury De Barros"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ASSK Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png"
      }
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image_url,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.created_at,
      "keywords": post.keywords?.join(", ") || ""
    }))
  };

  return (
    <div className="min-h-screen bg-white" data-testid="blog-page">
      <SEO 
        title="Blog Graphisme & Web | Conseils Design Auvergne | ASSK Studio"
        description="Conseils en graphisme, création de sites web et impression 3D. Articles pour entrepreneurs et entreprises en Auvergne : Clermont-Ferrand, Vichy, Moulins."
      />
      
      {/* Schema.org structured data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <Header />
      
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal animation="fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-4">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Clermont-Ferrand • Vichy • Moulins</span>
            </div>
            <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
              Blog & Conseils
            </h1>
            <p className="font-futura text-gray-600 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
              Astuces graphisme, création web et impression 3D pour les entrepreneurs d'Auvergne
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-12 border-b border-[#0047FF]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF]/40" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura text-sm focus:border-[#0047FF] focus:outline-none transition-colors"
                data-testid="blog-search"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 font-futura text-xs sm:text-sm transition-all duration-200 ${
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
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-futura text-gray-500 text-base sm:text-lg">
                Aucun article trouvé pour cette recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.id} animation="fadeUp" delay={index * 100}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full bg-white border border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-300"
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
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-[#0047FF] text-white text-[10px] sm:text-xs font-futura uppercase">
                          <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4 text-[#0047FF]/50 text-[10px] sm:text-xs font-futura mb-2 sm:mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={post.created_at}>
                            {formatDate(post.created_at)}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
                        </span>
                      </div>

                      <h2 className="font-anton text-base sm:text-lg lg:text-xl text-[#0047FF] group-hover:text-[#0047FF] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="font-futura text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#0047FF]/10">
                        <span className="inline-flex items-center gap-2 font-futura text-xs sm:text-sm text-[#0047FF] group-hover:gap-3 transition-all">
                          Lire l'article
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fadeUp">
            <h2 className="font-anton text-xl sm:text-2xl lg:text-3xl text-[#0047FF] mb-4">
              Studio Créatif en Auvergne
            </h2>
            <p className="font-futura text-gray-600 text-sm sm:text-base leading-relaxed">
              Basé entre Clermont-Ferrand, Vichy et Moulins, ASSK Studio accompagne les entreprises et artisans de l'Allier et du Puy-de-Dôme dans leur communication visuelle. 
              Graphisme, création de sites web, impression 3D : nous travaillons avec passion pour donner vie à vos projets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-white">
            Un projet en tête ?
          </h2>
          <p className="font-futura text-white/70 text-sm sm:text-base mt-3 sm:mt-4">
            Discutons de vos idées et transformons-les en réalité.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0047FF] font-anton text-sm sm:text-base uppercase transition-all duration-300 hover:gap-4 sm:hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Contactez-nous
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
