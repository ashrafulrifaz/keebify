import EditProduct from '@/components/DashboardComp/EditProduct/EditProduct';
import Link from 'next/link';
import React from 'react';

const page = async ({params}) => {
    const {slug} = await params
    
    return (
        <div className='px-6 py-4'>
            <div className='flex items-start gap-5'>
                <div className='flex flex-col'>
                    <Link href={'/dashboard/products'} className='bg-secondary p-2 border border-border rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#414141" fill="none" stroke="#414141" stroke-idth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5.5 12.002H19"></path>
                            <path d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"></path>
                        </svg>
                    </Link>
                </div>
                <div>
                    <h2 className='capitalize text-2xl font-medium'>Edit Product</h2>
                    <p className='text-[#414141] mt-2'>Edit product data</p>
                </div>
            </div>
            <EditProduct slug={slug} />
        </div>
    );
};

export default page;