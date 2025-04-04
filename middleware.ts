import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Cookie'den token alz
  console.log("Middleware token:", token);  // Token'ı burada loglayarak kontrol edin.
  console.log("request ", request);  // Token'ı burada loglayarak kontrol edin.

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url)); // Token yoksa login sayfasına yönlendir
  }

  // İsteğe bağlı olarak, burada token doğrulama logic'i ekleyebilirsiniz.
  // Token doğrulamak için bir API'ye request yapabilirsiniz.
  
  return NextResponse.next(); // Token varsa devam et
}

// Middleware'in çalışacağı yolları belirt
export const config = {
  matcher: ['/dashboard/:path*'],
};