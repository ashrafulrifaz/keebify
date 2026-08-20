import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/signin',
  },
});

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};