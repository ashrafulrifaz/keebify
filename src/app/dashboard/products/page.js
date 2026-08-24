import ProductsTable from '@/components/DashboardComp/ProductsTable/ProductsTable';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className='px-6 py-4'>
            <div className='flex justify-between gap-3'>
                <div>
                    <h2 className='capitalize text-2xl font-medium'>products</h2>
                    <p className='text-[#414141] mt-2'>manage your product inventory</p>
                </div>
                <div className='flex flex-col justify-end'>
                    <Link href={'/dashboard/add-product'} className='px-3 py-2 text-sm bg-primary text-white rounded-full capitalize font-medium flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11.9922 4.00012V20.0001M19.9922 12.0001H3.99222"></path>
                        </svg>
                        <span>add new</span>
                    </Link>
                </div>
            </div>
            <ProductsTable />
        </div>
    );
};

export default page;