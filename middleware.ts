import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname === '/signin') {
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/dashboard', req.url)); // Token geçerliyse admin'e gönder
      } catch {
        return NextResponse.next(); // Token geçersizse signin'e erişmesine izin ver
      }
    }
    return NextResponse.next(); // Token yoksa signin'e erişmesine izin ver
  }

  // /admin ve alt rotalar için token kontrolü
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error('Token doğrulama hatası:', err);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// 🧭 Middleware çalışacak rotalar
export const config = {
  matcher: ['/dashboard/:path*', '/dashboard/:path*', '/signin'],
};