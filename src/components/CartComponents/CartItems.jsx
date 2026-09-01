'use client'

import useCartItems from "@/hooks/useCartItems";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import { useMemo } from "react";

const MIN_QTY = 1;
const MAX_QTY = 10;

const CartItems = () => {
    const {isPending, cartItems} = useCartItems() || {}
    const {products} = useProducts() || {}

    const cartProducts = useMemo(() => {
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
                    price: product.price,
                    brand: product.brand,
                    productQuantity: quantityById.get(id) ?? 1,
                }
            })
            .filter(Boolean)
    }, [cartItems, products])

    return (
        <div className='col-span-2'>
            <h3 className='capitalize text-lg font-medium'>my cart</h3>
                <div className='mt-3 divide-y divide-border rounded-xl bg-border/50 py-4 px-5'>
                {
                    isPending ? (
                        <div className="flex items-center justify-center py-5">
                            <iframe src="https://lottie.host/embed/94bb6a42-b12e-4a8b-8bd1-0af0390a672a/Hu4o03fLLF.json" width={500} height={400}></iframe>
                        </div>
                    ) 
                    : 
                    cartProducts.map((item) => (
                        <div key={item.id} className="flex items-center gap-5 py-3">
                            <div className="w-5 h-5 rounded-md border-[1.5px] border-primary/30 shrink-0" />

                            <div className="w-20 h-20 rounded-2xl bg-border flex items-center justify-center overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} width={80} height={80} className=" w-full h-auto" />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-lg font-medium truncate">{item.name}</h4>
                                <p className="text-[#696969] text-[15px]">{item.brand}</p>
                            </div>

                            <div className="text-lg font-medium text-[#1a1a1a] whitespace-nowrap">
                                ${item.price}
                            </div>

                            <div className="inline-flex items-center gap-1 border-[1.5px] border-border bg-secondary rounded-2xl p-1 shrink-0">
                                <button type="button" className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer">
                                    -
                                </button>
                                <span className="w-6 text-center text-[15px] font-medium text-[#1a1a1a]">
                                    {item.productQuantity}
                                </span>
                                <button type="button" className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer">
                                    +
                                </button>
                            </div>

                            <button type="button" className="w-9 h-9 flex items-center justify-center rounded-2xl bg-border shrink-0 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default CartItems;