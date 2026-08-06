'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

const queryClient = new QueryClient()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const authInfo = {
        user,
        loading
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </QueryClientProvider>
    )
};

export default AuthProvider;