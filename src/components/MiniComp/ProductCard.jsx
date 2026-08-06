import Image from 'next/image';

const ProductCard = ({ item }) => {
    const {name, image, colors, shortDescription, price} = item || {}

    return (
        <div className='h-full flex flex-col'>
            <div className='bg-[#eaeaea] px-2 rounded-xl h-60 flex flex-col justify-center'>
                <Image src={image} alt='keyboard image' width={300} height={200} />
            </div>
            <div className='mt-5 flex flex-col flex-1'>
                <div>
                    <div className="flex items-center justify-between">
                        <span className='font-semibold text-lg'>${price}</span>
                        <div className="flex items-center gap-1">
                            {colors?.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{ backgroundColor: item.code }}
                                    className="w-4 h-4 rounded-full border border-black/10"
                                    title={item.name}
                                />
                            ))}
                        </div>
                    </div>
                    <h3 className='font-medium text-lg mt-2'>{name}</h3>
                    <p className='text-[#4a4a4a] text-[15px] mt-1'>{shortDescription}</p>
                </div>
                <div className="mt-auto pt-3 flex gap-3 items-center">
                    <button className='bg-[#f8f8f8] border border-[#eaeaea] text-black font-medium capitalize rounded-xl py-2.5 w-full cursor-pointer'>Add to cart</button>
                    <button className='bg-primary text-white font-medium capitalize rounded-xl py-2.5 w-full cursor-pointer'>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;