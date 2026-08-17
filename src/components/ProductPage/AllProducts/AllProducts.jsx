'use client'
import ProductCard from '@/components/MiniComp/ProductCard';
import useProducts from '@/hooks/useProducts';

const AllProducts = () => {
    const {products} = useProducts()

    return (
        <div className="grid grid-cols-3 gap-5">
            {
                products?.slice(0, 4).map((item, idx) => (
                    <ProductCard key={idx} item={item} />
                ))
            }
        </div>
    );
};

export default AllProducts;