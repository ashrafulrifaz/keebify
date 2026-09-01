import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch('http://localhost:3001/auth/signin', {
                        method: "POST",
                        headers: { "content-type": 'application/json' },
                        body: JSON.stringify(credentials),
                    });

                    const body = await res.clone().json().catch(() => null);

                    if (!res.ok) return null;

                    const user = await res.json();
                    console.log('User from authorize:', user);
                    return user || null;
                } catch (err) {
                    console.error('Authorize error:', err);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const res = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: 'google',
                }),
                });
                const dbUser = await res.json();
                user.role = dbUser.role || 'user';
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
                session.user.email = token.email;
            }
            return session;
        },
    },
};