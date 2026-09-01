'use client'

const categories = [
    {
        id: 1,
        name: 'all categories',
        slug: 'all'
    },
    {
        id: 2,
        name: 'keyboard',
        slug: 'keyboards'
    },
    {
        id: 3,
        name: 'mouse',
        slug: 'mouse'
    }
]

const ProductCategories = ({ active, onSelect }) => {

    return (
        <div className='flex justify-start items-center gap-3'>
            {
                categories.map(category => (
                    <button
                        onClick={() => onSelect(category)}
                        key={category.id}
                        className={`cursor-pointer rounded-full py-1 px-2.5 border capitalize text-[15px] ${active === category.id ? 'text-white bg-primary border-primary' : 'bg-[#f4f4f4] border-[#ececec]'}`}
                    >
                        {category.name}
                    </button>
                ))
            }
        </div>
    );
};

export default ProductCategories;