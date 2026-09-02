'use client'

import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { gooeyToast } from 'goey-toast';
import { useEffect, useMemo, useState } from 'react';
import useCartItems from '@/hooks/useCartItems';
import useProducts from '@/hooks/useProducts';
import CartItems from './CartItems';
import CartOrderSummary from './CartOrderSummary';

const MIN_QTY = 1;
const MAX_QTY = 10;

const CartContainer = () => {
    const { isPending, cartItems } = useCartItems() || {}
    const { products } = useProducts() || {}
    const { data: session } = useSession()
    const queryClient = useQueryClient()
    const [removingId, setRemovingId] = useState(null)

    const initialCartProducts = useMemo(() => {
        if (!Array.isArray(products)) return []

        const quantityById = new Map()

        const collectFromDoc = (doc) => {
            if (!doc) return
            if (Array.isArray(doc.items)) {
                doc.items.forEach((it) => {
                    if (Array.isArray(it?.productIds)) {
                        it.productIds.forEach((id) => {
                            quantityById.set(id, it.quantity ?? 1)
                        })
                    } else if (it?.productId) {
                        quantityById.set(it.productId, it.quantity ?? 1)
                    }
                })
            }
            if (Array.isArray(doc.productIds)) {
                doc.productIds.forEach((id) => {
                    quantityById.set(id, doc.quantity ?? 1)
                })
            }
        }

        if (Array.isArray(cartItems)) {
            cartItems.forEach(collectFromDoc)
        } else if (cartItems && typeof cartItems === 'object') {
            collectFromDoc(cartItems)
        }

        const uniqueIds = [...quantityById.keys()]

        return uniqueIds
            .map((id) => {
                const product = products.find((p) => p?._id === id || p?.id === id)
                if (!product) return null

                return {
                    id: product._id ?? product.id,
                    name: product.name,
                    image: product.photos?.[0] ?? product.image,
                    price: Number(product.price) || 0,
                    brand: product.brand,
                    productQuantity: quantityById.get(id) ?? 1,
                }
            })
            .filter(Boolean)
    }, [cartItems, products])

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        setCartProducts(initialCartProducts)
    }, [initialCartProducts])

    const subtotal = useMemo(
        () => cartProducts.reduce((sum, it) => sum + it.price * (it.productQuantity ?? 1), 0),
        [cartProducts]
    )

    const updateQuantity = (id, next) => {
        setCartProducts((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, productQuantity: Math.min(MAX_QTY, Math.max(MIN_QTY, next)) }
                    : item
            )
        )
    }

    const increase = (item) => updateQuantity(item.id, (item.productQuantity ?? 1) + 1)
    const decrease = (item) => updateQuantity(item.id, (item.productQuantity ?? 1) - 1)

    const removeFromCart = async (item) => {
        if (!session?.user?.email) {
            window.location.href = '/signin'
            return
        }

        const snapshot = item
        setCartProducts((prev) => prev.filter((p) => p.id !== item.id))

        try {
            setRemovingId(item.id)
            const res = await fetch(
                `http://localhost:3001/cart?email=${encodeURIComponent(session.user.email)}`,
                {
                    method: 'DELETE',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: session.user.email,
                        productId: item.id,
                    }),
                }
            )

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.message || 'Delete failed')
            }

            await queryClient.invalidateQueries({ queryKey: ['cartItems'] })
            gooeyToast.success('Removed from cart', {
                description: `${snapshot.name} has been removed from your cart.`,
            })
        } catch (err) {
            console.error('Remove from cart error:', err)
            setCartProducts((prev) => [...prev, snapshot].sort((a, b) => 0))
            gooeyToast.error('Failed to remove from cart', {
                description: 'Please try again later.',
            })
        } finally {
            setRemovingId(null)
        }
    }

    return (
        <div className="grid grid-cols-3 gap-5">
            <CartItems
                cartProducts={cartProducts}
                isPending={isPending}
                removingId={removingId}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={removeFromCart}
            />
            <CartOrderSummary subtotal={subtotal} itemCount={cartProducts.length} />
        </div>
    );
};

export default CartContainer;