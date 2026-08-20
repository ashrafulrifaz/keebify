import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function proxy(req) {
    // custom logic here if needed later
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