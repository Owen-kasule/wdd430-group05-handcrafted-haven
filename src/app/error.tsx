'use client';

import { useEffect } from 'react';
import { logError } from '@/utils/performance';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for monitoring
    logError(error, 'Global Error Boundary');
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Oops! Something went wrong</h1>
        <p className="error-message">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-details">
            <summary>Error Details (Development)</summary>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
          </details>
        )}
        <div className="error-actions">
          <button onClick={reset} className="retry-button">
            Try Again
          </button>
          <button onClick={() => window.location.href = '/'} className="home-button">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
