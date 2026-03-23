import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware for demonstration.
// In a real app, it would verify a JWT or session cookie.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // For demo purposes, we'll assume a 'National Admin' is logged in if no user is found.
    // In production, this would redirect to /login if no valid session exists.
    const userRole = 'National Admin'; // Mock role
    
    // Example: Only National/State/District Admins can see Audit Logs
    if (pathname.includes('/audit-logs')) {
      const allowedRoles = ['National Admin', 'State Admin', 'District Admin'];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
