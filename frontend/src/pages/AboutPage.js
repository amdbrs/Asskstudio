import { Link } from 'react-router-dom';
import { ArrowRight, Check, Heart, Users, Award, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.3, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  const values = [
    { icon: Heart, title: 'Passion', desc: 'Chaque projet est une nouvelle aventure créative' },
    { icon: Users, title: 'Proximité', desc: 'Une relation de confiance, de la conception à la livraison' },
    { icon: Award, title: 'Qualité', desc: 'Des finitions soignées et une attention aux détails' },
    { icon: Clock, title: 'Réactivité', desc: 'Des délais respectés et une communication fluide' },
  ];

  const timeline = [
    { year: '2019', title: 'Les débuts', desc: 'Premiers projets en graphisme freelance' },
    { year: '2020', title: 'Développement web', desc: 'Extension vers la création de sites web' },
    { year: '2021', title: 'ASSK Studio', desc: 'Création officielle du studio créatif' },
    { year: '2022', title: 'Modélisation 3D', desc: 'Intégration des services 3D et impression' },
    { year: '2023', title: 'Art Toys', desc: 'Lancement de la collection de figurines' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-testid="about-page">
      <SEO 
        title="À propos | ASSK Studio"
        description="Découvrez ASSK Studio, studio créatif familial basé en Auvergne. Graphisme, sites web et modélisation 3D avec passion et proximité."
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm text-white/40">(À propos)</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-2 mb-6">
                Un studio créatif
                <br />
                <span className="text-white/30">familial et passionné</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                Je suis Amaury De Barros, designer graphique passionné par la création visuelle. ASSK Studio est né de l'envie d'accompagner les entreprises et particuliers dans la création de leur identité visuelle.
              </p>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-[#0047FF]/20 rounded-full blur-3xl" />
                <img src={LOGO_URL} alt="ASSK Studio" className="relative z-10 w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <span className="font-mono text-sm text-white/40">(01)</span>
              <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mt-2">Notre histoire</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Tout a commencé par une passion pour le design et la création. Après plusieurs années en freelance, j'ai fondé ASSK Studio pour offrir un service complet alliant <span className="text-white">graphisme</span>, <span className="text-white">développement web</span> et <span className="text-white">modélisation 3D</span>.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Basé en Auvergne (Clermont-Ferrand, Vichy, Moulins), je travaille avec des clients dans toute la France. Mon approche ? Une relation de proximité, des échanges réguliers et un accompagnement personnalisé à chaque étape.
              </p>
              <p className="text-white/50 text-base leading-relaxed">
                On travaille en famille, ce qui garantit une confiance absolue et une cohésion dans tous nos projets. Chaque client devient un partenaire avec qui on avance ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-24">
            <span className="font-mono text-sm text-white/40">(02)</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mt-2">
              Nos valeurs
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-8 bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#0047FF]/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-white/70 group-hover:text-[#0047FF]" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-24">
            <span className="font-mono text-sm text-white/40">(03)</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mt-2">
              Notre parcours
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                    <span className="font-mono text-[#0047FF] text-2xl">{item.year}</span>
                    <h3 className="font-heading text-xl font-medium mt-2 mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 bg-[#0047FF] md:-translate-x-1/2 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            Prêt à collaborer ?
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto mb-10">
            Discutons de votre projet et créons ensemble quelque chose d'unique.
          </p>
          <Link 
            to="/contact" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-heading font-medium text-base transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
