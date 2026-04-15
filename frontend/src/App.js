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
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FloatingQuoteButton } from "@/components/FloatingQuoteButton";

// Context
import { AuthProvider } from "@/context/AuthContext";

// Page transition variants
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animated Routes wrapper with transitions
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
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
      <CustomCursor />
      <GrainOverlay />
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
          <FloatingQuoteButton />
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
