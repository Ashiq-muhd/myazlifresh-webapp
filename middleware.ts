// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = [
  '/checkout',
  '/orders',
  '/account',
  '/cart',
];

function hasAuth(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value || null;
  const apiKey = req.cookies.get('apiKey')?.value || null;
  if (authToken || apiKey) return true;
  // Fallback: parse raw header in case cookie map not populated yet
  const raw = req.headers.get('cookie') || '';
  if (/authToken=/.test(raw) || /apiKey=/.test(raw)) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const needsAuth = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!needsAuth) return NextResponse.next();

  const authenticated = hasAuth(req);
  if (authenticated) return NextResponse.next();

  // Prevent redirect loop if already on home
  const url = req.nextUrl.clone();
  url.pathname = '/';
  // Normalize protected path (remove trailing slash)
  const cleanPath = pathname.replace(/\/$/, '');
  url.searchParams.set('login', '1');
  url.searchParams.set('next', cleanPath || '/');
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/account/:path*', '/cart/:path*'],
};
