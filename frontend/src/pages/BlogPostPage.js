import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

// Articles data (same as BlogPage)
const blogPosts = [
  {
    id: '1',
    slug: 'graphiste-clermont-ferrand',
    title: "Graphiste Clermont-Ferrand : Comment choisir le bon designer pour votre entreprise",
    excerpt: "Vous cherchez un graphiste à Clermont-Ferrand ? Découvrez nos conseils pour sélectionner le designer qui transformera votre identité visuelle et boostera votre image de marque en Auvergne.",
    content: `
      <p>La création d'une identité visuelle forte est essentielle pour toute entreprise souhaitant se démarquer. À Clermont-Ferrand et dans toute l'Auvergne, de nombreux graphistes proposent leurs services, mais comment faire le bon choix ?</p>
      
      <h2>Pourquoi faire appel à un graphiste local ?</h2>
      <p>Travailler avec un graphiste basé à Clermont-Ferrand présente de nombreux avantages. La proximité permet des échanges plus fluides, une meilleure compréhension de votre marché local et une réactivité accrue.</p>
      
      <h2>Les critères de sélection essentiels</h2>
      <ul>
        <li><strong>Le portfolio</strong> : Examinez attentivement les réalisations précédentes du designer</li>
        <li><strong>L'expérience</strong> : Un graphiste expérimenté comprendra mieux vos besoins</li>
        <li><strong>La communication</strong> : La qualité des échanges est primordiale</li>
        <li><strong>Les tarifs</strong> : Demandez plusieurs devis pour comparer</li>
      </ul>
      
      <h2>ASSK Studio : Votre partenaire créatif en Auvergne</h2>
      <p>Chez ASSK Studio, nous combinons créativité et expertise technique pour donner vie à vos projets. Notre approche personnalisée garantit des résultats qui correspondent parfaitement à votre vision.</p>
      
      <p>Que vous ayez besoin d'un logo, d'une charte graphique complète ou de supports de communication, nous sommes là pour vous accompagner.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=1200&q=80",
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
    content: `
      <p>Dans un monde de plus en plus connecté, avoir un site web professionnel n'est plus une option mais une nécessité. Pour les entreprises de Vichy et de l'Allier, c'est une opportunité unique de toucher une clientèle plus large.</p>
      
      <h2>Pourquoi votre entreprise à Vichy a besoin d'un site web ?</h2>
      <ul>
        <li>Visibilité 24h/24 et 7j/7</li>
        <li>Crédibilité professionnelle renforcée</li>
        <li>Canal de communication direct avec vos clients</li>
        <li>Référencement local pour attirer la clientèle de proximité</li>
      </ul>
      
      <h2>Les étapes de création d'un site web</h2>
      <p>La création d'un site web professionnel suit un processus rigoureux : analyse des besoins, conception graphique, développement, optimisation SEO et mise en ligne.</p>
      
      <h2>Notre approche sur-mesure</h2>
      <p>Chez ASSK Studio, nous créons des sites web qui reflètent l'identité unique de votre entreprise. Chaque projet est traité avec attention pour garantir un résultat à la hauteur de vos attentes.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
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
    content: `
      <p>L'impression 3D révolutionne la façon dont nous créons des objets. À Moulins et dans l'Allier, ASSK Studio vous propose un service d'impression 3D de qualité professionnelle.</p>
      
      <h2>Nos services d'impression 3D</h2>
      <ul>
        <li><strong>Prototypage rapide</strong> : Donnez vie à vos idées rapidement</li>
        <li><strong>Figurines personnalisées</strong> : Art toys et créations uniques</li>
        <li><strong>Objets décoratifs</strong> : Pièces sur-mesure pour votre intérieur</li>
        <li><strong>Pièces fonctionnelles</strong> : Solutions pratiques adaptées à vos besoins</li>
      </ul>
      
      <h2>Le processus de création</h2>
      <p>De la modélisation 3D à l'impression finale, nous vous accompagnons à chaque étape. Notre expertise technique garantit des résultats de haute qualité.</p>
      
      <h2>Pourquoi choisir ASSK Studio ?</h2>
      <p>Notre passion pour la création 3D se reflète dans chaque projet. Nous utilisons des matériaux de qualité et des techniques avancées pour des résultats exceptionnels.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
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
    content: `
      <p>Votre logo est souvent le premier contact visuel entre votre entreprise et vos clients potentiels. En Auvergne comme ailleurs, de nombreuses entreprises commettent des erreurs qui nuisent à leur image.</p>
      
      <h2>Erreur n°1 : Suivre les tendances à tout prix</h2>
      <p>Un logo doit être intemporel. Les tendances passent, mais votre identité doit perdurer.</p>
      
      <h2>Erreur n°2 : Trop de complexité</h2>
      <p>Un bon logo est simple et mémorable. Les designs trop chargés sont difficiles à reproduire et à retenir.</p>
      
      <h2>Erreur n°3 : Négliger la versatilité</h2>
      <p>Votre logo doit fonctionner sur tous les supports : cartes de visite, site web, enseignes...</p>
      
      <h2>Erreur n°4 : Choisir les mauvaises couleurs</h2>
      <p>Les couleurs véhiculent des émotions. Choisissez-les en fonction de votre secteur et de vos valeurs.</p>
      
      <h2>Erreur n°5 : Faire l'impasse sur un professionnel</h2>
      <p>Un graphiste professionnel apporte son expertise et garantit un résultat de qualité.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
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
    content: `
      <p>Le coût d'un site vitrine varie considérablement selon les prestataires et les fonctionnalités souhaitées. Voici notre guide pour y voir plus clair.</p>
      
      <h2>Les facteurs qui influencent le prix</h2>
      <ul>
        <li>Le nombre de pages</li>
        <li>Le design (template ou sur-mesure)</li>
        <li>Les fonctionnalités (formulaire, galerie, blog...)</li>
        <li>L'optimisation SEO</li>
        <li>La maintenance incluse</li>
      </ul>
      
      <h2>Fourchette de prix indicative</h2>
      <p>Un site vitrine de qualité professionnelle se situe généralement entre 800€ et 3000€. Les tarifs varient selon la complexité du projet.</p>
      
      <h2>Notre offre</h2>
      <p>Chez ASSK Studio, nous proposons des solutions adaptées à tous les budgets, sans compromis sur la qualité. Demandez votre devis personnalisé !</p>
    `,
    image_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80",
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
    content: `
      <p>Les Art Toys sont bien plus que de simples figurines : ce sont des œuvres d'art miniatures qui expriment créativité et personnalité. Découvrez comment nous donnons vie à vos idées.</p>
      
      <h2>Qu'est-ce qu'un Art Toy ?</h2>
      <p>Un Art Toy est une figurine de collection créée par des artistes ou designers. Chaque pièce est unique et reflète un univers créatif particulier.</p>
      
      <h2>Notre processus de création</h2>
      <ol>
        <li><strong>Concept</strong> : Discussion et sketches pour définir le design</li>
        <li><strong>Modélisation 3D</strong> : Création du modèle numérique</li>
        <li><strong>Impression</strong> : Fabrication avec notre imprimante 3D</li>
        <li><strong>Finitions</strong> : Ponçage, peinture et détails</li>
      </ol>
      
      <h2>Commandez votre Art Toy</h2>
      <p>Envie d'une création unique ? Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    category: "3D",
    author: "Amaury De Barros",
    read_time: "6 min",
    created_at: "2025-03-20",
    keywords: ["art toys personnalisés", "figurines collector", "création figurine 3d"]
  }
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Find the post by slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Get related posts (same category, excluding current)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 2);
      setRelatedPosts(related);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-anton text-4xl text-[#0047FF] mb-4">Article non trouvé</h1>
            <Link to="/blog" className="text-[#0047FF] underline">Retour au blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${post.title} | Blog ASSK Studio`}
        description={post.excerpt}
        keywords={post.keywords.join(', ')}
        type="article"
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[#0047FF] hover:text-[#0047FF]/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-futura text-sm">Retour au blog</span>
          </Link>

          {/* Category */}
          <span className="inline-block px-3 py-1 bg-[#0047FF] text-white font-futura text-xs uppercase tracking-wider mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-500 font-futura text-sm mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.read_time} de lecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 lg:px-12 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[21/9] overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Article content */}
          <article 
            className="prose prose-lg prose-blue max-w-none font-futura
              prose-headings:font-anton prose-headings:text-[#0047FF]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-li:text-gray-700
              prose-strong:text-[#0047FF]
              prose-a:text-[#0047FF] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#0047FF]" />
              {post.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-[#0047FF]/5 border-2 border-[#0047FF]/20">
            <h3 className="font-anton text-2xl text-[#0047FF] mb-4">Besoin d'un projet similaire ?</h3>
            <p className="font-futura text-gray-600 mb-6">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047FF] text-white font-anton uppercase transition-all hover:shadow-lg"
            >
              Demander un devis
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-12 py-16 bg-[#0047FF]/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-anton text-3xl text-[#0047FF] mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={relatedPost.image_url} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[#0047FF] font-futura text-xs uppercase tracking-wider">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-anton text-xl text-[#0047FF] mt-2 group-hover:text-[#0047FF]/80 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
