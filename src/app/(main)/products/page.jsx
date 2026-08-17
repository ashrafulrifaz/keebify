import ProductCategories from '@/components/ProductPage/Categories/ProductCategories';
import PriceRange from '@/components/ProductPage/Filtering/PriceRange/PriceRange';
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

            <div className="grid grid-cols-4 gap-5 mt-7">
                <div className="space-y-3">
                    <PriceRange />
                </div>
                <div className="col-span-3"></div>
            </div>
        </div>
    );
};

export default page;