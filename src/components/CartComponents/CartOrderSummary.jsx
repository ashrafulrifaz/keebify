'use client'
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { gooeyToast } from 'goey-toast';

const SHIPPING_FEE = 10;
const ADDITIONAL_FEE = 0;
const COUPONS = {
    KEB10: { type: 'percent', value: 10 },
};

const CartOrderSummary = ({ subtotal = 0, itemCount = 0 }) => {
    const router = useRouter()
    const [couponInput, setCouponInput] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState(null)

    const discount = useMemo(() => {
        if (!appliedCoupon) return 0
        const c = COUPONS[appliedCoupon]
        if (!c) return 0
        if (c.type === 'percent') return (subtotal * c.value) / 100
        if (c.type === 'fixed') return c.value
        return 0
    }, [appliedCoupon, subtotal])

    const handleApplyCoupon = () => {
        const code = couponInput.trim().toUpperCase()
        if (!code) return
        if (COUPONS[code]) {
            setAppliedCoupon(code)
            gooeyToast.success('Coupon applied', { description: `${code} discount has been applied.` })
        } else {
            setAppliedCoupon(null)
            gooeyToast.error('Invalid coupon', { description: 'This coupon code is not valid.' })
        }
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponInput('')
    }

    const handleOrder = async () => {
        if (itemCount === 0) return
        router.push('/checkout')
    }

    const total = subtotal + SHIPPING_FEE + ADDITIONAL_FEE - discount

    return (
        <div>
            <h3 className='capitalize text-lg font-medium'>order summary</h3>
            <div className='mt-3 rounded-xl bg-border/50 p-4'>
                <h3 className='capitalize font-medium'>Coupon code</h3>
                <div className='border border-[#c4c4c4]/50 bg-border/75 flex gap-2 rounded-xl mt-2 p-1'>
                    <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder='0000'
                        className='text-sm flex-1 focus:outline-0 py-1 px-1'
                    />
                    {appliedCoupon ? (
                        <button
                            onClick={handleRemoveCoupon}
                            className='capitalize text-sm bg-[#dbdbdb] rounded-lg px-2 cursor-pointer font-medium text-[#414141]'
                        >
                            Remove
                        </button>
                    ) : (
                        <button
                            onClick={handleApplyCoupon}
                            className='capitalize text-sm bg-[#dbdbdb] rounded-lg px-2 cursor-pointer font-medium text-[#414141]'
                        >
                            Apply
                        </button>
                    )}
                </div>
                {appliedCoupon && (
                    <p className='mt-2 text-xs text-[#696969]'>
                        Applied: <span className='font-medium text-primary'>{appliedCoupon}</span>
                    </p>
                )}
                <div className='mt-8'>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>total ({itemCount} item{itemCount === 1 ? '' : 's'})</span>
                        <span className='font-medium'>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>discount</span>
                        <span className='font-medium'>-${discount.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>additional fee</span>
                        <span className='font-medium'>${ADDITIONAL_FEE.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>shipping</span>
                        <span className='font-medium'>${SHIPPING_FEE.toFixed(2)}</span>
                    </div>
                    <div className='w-full h-[1.5px] bg-border mt-4 mb-5'></div>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>subtotal</span>
                        <span className='font-medium'>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={handleOrder}
                    disabled={itemCount === 0}
                    className='font-medium capitalize w-full bg-primary text-white mt-7 rounded-2xl py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    proceed to checkout
                </button>
            </div>
        </div>
    );
};

export default CartOrderSummary;