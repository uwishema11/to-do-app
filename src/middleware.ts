import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (!token && pathname !== '/login' && pathname.startsWith('/todos')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/todos', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/todos/:path*', '/login'],
};
