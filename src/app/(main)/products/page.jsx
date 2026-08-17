import ProductCategories from '@/components/ProductPage/Categories/ProductCategories';
import SearchProducts from '@/components/ProductPage/Search/SearchProducts';
import React from 'react';

const page = () => {
    return (
        <div className='px-12 py-6'>
            <div className="grid grid-cols-2 gap-5 justify-between">
                <ProductCategories />
                <div className="flex justify-end">
                    <SearchProducts />
                </div>
            </div>
        </div>
    );
};

export default page;