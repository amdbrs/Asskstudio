import { Helmet } from 'react-helmet-async';

const seoData = {
  home: {
    title: "ASSK Studio | Graphiste Freelance Clermont-Ferrand, Vichy, Moulins | Sites Web & 3D",
    description: "Studio créatif en Auvergne : création de logos professionnels, sites web sur-mesure et impression 3D. +50 projets réalisés. Devis gratuit sous 24h.",
    keywords: "graphiste Clermont-Ferrand, création logo Vichy, site web Moulins, identité visuelle Allier, graphiste freelance Auvergne"
  },
  graphisme: {
    title: "Graphiste Freelance Clermont-Ferrand | Logo & Identité Visuelle | ASSK Studio",
    description: "Création de logos, chartes graphiques et supports print/digital. Graphiste professionnel à Clermont-Ferrand, Vichy et Moulins. Tarifs clairs, devis gratuit.",
    keywords: "graphiste freelance Clermont-Ferrand, création logo Vichy, identité visuelle Moulins, charte graphique Allier, designer graphique Auvergne"
  },
  sitesWeb: {
    title: "Création Site Web Clermont-Ferrand | Site Vitrine & E-commerce | ASSK Studio",
    description: "Sites web vitrine dès 1200€, e-commerce dès 3000€. Développeur web freelance en Auvergne. Sites responsive, rapides et optimisés SEO.",
    keywords: "création site web Clermont-Ferrand, développeur web Vichy, site internet Moulins, site vitrine Allier, e-commerce Auvergne"
  },
  modelisation3d: {
    title: "Impression 3D & Modélisation | Art Toys Personnalisés | ASSK Studio Auvergne",
    description: "Modélisation 3D ZBrush, impression filament et art toys sur-mesure. Figurines, porte-clés et objets personnalisés en Auvergne.",
    keywords: "impression 3D Clermont-Ferrand, modélisation 3D Vichy, art toys Moulins, figurines personnalisées Allier"
  },
  realisations: {
    title: "Portfolio Graphisme & Web | +50 Projets | ASSK Studio Auvergne",
    description: "Portfolio de nos réalisations : logos, identités visuelles, sites web et créations 3D. Projets pour clients en Auvergne et France entière.",
    keywords: "portfolio graphisme Clermont-Ferrand, réalisations web design, projets logo Vichy, créations ASSK Studio"
  },
  aPropos: {
    title: "À Propos | Amaury De Barros, Graphiste Freelance Auvergne | ASSK Studio",
    description: "Découvrez ASSK Studio, fondé par Amaury De Barros. Graphiste freelance passionné basé en Auvergne. Design graphique, sites web et 3D.",
    keywords: "Amaury De Barros, graphiste Auvergne, designer freelance Clermont-Ferrand, studio créatif Allier"
  },
  blog: {
    title: "Blog Design & Conseils | Tendances Graphisme 2025 | ASSK Studio",
    description: "Conseils en graphisme, tendances web design 2025 et actualités créatives. Articles pratiques pour entrepreneurs et créatifs.",
    keywords: "blog graphisme, conseils web design 2025, tendances logo, actualités design Auvergne"
  },
  contact: {
    title: "Contact & Devis Gratuit | Graphiste Clermont-Ferrand | ASSK Studio",
    description: "Demandez votre devis gratuit sous 24h. Graphiste freelance à Clermont-Ferrand, Vichy, Moulins. Création logo, site web et impression 3D.",
    keywords: "devis graphiste Clermont-Ferrand, contact création site web, demande logo Vichy, devis 3D Moulins"
  }
};

// Schema.org LocalBusiness for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://assk-studio.fr/#business",
  "name": "ASSK Studio",
  "alternateName": "ASSK Studio - Amaury De Barros",
  "description": "Studio créatif spécialisé en graphisme, création de sites web et impression 3D en Auvergne",
  "url": "https://assk-studio.fr",
  "telephone": "+33665097008",
  "email": "amaurydebarros1607@gmail.com",
  "image": "https://assk-studio.fr/logo.png",
  "logo": "https://assk-studio.fr/logo.png",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Clermont-Ferrand",
    "addressRegion": "Auvergne-Rhône-Alpes",
    "postalCode": "63000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.7772",
    "longitude": "3.0870"
  },
  "areaServed": [
    { "@type": "City", "name": "Clermont-Ferrand" },
    { "@type": "City", "name": "Vichy" },
    { "@type": "City", "name": "Moulins" },
    { "@type": "City", "name": "Montluçon" },
    { "@type": "City", "name": "Cusset" },
    { "@type": "City", "name": "Riom" },
    { "@type": "AdministrativeArea", "name": "Allier" },
    { "@type": "AdministrativeArea", "name": "Puy-de-Dôme" },
    { "@type": "AdministrativeArea", "name": "Auvergne" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/assk.studio",
    "https://www.amdbrs.com"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services ASSK Studio",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de Logo",
          "description": "Logo professionnel et identité visuelle sur-mesure"
        },
        "price": "450",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Site Web Vitrine",
          "description": "Site internet responsive et optimisé SEO"
        },
        "price": "1200",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Identité Visuelle Complète",
          "description": "Logo, charte graphique et supports de communication"
        },
        "price": "950",
        "priceCurrency": "EUR"
      }
    ]
  }
};

export const SEO = ({ page = 'home', title: propTitle, description: propDescription, customTitle, customDescription, includeLocalBusiness = false }) => {
  const data = seoData[page] || seoData.home;
  const title = propTitle || customTitle || data.title;
  const description = propDescription || customDescription || data.description;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={data.keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="FR-ARA" />
      <meta name="geo.placename" content="Clermont-Ferrand, Auvergne" />
      
      {/* LocalBusiness Schema.org */}
      {(page === 'home' || includeLocalBusiness) && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
