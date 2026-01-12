import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // 1. Stripe Webhooks: Pass through immediately
  if (pathname.startsWith('/api/stripe')) {
    return res;
  }

  // 2. Coming Soon Gate (Cookie Check)
  // Allow: /coming-soon, /api/stripe, static files
  const isComingSoonPage = pathname === '/coming-soon';
  const previewCookie = req.cookies.get('vetogo_preview_auth');

  // If not on coming-soon page AND no valid cookie AND not in dev mode -> Redirect to /coming-soon
  if (process.env.NODE_ENV !== 'development' && !isComingSoonPage && previewCookie?.value !== '1') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/coming-soon';

    // Preserve original destination to redirect back after login
    // BUT avoid redirect loops if the user was already going to /coming-soon implies logic above handles it
    if (pathname !== '/') {
      redirectUrl.searchParams.set('from', pathname);
    }

    return NextResponse.redirect(redirectUrl);
  }

  // 3. Protected Routes (require login)
  const protectedRoutes = ['/mon-compte', '/dashboard'];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Auth Routes (redirect to account if already logged in)
  // Optional: prevent logged-in users from seeing /login or /signup
  if (session && (pathname === '/login' || pathname === '/signup')) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/'; // or /mon-compte
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
