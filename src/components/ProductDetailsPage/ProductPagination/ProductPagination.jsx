'use client'
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import React from 'react';

const ProductPagination = ({slug}) => {
    const {products} = useProducts()
    const singleProduct = products?.find(item => item._id === slug)
    const {_id, name} = singleProduct || {}

    return (
        <div className='flex items-center gap-1'>
            <Link href={'/products/keyboard'} className='capitalize text-[#414141] text-sm font-medium'>keyboard</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"></path>
            </svg>
            <Link href={'/keyboard/aula'} className='capitalize text-[#414141] text-sm font-medium'>Aula</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"></path>
            </svg>
            <span className='capitalize text-[#696969] text-sm font-medium'>{name}</span>
        </div>
    );
};

export default ProductPagination;