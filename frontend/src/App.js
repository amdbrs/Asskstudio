import "@/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";

// Pages
import HomePage from "@/pages/HomePage";
import PortfolioPage from "@/pages/PortfolioPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import AboutPage from "@/pages/AboutPage";
import GraphismePage from "@/pages/GraphismePage";
import SiteWebPage from "@/pages/SiteWebPage";
import Modelisation3DPage from "@/pages/Modelisation3DPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFoundPage from "@/pages/NotFoundPage";

// Components
import { Preloader } from "@/components/Preloader";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FloatingQuoteButton } from "@/components/FloatingQuoteButton";
import { DotCursor } from "@/components/DotCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Context
import { AuthProvider } from "@/context/AuthContext";

// Blue curtain transition component - optimized for fluidity
const BlueCurtain = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`curtain-${location.pathname}`}
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      >
        {/* First curtain - slides down */}
        <motion.div
          className="absolute inset-0 bg-[#0047FF] origin-top"
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: [0, 1, 1, 0],
            originY: [0, 0, 1, 1],
          }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.6, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* ASSK Logo in center during transition */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.9, 1, 1, 0.95],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 0.7, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <span className="font-anton text-4xl md:text-6xl text-white tracking-wider">
              ASSK
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Page content animation - faster and smoother
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Animated Routes wrapper with curtain transitions
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <BlueCurtain />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/realisations" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/graphisme" element={<GraphismePage />} />
            <Route path="/sites-web" element={<SiteWebPage />} />
            <Route path="/modelisation-3d" element={<Modelisation3DPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Check if preloader was already shown this session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('assk_loaded');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('assk_loaded', 'true');
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <DotCursor />
      <GrainOverlay />
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
          <FloatingQuoteButton />
          <WhatsAppButton />
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
