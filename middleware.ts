import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "SECRET_KEY"; // .env dosyasından almak daha güvenli olur

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('Token:', token);
  // Token yoksa signin'e yönlendir
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Token doğrulama (opsiyonel ama önerilir)
  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    // Token geçersiz veya süresi dolmuşsa yönlendir
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// ✔️ DİKKAT: matcher'daki yazım hatasını düzelt
export const config = {
  matcher: ['/dashboard/:path*'], // ✅ doğru: dashboadrd değil, dashboard
};
