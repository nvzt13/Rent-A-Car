// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') || request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url)); // Token yoksa login sayfasına yönlendir
  }

  // Token var, bu noktada doğrulama API'sine yönlendirme yapabiliriz
  return NextResponse.next();
}

// Middleware'in çalışacağı yolları belirt
export const config = {
  matcher: ['/dashboard/:path*'],
};
