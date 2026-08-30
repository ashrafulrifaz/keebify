'use client'

import Image from "next/image";

const cartItems = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png',
        name: 'Aula F75',
        brand: 'Aula',
        price: 85.0,
        quantity: 1,
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846046/AULA_F75_Wireless_Mechanical_Keyboard_Green-LEOBOG_Reaper_Background_Removed_dgycbt.png',
        name: 'Nebula 75',
        brand: 'Leobog',
        price: 179.99,
        quantity: 2,
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png',
        name: 'Compact 60',
        brand: 'Akko',
        price: 89.99,
        quantity: 1,
    },
    {
        id: 4,
        image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png',
        name: 'Vantage Wireless 65',
        brand: 'Royal Kludge',
        price: 219.99,
        quantity: 1,
    },
];

const MIN_QTY = 1;
const MAX_QTY = 10;

const CartItems = () => {
    return (
        <div className='col-span-2'>
            <h3 className='capitalize text-lg font-medium'>my cart</h3>
                <div className='mt-3 divide-y divide-border rounded-xl bg-border/50 py-4 px-5'>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-5 py-3">
                        <div className="w-5 h-5 rounded-md border-[1.5px] border-primary/30 shrink-0" />

                        <div className="w-20 h-20 rounded-2xl bg-border flex items-center justify-center overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} width={80} height={80} className=" w-full h-auto" />
                        </div>

                        <div className="flex-1">
                            <h4 className="text-lg font-medium truncate">{item.name}</h4>
                            <p className="text-[#696969] text-[15px]">{item.brand}</p>
                        </div>

                        <div className="text-lg font-medium text-[#1a1a1a] whitespace-nowrap">
                            ${item.price.toFixed(2)}
                        </div>

                        <div className="inline-flex items-center gap-1 border-[1.5px] border-border bg-secondary rounded-2xl p-1 shrink-0">
                            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer">
                                -
                            </button>
                            <span className="w-6 text-center text-[15px] font-medium text-[#1a1a1a]">
                                {item.quantity}
                            </span>
                            <button type="button" className="w-8 h-8 flex items-center justify-center rounded-xl bg-border text-[#1a1a1a] text-lg cursor-pointer">
                                +
                            </button>
                        </div>

                        <button type="button" className="w-9 h-9 flex items-center justify-center rounded-2xl bg-border shrink-0 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartItems;