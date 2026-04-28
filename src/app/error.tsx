'use client';

import React, { useEffect } from 'react';

/**
 * Error boundary component.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4 text-prixgen-blue">Something went wrong!</h2>
      <p className="text-prixgen-dark/70 mb-8 max-w-md">
        We apologize for the inconvenience. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="bg-prixgen-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-prixgen-blue/90 transition-colors shadow-lg"
      >
        Try again
      </button>
    </div>
  );
}
