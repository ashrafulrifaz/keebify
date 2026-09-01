'use client'

const ProductTypes = ['standard', 'combo', 'mechanical']

const ProductType = ({ selectedType = [], onToggle, onReset }) => {

    return (
        <div className="bg-border/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <h4 className='capitalize text-[15px] font-medium'>Type</h4>
                <button onClick={() => onReset && onReset()} className='text-[#696969] capitalize text-sm cursor-pointer hover:text-[#494949]'>reset</button>
            </div>

            <div className="mt-5 space-y-1.5">
                {
                    ProductTypes?.map((type, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                            <input checked={selectedType.includes(type)} onChange={() => onToggle && onToggle(type)} type="checkbox" className="w-4.5 h-4.5 border-2 border-primary accent-primary" />
                            <span className="capitalize">{type}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductType;