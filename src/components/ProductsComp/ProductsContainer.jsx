'use client'
import useProducts from '@/hooks/useProducts';
import React, { useMemo, useState } from 'react';
import ProductCategories from '../ProductPage/Categories/ProductCategories';
import SearchProducts from '../ProductPage/Search/SearchProducts';
import PriceRange from '../ProductPage/Filtering/PriceRange/PriceRange';
import ProductType from '../ProductPage/Filtering/ProductType/ProductType';
import ProductBrand from '../ProductPage/Filtering/ProductBrand/ProductBrand';
import ProductCard from '../MiniComp/ProductCard';

const ProductsContainer = ({}) => {
    const {products} = useProducts() || []
    const [activeCategory, setActiveCategory] = useState(1)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(400)
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        )
    }

    const toggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        )
    }

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return []

        return products.filter((item) => {
            if (activeCategory === 2 && item?.category?.toLowerCase() !== 'keyboards') return false
            if (activeCategory === 3 && item?.category?.toLowerCase() !== 'mouse') return false

            const price = Number(item?.price)
            if (!Number.isNaN(price) && (price < minPrice || price > maxPrice)) return false

            if (selectedBrands.length > 0) {
                const brand = item?.brand?.toLowerCase()
                if (!selectedBrands.includes(brand)) return false
            }

            if (selectedTypes.length > 0) {
                const name = (item?.name || '').toLowerCase()
                const matches = selectedTypes.some((type) => name.includes(type))
                if (!matches) return false
            }

            if (searchTerm) {
                const term = searchTerm.toLowerCase()
                const haystack = `${item?.name || ''} ${item?.brand || ''} ${item?.category || ''}`.toLowerCase()
                if (!haystack.includes(term)) return false
            }

            return true
        })
    }, [products, activeCategory, minPrice, maxPrice, selectedBrands, selectedTypes, searchTerm])

    return (
        <div>
            <div className="grid grid-cols-2 gap-5 justify-between">
                <ProductCategories active={activeCategory} onSelect={(category) => setActiveCategory(category.id)} />
                <div className="flex justify-end">
                    <SearchProducts value={searchTerm} onChange={setSearchTerm} />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-7">
                <div className="space-y-4">
                    <PriceRange
                        minValue={minPrice}
                        maxValue={maxPrice}
                        onMinChange={setMinPrice}
                        onMaxChange={setMaxPrice}
                        onReset={() => { setMinPrice(0); setMaxPrice(1000) }}
                    />
                    <ProductType
                        selectedType={selectedTypes}
                        onToggle={toggleType}
                        onReset={() => setSelectedTypes([])}
                    />
                    <ProductBrand
                        selectedBrand={selectedBrands}
                        onToggle={toggleBrand}
                        onReset={() => setSelectedBrands([])}
                    />
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-5 mt-8">
                    {
                        filteredProducts.length > 0 ? (
                            filteredProducts.map((item, idx) => (
                                <ProductCard key={idx} item={item} />
                            ))
                        ) : (
                            <p className='col-span-3 text-center text-[#414141] text-2xl py-10 capitalize'>No product found</p>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default ProductsContainer;