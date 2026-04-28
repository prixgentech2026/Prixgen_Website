import Link from 'next/link';

/**
 * 404 Not Found component.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-prixgen-blue/10 absolute -z-10">404</h1>
      <h2 className="text-4xl font-bold mb-4 text-prixgen-blue">Page Not Found</h2>
      <p className="text-lg text-prixgen-dark/70 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="bg-prixgen-blue text-white px-8 py-4 rounded-md font-semibold hover:bg-prixgen-blue/90 transition-all shadow-md hover:shadow-lg"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
