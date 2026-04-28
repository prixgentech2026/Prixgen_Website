import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for staging protection and basic auth.
 */
export function middleware(req: NextRequest) {
  // Staging protection
  // DECISION: We check for VERCEL_ENV not being 'production' to apply basic auth.
  if (process.env.VERCEL_ENV !== 'production' && process.env.STAGING_PASSWORD) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (user === 'admin' && pwd === process.env.STAGING_PASSWORD) {
        return NextResponse.next();
      }
    }
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
