import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Initial Response Setup
  // We need to pass the request headers to maintain the chain
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  // 2. Create Supabase Client (SSR)
  // This handles the new "base64" chunked cookie format correctly
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update request cookies for downstream
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });

          // Re-create response to include the updated cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          // Set cookies on response
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 3. Secure Auth Check
  // supabase.auth.getUser() validates the token on the server side (secure)
  // It also automatically refreshes the session if needed (via cookie setAll)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 4. Stripe Webhooks: Pass through immediately
  if (pathname.startsWith('/api/stripe')) {
    return response;
  }

  // 5. Coming Soon Gate (Cookie Check)
  const isComingSoonPage = pathname === '/coming-soon';
  const previewCookie = request.cookies.get('vetogo_preview_auth');

  // If not on coming-soon page AND no valid cookie AND not in dev mode -> Redirect
  if (process.env.NODE_ENV !== 'development' && !isComingSoonPage && previewCookie?.value !== '1') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/coming-soon';

    if (pathname !== '/') {
      redirectUrl.searchParams.set('from', pathname);
    }

    return NextResponse.redirect(redirectUrl);
  }

  // 6. Protected Routes (require login)
  const protectedRoutes = ['/mon-compte', '/dashboard'];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 7. Auth Routes (redirect if already logged in)
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/'; // or /mon-compte
    return NextResponse.redirect(redirectUrl);
  }

  return response;
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
