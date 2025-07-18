// Performance monitoring and error tracking
export interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }
};

export const logError = (error: Error, context?: string) => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  // In production, send to monitoring service
  // Example: Sentry.captureException(error, { extra: { context } });
};
