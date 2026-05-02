import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we use localStorage for tokens, we can't easily check it in Next.js middleware (which runs on the server).
  // In a real production app with SSR, you'd use HttpOnly cookies.
  // For now, we'll rely on client-side protection or just the API's own protection.
  
  // However, we can check for a 'token' cookie if we were using cookies.
  // Given the current setup, client-side protection is more straightforward for this specific architecture.
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
