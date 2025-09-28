// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Animation performance settings
  animations: {
    // Reduce motion for users who prefer it
    respectReducedMotion: true,
    // Use transform3d for hardware acceleration
    useHardwareAcceleration: true,
    // Limit concurrent animations
    maxConcurrentAnimations: 5
  },
  
  // Image optimization
  images: {
    // Lazy load images by default
    lazyLoad: true,
    // Use WebP format when supported
    useWebP: true,
    // Optimize image sizes
    responsiveSizes: [320, 640, 768, 1024, 1280, 1536]
  },
  
  // Bundle optimization
  bundle: {
    // Enable code splitting
    enableCodeSplitting: true,
    // Lazy load heavy components
    lazyLoadComponents: true,
    // Use dynamic imports for large libraries
    useDynamicImports: true
  },
  
  // Memory management
  memory: {
    // Cleanup intervals and timeouts
    cleanupTimers: true,
    // Limit object creation in render loops
    minimizeObjectCreation: true,
    // Use object pooling for frequently created objects
    useObjectPooling: false // Disabled for React components
  }
} as const;

// Performance monitoring utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName: string, fn: () => void) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now();
      fn();
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    } else {
      fn();
    }
  },
  
  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  
  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
};
