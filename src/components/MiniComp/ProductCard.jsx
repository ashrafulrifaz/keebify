'use client'
import { useSession } from 'next-auth/react';
import { gooeyToast } from 'goey-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductCard = ({ item }) => {
    const {_id, name, colors, shortDescription, price} = item || {}
    const { data: session } = useSession();
    const [adding, setAdding] = useState(false);
    const [addedIds, setAddedIds] = useState([]);

    useEffect(() => {
        if (!session?.user?.email) return;
        const email = session.user.email;
        fetch(`http://localhost:3001/cart?email=${encodeURIComponent(email)}`)
            .then((r) => r.json())
            .then((data) => {
                const ids = data?.productIds || data?.items?.map((it) => it.productId) || [];
                setAddedIds(ids);
            })
            .catch(() => {});
    }, [session?.user?.email]);

    const isInCart = addedIds.includes(_id);

    const addToCart = async () => {

        if (!session?.user?.email) {
            window.location.href = '/signin';
            return;
        }

        if (isInCart) {
            gooeyToast.info('Already in cart', { description: `${name} is already in your cart.` });
            return;
        }

        try {
            setAdding(true);
            const res = await fetch(`http://localhost:3001/cart?email=${session.user.email}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    item: [
                        {productIds: [_id], productQuantity: 1}
                    ]
                }),
            });
            console.log(res)
            if (res.ok) {
                setAddedIds((prev) => [...prev, _id]);
                gooeyToast.success('Added to cart');
            } else {
                const err = await res.json().catch(() => ({}));
                if (res.status === 409) {
                    gooeyToast.warning('Already in cart', { description: err.message });
                } else {
                    gooeyToast.error('Failed to add to cart', {
                        description: 'Please try again later.',
                    });
                }
            }
        } catch (err) {
            console.error('Add to cart error:', err);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className='h-full flex flex-col'>
            <Link href={`/products/${_id}`} className='bg-[#eaeaea] px-2 rounded-xl max-h-60 flex flex-col justify-center overflow-hidden'>
                <Image src={item?.photos[0]} alt='keyboard image' width={300} height={200} className='w-full h-auto' />
            </Link>
            <div className='mt-5 flex flex-col flex-1'>
                <div>
                    <div className="flex items-center justify-between">
                        <span className='font-semibold text-lg'>${price}</span>
                        <div className="flex items-center gap-1">
                            {colors?.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{ backgroundColor: item }}
                                    className={`w-4 h-4 rounded-full border border-black/10`}
                                    title={item.name}
                                />
                            ))}
                        </div>
                    </div>
                    <Link href={`/products/${_id}`}>
                        <h3 className='font-medium text-[17px] mt-2'>{name}</h3>
                    </Link>
                    <p className='text-[#4a4a4a] text-[15px] mt-1'>{shortDescription}</p>
                </div>
                <div className="mt-auto pt-3 flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={addToCart}
                        disabled={adding || isInCart}
                        className='bg-[#f8f8f8] border border-[#eaeaea] text-black font-medium capitalize rounded-xl py-2.5 w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {isInCart ? 'In cart' : adding ? 'Adding...' : 'Add to cart'}
                    </button>
                    <button className='bg-primary text-white font-medium capitalize rounded-xl py-2.5 w-full cursor-pointer'>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;