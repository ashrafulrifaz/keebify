'use client'
import { useState, useRef, useEffect } from 'react';

const CATEGORIES = ['Keyboards', 'Switches', 'Keycaps', 'Accessories'];

const CategoryDropdown = ({ onChange, selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category) => {
        setSelected(category);
        setOpen(false);
        onChange?.(category);
    };

    return (
        <div className="relative inline-block" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="border border-border py-1.5 pl-3 pr-2.5 bg-secondary rounded-full flex items-center gap-1.5 text-[15px] cursor-pointer hover:bg-border/60 transition-colors"
            >
                <span className={selected ? 'text-[#141b34]' : 'text-[#696969]'}>
                    {selected || 'Category'}
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-border shadow-lg shadow-black/5 py-2 z-20 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => handleSelect(null)}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-secondary transition-colors ${
                            !selected ? 'font-medium text-primary' : 'text-[#414141]'
                        }`}
                    >
                        All Categories
                        {!selected && <CheckIcon />}
                    </button>

                    <div className="h-px bg-border my-1 mx-2" />

                    {CATEGORIES.map((category) => (
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

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
    </svg>
);

export default CategoryDropdown;