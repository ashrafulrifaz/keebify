'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const CartOrderSummary = () => {
    const router = useRouter()

    const handleOrder = async () => {
        router.push('/checkout')
    }

    return (
        <div>
            <h3 className='capitalize text-lg font-medium'>my cart</h3>
            <div className='mt-3 rounded-xl bg-border/50 p-4'>
                <h3 className='capitalize font-medium'>Coupon code</h3>
                <div className='border border-[#c4c4c4]/50 bg-border/75 flex gap-2 rounded-xl mt-2 p-1'>
                    <input type="text" placeholder='0000' className='text-sm flex-1 focus:outline-0 py-1 px-1' />
                    <button className='capitalize text-sm bg-[#dbdbdb] rounded-lg px-2 cursor-pointer font-medium text-[#414141]'>Apply</button>
                </div>
                <div className='mt-8'>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>total</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>discount</span>
                        <span className='font-medium'>${0}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>additional fee</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>shipping</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                    <div className='w-full h-[1.5px] bg-border mt-4 mb-5'></div>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>subtotal</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                </div>
                <button onClick={() => handleOrder()} className='font-medium capitalize w-full bg-primary text-white mt-7 rounded-2xl py-3 cursor-pointer'>proceed to checkout</button>
            </div>
        </div>
    );
};

export default CartOrderSummary;