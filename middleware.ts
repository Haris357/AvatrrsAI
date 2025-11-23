import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }

  // Handle public profile routes
  const pathname = request.nextUrl.pathname;
  const isPublicProfile = pathname.match(/^\/[a-z0-9]{3,20}$/);
  
  if (isPublicProfile) {
    // Rewrite to the dynamic route
    const username = pathname.slice(1);
    return NextResponse.rewrite(new URL(`/${username}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};