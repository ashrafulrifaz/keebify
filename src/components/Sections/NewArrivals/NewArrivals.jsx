'use client'
import React from 'react';
import ProductCard from '../../MiniComp/ProductCard';
import useProducts from '@/hooks/useProducts';

const NewArrivals = () => {
    const {products} = useProducts()

    return (
        <div className='py-10'>
            <h3 className='capitalize text-center text-xl font-medium'>new arrivals</h3>
            <div className="grid grid-cols-4 gap-5 mt-8">
                {
                    products?.slice(0, 4).map((item, idx) => (
                        <ProductCard key={idx} item={item} />
                    ))
                }
            </div>
            <div className='mt-14'>
                <button className='bg-[#f8f8f8] text-black border border-[#eaeaea] pl-3.5 p-1 capitalize font-medium rounded-xl flex items-center gap-3 cursor-pointer mx-auto'>
                    <span>See More collections</span>
                    <div className='bg-primary text-white rounded-lg p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 18.502V5.00195"></path>
                            <path d="M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NewArrivals;