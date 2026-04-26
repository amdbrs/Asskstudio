import "@/App.css";
import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "@studio-freight/lenis";

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

// Context
import { AuthProvider } from "@/context/AuthContext";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.3, 1],
    },
  },
};

// Lenis smooth scroll provider
function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}

// Animated Routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

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
  return (
    <HelmetProvider>
      <SmoothScrollProvider>
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        
        <AuthProvider>
          <BrowserRouter>
            <AnimatedRoutes />
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: {
                  background: '#171717',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                }
              }}
            />
          </BrowserRouter>
        </AuthProvider>
      </SmoothScrollProvider>
    </HelmetProvider>
  );
}

export default App;
