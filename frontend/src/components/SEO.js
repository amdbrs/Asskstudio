import { Helmet } from 'react-helmet-async';

const seoData = {
  home: {
    title: "ASSK Studio | Graphisme, Sites Web & Impression 3D - Clermont-Ferrand, Vichy, Moulins",
    description: "Studio créatif familial en Auvergne : création de logos, identité visuelle, sites web et impression 3D. +50 projets réalisés.",
    keywords: "graphisme Clermont-Ferrand, création site web Vichy, logo Moulins, identité visuelle Allier"
  },
  graphisme: {
    title: "Graphisme & Identité Visuelle | ASSK Studio - Clermont-Ferrand, Auvergne",
    description: "Création de logos, chartes graphiques, supports print et digital. Studio créatif spécialisé en identité visuelle à Clermont-Ferrand, Vichy et Moulins.",
    keywords: "création logo Clermont-Ferrand, identité visuelle Vichy, graphiste Moulins, charte graphique Auvergne"
  },
  sitesWeb: {
    title: "Création de Sites Web | ASSK Studio - Clermont-Ferrand, Auvergne",
    description: "Sites web vitrine, e-commerce et landing pages sur-mesure. Développement web responsive et SEO optimisé en Auvergne.",
    keywords: "création site web Clermont-Ferrand, développeur web Vichy, site internet Moulins, e-commerce Auvergne"
  },
  modelisation3d: {
    title: "Modélisation 3D & Impression Filament | ASSK Studio - Auvergne",
    description: "Création de modèles 3D, art toys personnalisés et impression 3D filament. Porte-clés, figurines et objets sur demande en Auvergne.",
    keywords: "impression 3D Clermont-Ferrand, modélisation 3D Vichy, art toys Moulins, figurines personnalisées Auvergne"
  },
  realisations: {
    title: "Portfolio & Réalisations | ASSK Studio - Graphisme, Web & 3D",
    description: "Découvrez nos projets : logos, identités visuelles, sites web et créations 3D. +50 projets réalisés pour des clients en Auvergne et France.",
    keywords: "portfolio graphisme, réalisations web design, projets 3D, créations ASSK Studio"
  },
  aPropos: {
    title: "À Propos | ASSK Studio - Amaury De Barros, Designer Graphique",
    description: "Découvrez ASSK Studio, studio créatif familial fondé par Amaury De Barros. Design graphique, sites web et 3D en Auvergne.",
    keywords: "Amaury De Barros, designer graphique Auvergne, studio créatif familial, ASSK Studio"
  },
  blog: {
    title: "Blog & Actualités | ASSK Studio - Conseils Design & Créativité",
    description: "Conseils en graphisme, tendances web design et actualités du studio. Articles sur la création visuelle et l'impression 3D.",
    keywords: "blog design graphique, conseils web design, actualités ASSK Studio, tendances créatives"
  },
  contact: {
    title: "Contact | ASSK Studio - Demande de Devis Gratuit",
    description: "Contactez ASSK Studio pour votre projet de graphisme, site web ou impression 3D. Devis gratuit sous 24h. Clermont-Ferrand, Vichy, Moulins.",
    keywords: "contact ASSK Studio, devis graphisme, demande création site web, contact impression 3D"
  }
};

export const SEO = ({ page = 'home', customTitle, customDescription }) => {
  const data = seoData[page] || seoData.home;
  const title = customTitle || data.title;
  const description = customDescription || data.description;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={data.keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
