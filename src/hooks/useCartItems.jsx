'use client'

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useCartItems = () => {
    const { data: session } = useSession();
    const email = session?.user.email;
    const { isPending, error, data: cartItems } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () =>
        fetch(`http://localhost:3001/cart?email=${email}`).then((res) => res.json()),
    });

    return {cartItems, isPending, error}
};

export default useCartItems;