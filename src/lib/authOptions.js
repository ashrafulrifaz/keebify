import CredentialsProvider from "next-auth/providers/credentials"

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
    })
  ],
}