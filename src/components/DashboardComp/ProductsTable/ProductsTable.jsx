'use client'
import React, { useState } from 'react';
import CategoryDropdown from './CategoryDropDown';
import Table from './Table';
import useProducts from '@/hooks/useProducts';
import StatusDropdown from './StatusDropDown';

const ProductsTable = () => {
    const { isPending, products } = useProducts();
    const [selected, setSelected] = useState(null);
    const [statusSelected, setStatusSelected] = useState(null)
    console.log(statusSelected)

    const filteredProducts = products?.filter((product) => (selected ? product.category === selected : true)).filter((product) => (statusSelected !== null ? product.status === statusSelected : true));

    return (
        <div className='mt-5 bg-border/50 rounded-xl px-4 py-5'>
            {
                isPending ? (
                    <div className="flex items-center justify-center py-5">
                        <iframe src="https://lottie.host/embed/94bb6a42-b12e-4a8b-8bd1-0af0390a672a/Hu4o03fLLF.json" width={500} height={400}></iframe>
                    </div>
                ) : (
                    <div>
                        <div className='flex items-center justify-between'>
                            <div className='border border-[#c4c4c4]/40 bg-border/75 flex gap-2 rounded-full py-1.5 px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 17L21 21"></path>
                                    <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"></path>
                                </svg>
                                <input type="text" placeholder='Search products' className='text-[15px] focus:outline-0' />
                            </div>
                            <div className='flex gap-3'>
                                <StatusDropdown statusSelected={statusSelected} setStatusSelected={setStatusSelected} />
                                <CategoryDropdown selected={selected} setSelected={setSelected} />
                            </div>
                        </div>

                        <Table products={filteredProducts} />
                    </div>
                )
            }
        </div>
    );
};

export default ProductsTable;