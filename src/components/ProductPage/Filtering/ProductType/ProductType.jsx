'use client'
import { useState } from "react";

const ProductTypes = ['standard', 'combo', 'mechanical']

const ProductType = () => {
    const [selectedType, setSelectedType] = useState([]);

    const toggle = (type) => {
        setSelectedType((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    console.log(selectedType)

    return (
        <div className="bg-border/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <h4 className='capitalize text-[15px] font-medium'>Type</h4>
                <button className='text-[#696969] capitalize text-sm cursor-pointer hover:text-[#494949]'>reset</button>
            </div>
            
            <div className="mt-5 space-y-1.5">
                {
                    ProductTypes?.map((type, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                            <input checked={selectedType.includes(type)} onChange={() => toggle(type)} type="checkbox" className="w-4.5 h-4.5 border-2 border-primary accent-primary" />
                            <span className="capitalize">{type}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductType;