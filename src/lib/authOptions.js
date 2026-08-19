import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {         
            username: { label: "Username", type: "text", placeholder: "your name" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const res = await fetch('http://localhost:3001/auth/signin', {
                method: "POST",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            if (!res.ok) {
                return null;
            }
            const user = await res.json()
            if(user){
                return user
            }else{
                return null
            }
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({user, account}) {
        if(account.provider === 'google' || account.provider === 'apple') {
            const res = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: account.provider,
                }),
            })
        }
        return true
    }
  }
}