import React from 'react';
import ProductCard from '../../MiniComp/ProductCard';

const keyboards = [
    {
        id: 1,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png",
        price: 129.99,
        name: "Aurora TKL",
        colors: [
            { name: "Midnight Black", code: "#1C1C1E" },
            { name: "Arctic White", code: "#F5F5F7" },
        ],
        shortDescription: "Hot-swappable TKL with per-key RGB.",
        description: "A tenkeyless mechanical keyboard with hot-swappable switches and per-key RGB lighting, built for a compact, clutter-free desk setup.",
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846046/AULA_F75_Wireless_Mechanical_Keyboard_Green-LEOBOG_Reaper_Background_Removed_dgycbt.png",
        price: 179.99,
        name: "Nebula 75",
        colors: [
            { name: "Deep Ocean Blue", code: "#1E3A5F" },
            { name: "Blush Pink", code: "#F3C5C5" },
            { name: "Charcoal", code: "#36454F" },
        ],
        shortDescription: "Gasket-mounted 75% with a cushioned feel.",
        description: "A 75% layout board with a gasket-mounted plate for a soft, cushioned typing feel, paired with PBT double-shot keycaps.",
    },
    {
        id: 5,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png",
        price: 89.99,
        name: "Compact 60",
        colors: [
            { name: "Slate Gray", code: "#5C6270" },
            { name: "Pastel Yellow", code: "#F5E1A4" },
        ],
        shortDescription: "Minimalist 60% board built for portability.",
        description: "A minimalist 60% mechanical keyboard designed for portability, with a durable aluminum frame and detachable USB-C cable.",
    },
    {
        id: 6,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png",
        price: 249.99,
        name: "Orion Full-Size",
        colors: [
            { name: "Graphite", code: "#2B2B2E" },
        ],
        shortDescription: "Full-size wireless board with a numpad.",
        description: "A full-size mechanical keyboard with a numpad, dual-mode wireless connectivity, and a knurled aluminum volume knob.",
    },
    {
        id: 7,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png",
        price: 159.99,
        name: "Zephyr Low-Profile",
        colors: [
            { name: "Sage Green", code: "#8CA88C" },
            { name: "Lavender", code: "#C8B6E2" },
        ],
        shortDescription: "Slim low-profile board for fast typing.",
        description: "A slim, low-profile mechanical keyboard with shorter keycaps and a shallow actuation depth, designed for fast, comfortable typing.",
    },
    {
        id: 8,
        image: "https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png",
        price: 219.99,
        name: "Vantage Wireless 65",
        colors: [
            { name: "Coral Sunset", code: "#E8734A" },
            { name: "Steel Silver", code: "#B0B4B8" },
        ],
        shortDescription: "Wireless 65% with multi-device pairing.",
        description: "A 65% wireless mechanical keyboard with Bluetooth multi-device pairing, a 4000mAh battery, and a machined aluminum case.",
    }
];

const BestSelling = () => {
    return (
        <div className='py-10'>
            <h3 className='capitalize text-center text-xl font-medium'>best selling</h3>
            <div className="grid grid-cols-4 gap-5 mt-8">
                {
                    keyboards?.slice(0, 4).map(keyboard => (
                        <ProductCard key={keyboard.id} keyboard={keyboard} />
                    ))
                }
            </div>
            <div className='mt-14'>
                <button className='bg-[#f8f8f8] text-black border border-[#eaeaea] pl-3.5 p-1 capitalize font-medium rounded-xl flex items-center gap-3 cursor-pointer mx-auto'>
                    <span>See More collections</span>
                    <div className='bg-primary text-white rounded-lg p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 18.502V5.00195"></path>
                            <path d="M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default BestSelling;