'use client'
import useProducts from '@/hooks/useProducts';
import { gooeyToast } from 'goey-toast';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

const ProductDetails = ({slug, min = 1, max = 10}) => {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [addedIds, setAddedIds] = useState([]);
    const {products} = useProducts()
    const singleProduct = products?.find(item => item._id === slug)
    const {_id, name, reviews, price, colors, shortDescription, stock} = singleProduct || {}
    const { data: session } = useSession();
 
    const updateQuantity = (value) => {
        const clamped = Math.min(max, Math.max(min, value));
        setQuantity(clamped);
        onChange?.(clamped);
    };

    const addToCart = async () => {

        if (!session?.user?.email) {
            window.location.href = '/signin';
            return;
        }

        try {
            setAdding(true);
            const res = await fetch(`http://localhost:3001/cart?email=${session.user.email}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    item: [
                        {productIds: [_id], productQuantity: quantity}
                    ]
                }),
            });
            console.log(res)
            if (res.ok) {
                setAddedIds((prev) => [...prev, _id]);
                gooeyToast.success('Added to cart');
            } else {
                const err = await res.json().catch(() => ({}));
                if (res.status === 409) {
                    gooeyToast.warning('Already in cart', { description: err.message })
                } else {
                    gooeyToast.error('Failed to add to cart', {
                        description: 'Please try again later.',
                    });
                }
            }
        } catch (err) {
            console.error('Add to cart error:', err);
        } finally {
            setAdding(false);
        }
    }

    return (
        <div className='mt-4 grid grid-cols-2 gap-7'>
            <div>
                <Image src={singleProduct?.photos[0]} alt={name || 'product image'} width={500} height={400} className='w-full h-auto border' />
            </div>
            <div>
                <h2 className='text-3xl font-medium leading-snug'>{name}</h2>
                <p className='text-[#696969] mt-6'>{shortDescription}</p>
                <div className='flex items-center gap-3 mt-3'>
                    <div className='flex gap-1 items-center'>
                        <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1788007169/star_qzgabx.png'} alt='stars' width={40} height={40} className='w-4 h-4' />
                        <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1788007169/star_qzgabx.png'} alt='stars' width={40} height={40} className='w-4 h-4' />
                        <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1788007169/star_qzgabx.png'} alt='stars' width={40} height={40} className='w-4 h-4' />
                        <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1788007169/star_qzgabx.png'} alt='stars' width={40} height={40} className='w-4 h-4' />
                        <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1788007169/star_qzgabx.png'} alt='stars' width={40} height={40} className='w-4 h-4' />
                    </div>
                    <span className='text-sm text-[#696969] font-medium'>{reviews} Review</span>
                </div>
                <h4 className='text-2xl font-semibold mt-5'>${price}</h4>
                <h3 className='text-lg font-medium mt-5'>Colors</h3>
                <div className="flex items-center gap-1 mt-3">
                    {colors?.map((item, idx) => (
                        <div
                            key={idx}
                            style={{ backgroundColor: item }}
                            className={`w-4 h-4 rounded-full border border-black/10`}
                            title={item.name}
                        />
                    ))}
                </div>
                <p className='text-[#696969] mt-6 font-medium'>Only {stock} products left</p>
                <div className="inline-flex items-center gap-1 border border-border bg-secondary rounded-2xl p-1 mt-5">
                    <button
                        type="button"
                        onClick={() => updateQuantity(quantity - 1)}
                        disabled={quantity <= min}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer hover:bg-[#fafafa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
        
                    <span className="w-6 text-center text-[15px] font-medium text-[#1a1a1a]">
                        {quantity}
                    </span>
        
                    <button
                        type="button"
                        onClick={() => updateQuantity(quantity + 1)}
                        disabled={quantity >= max}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer hover:bg-[#fafafa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
                <div className='mt-8 flex items-center gap-5'>
                    <button className='bg-primary text-white w-60 py-3 capitalize font-medium rounded-xl cursor-pointer'>buy now</button>
                    <button type="button" onClick={addToCart} className='bg-secondary p-3 border border-border rounded-xl cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.1765 12.5113C19.8261 9.50898 19.3142 7.25784 18.8394 5.65851C18.4501 4.34711 18.2554 3.69141 17.4572 3.0957C16.659 2.5 15.8431 2.5 14.2113 2.5H8.78876C7.15697 2.5 6.34107 2.5 5.54283 3.0957C4.74459 3.69141 4.54994 4.34711 4.16063 5.65851C3.68586 7.25784 3.1739 9.50898 2.82352 12.5113C2.41058 16.0497 2.20411 17.8189 3.39731 19.1594C4.59052 20.5 6.52422 20.5 10.3916 20.5H12.6084"></path>
                            <path d="M8.5 6.5C8.5 8.15685 9.84315 9.5 11.5 9.5C13.1569 9.5 14.5 8.15685 14.5 6.5"></path>
                            <path d="M15.5 18.5H21.5M18.5 21.5V15.5"></path>
                        </svg>
                    </button>
                </div>
                <div className='flex items-center gap-3 mt-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5">
                        <path d="M19.5 17.5C19.5 18.8807 18.3807 20 17 20C15.6193 20 14.5 18.8807 14.5 17.5C14.5 16.1193 15.6193 15 17 15C18.3807 15 19.5 16.1193 19.5 17.5Z"></path>
                        <path d="M9.5 17.5C9.5 18.8807 8.38071 20 7 20C5.61929 20 4.5 18.8807 4.5 17.5C4.5 16.1193 5.61929 15 7 15C8.38071 15 9.5 16.1193 9.5 17.5Z"></path>
                        <path d="M14.5 17.5H9.5M19.5 17.5H20.2632C20.4831 17.5 20.5931 17.5 20.6855 17.4885C21.3669 17.4036 21.9036 16.8669 21.9885 16.1855C22 16.0931 22 15.9831 22 15.7632V13C22 9.41015 19.0899 6.5 15.5 6.5M15 15.5V7C15 5.58579 15 4.87868 14.5607 4.43934C14.1213 4 13.4142 4 12 4H5C3.58579 4 2.87868 4 2.43934 4.43934C2 4.87868 2 5.58579 2 7V15C2 15.9346 2 16.4019 2.20096 16.75C2.33261 16.978 2.52197 17.1674 2.75 17.299C3.09808 17.5 3.56538 17.5 4.5 17.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className='text-[#414141]'>Free delivery on order over $200</span>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;