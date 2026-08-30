import React from 'react';

const CheckoutSummary = () => {
    return (
        <div>
            <h3 className='capitalize text-lg font-medium'>order summary</h3>
            <div className='mt-3 rounded-xl bg-border/50 p-4'>
                <div>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>total</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <span className='capitalize text-[#5e5e5e]'>shipping</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                    <div className='w-full h-[1.5px] bg-border my-4'></div>
                    <div className='flex items-center justify-between'>
                        <span className='capitalize text-[#5e5e5e]'>subtotal</span>
                        <span className='font-medium'>${85}</span>
                    </div>
                </div>
                <button className='font-medium capitalize w-full bg-primary text-white mt-7 rounded-2xl py-3 cursor-pointer'>place order</button>
            </div>
        </div>
    );
};

export default CheckoutSummary;