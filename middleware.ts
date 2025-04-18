// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Eğer token varsa ve /signin sayfasına gidiyorsa, dashboard'a yönlendir
  if (token && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// middleware’in çalışacağı yollar
export const config = {
  matcher: ['/signin'], // sadece signin sayfasında çalışsın
};
