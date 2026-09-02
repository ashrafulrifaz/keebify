'use client'

import Image from "next/image";

const MIN_QTY = 1;
const MAX_QTY = 10;

const CartItems = ({
    cartProducts = [],
    isPending = false,
    removingId = null,
    onIncrease,
    onDecrease,
    onRemove,
}) => {
    return (
        <div className='col-span-2'>
            <h3 className='capitalize text-lg font-medium'>my cart</h3>
            <div className='mt-3 divide-y divide-border rounded-xl bg-border/50 py-4 px-5'>
                {isPending ? (
                    <div className="flex items-center justify-center py-5">
                        <iframe src="https://lottie.host/embed/94bb6a42-b12e-4a8b-8bd1-0af0390a672a/Hu4o03fLLF.json" width={500} height={400}></iframe>
                    </div>
                ) : cartProducts.length === 0 ? (
                    <p className="text-center text-[#696969] py-6">No product found</p>
                ) : (
                    cartProducts.map((item) => (
                        <div key={item.id} className="flex items-center gap-5 py-3">
                            <div className="w-5 h-5 rounded-md border-[1.5px] border-primary/30 shrink-0" />

                            <div className="w-20 h-20 rounded-2xl bg-border flex items-center justify-center overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-auto" />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-lg font-medium truncate">{item.name}</h4>
                                <p className="text-[#696969] text-[15px]">{item.brand}</p>
                            </div>

                            <div className="text-lg font-medium text-[#1a1a1a] whitespace-nowrap">
                                ${item.price.toFixed(2)}
                            </div>

                            <div className="inline-flex items-center gap-1 border-[1.5px] border-border bg-secondary rounded-2xl p-1 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => onDecrease && onDecrease(item)}
                                    disabled={item.productQuantity <= MIN_QTY}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    -
                                </button>
                                <span className="w-6 text-center text-[15px] font-medium text-[#1a1a1a]">
                                    {item.productQuantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onIncrease && onIncrease(item)}
                                    disabled={item.productQuantity >= MAX_QTY}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => onRemove && onRemove(item)}
                                disabled={removingId === item.id}
                                className="w-9 h-9 flex items-center justify-center rounded-2xl bg-border shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CartItems;