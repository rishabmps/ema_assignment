// Optimized animation configurations to reduce bundle size and improve performance
export const ANIMATION_CONFIGS = {
  // Common fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.3 }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3 }
  },
  
  // Stagger animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }
} as const;

// Optimized hover animations
export const HOVER_ANIMATIONS = {
  lift: {
    whileHover: { scale: 1.05, y: -5 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },
  
  scale: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { duration: 0.2 }
  },
  
  rotate: {
    whileHover: { rotate: 5 },
    transition: { duration: 0.2 }
  }
} as const;

// Optimized loading animations
export const LOADING_ANIMATIONS = {
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  spin: {
    animate: { rotate: 360 },
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: "linear"
    }
  },
  
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { 
      duration: 1, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
} as const;
