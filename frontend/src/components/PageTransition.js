import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Slide up transition (alternative)
const slideUpVariants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Curtain/overlay transition
const curtainVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0 },
  exit: { scaleY: 1 },
};

export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="page-transition-wrapper"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Premium curtain transition effect
export const CurtainTransition = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {/* Blue curtain overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${location.pathname}`}
          className="fixed inset-0 bg-[#0047FF] origin-top z-[9999] pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ 
            scaleY: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          }}
          exit={{ 
            scaleY: 1,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }}
        />
      </AnimatePresence>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.4, delay: 0.3 }
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.2 }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// Smooth fade with slight zoom
export const SmoothPageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ 
          opacity: 1, 
          filter: 'blur(0px)',
          transition: { 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }
        }}
        exit={{ 
          opacity: 0, 
          filter: 'blur(5px)',
          transition: { 
            duration: 0.3, 
            ease: [0.22, 1, 0.36, 1] 
          }
        }}
        className="page-transition-wrapper"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;
