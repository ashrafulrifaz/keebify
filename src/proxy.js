import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    console.log('TOKEN:', token);

    if(path.startsWith('/dashboard') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};