'use client'
import { useState, useRef, useEffect } from 'react';

const STATUS = ['active', 'draft', 'out of stock'];

const ProductStatusSelector = ({productStatus, setProductStatus}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(productStatus);
    const ref = useRef(null);

    useEffect(() => {
        setSelected(productStatus || null);
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [productStatus]);

    const handleSelect = (category) => {
        setSelected(category);
        setProductStatus(category)
        setOpen(false);
    };

    return (
        <div className="relative block mt-3" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="border border-[#c4c4c4]/50 py-2 pl-3 pr-2.5 rounded-lg flex items-center justify-between gap-1.5 text-[15px] cursor-pointer hover:bg-border/60 transition-colors w-full"
            >
                <span className={selected ? 'text-[#141b34]' : 'text-[#696969]'}>
                    {selected || 'Select Status'}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="#696969"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-full bg-white rounded-2xl border border-border shadow-lg shadow-black/5 py-2 z-20 overflow-hidden">

                    {STATUS.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleSelect(category)}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-secondary transition-colors ${
                                selected === category ? 'font-medium text-primary' : 'text-[#414141]'
                            }`}
                        >
                            {category}
                            {selected === category && <CheckIcon />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductStatusSelector;

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
    </svg>
);