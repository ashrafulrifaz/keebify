'use client'

const ProductBrands = ['aula', 'keychron', 'ducky', 'royal-kludge', 'akko', 'leobog', 'varmilo', 'nuphy']

const ProductBrand = ({ selectedBrand = [], onToggle, onReset }) => {

    const handleReset = () => {
        if (onReset) onReset();
    };

    return (
        <div className="bg-border/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <h4 className='capitalize text-[15px] font-medium'>Brand</h4>
                <button onClick={handleReset} className='text-[#696969] capitalize text-sm cursor-pointer hover:text-[#494949]'>reset</button>
            </div>

            <div className="mt-5 space-y-1.5">
                {
                    ProductBrands?.map((brand, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                            <input checked={selectedBrand.includes(brand)} onChange={() => onToggle && onToggle(brand)} type="checkbox" className="w-4.5 h-4.5 border-2 border-primary accent-primary" />
                            <span className="capitalize">{brand}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductBrand;