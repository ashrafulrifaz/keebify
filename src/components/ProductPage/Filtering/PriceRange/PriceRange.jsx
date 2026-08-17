'use client'
import React, { useState, useCallback } from 'react';

const MIN = 0;
const MAX = 1000;

const PriceRange = () => {
    const [minValue, setMinValue] = useState(50);
    const [maxValue, setMaxValue] = useState(500);

    const resetValue = () => {
        setMinValue(50);
        setMaxValue(500);
    };

    const getPercent = useCallback(
        (value) => Math.round(((value - MIN) / (MAX - MIN)) * 100),
        []
    );

    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    const handleMinSlider = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxSlider = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    const handleMinInput = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxInput = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    return (
        <div className="bg-border/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <h4 className='capitalize text-[15px] font-medium'>Price Range</h4>
                <button onClick={resetValue} className='text-[#696969] capitalize text-sm cursor-pointer hover:text-[#494949]'>reset</button>
            </div>

            <div className='mb-5 mt-16 px-2'>
                <div className="relative h-1">
                    {/* base track */}
                    <div className="h-1 rounded-full bg-[#dedede]" />

                    {/* active range */}
                    <div
                        className="absolute top-0 h-1 rounded-full bg-primary"
                        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                    />

                    {/* min thumb */}
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={minValue}
                        onChange={handleMinSlider}
                        className="range-thumb"
                        style={{ zIndex: 3 }}
                    />

                    {/* max thumb */}
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={maxValue}
                        onChange={handleMaxSlider}
                        className="range-thumb"
                        style={{ zIndex: 4 }}
                    />

                    {/* min tooltip */}
                    <div className="absolute -top-11 -translate-x-1/2 flex flex-col items-center" style={{ left: `calc(${minPercent}% + ${8 - minPercent * 0.16}px)` }}>
                        <div className="rounded-full bg-primary text-white text-[13px] font-medium px-2 py-1 shadow-sm whitespace-nowrap">${minValue}</div>
                        <div className="w-2 h-2 bg-primary rotate-45 -mt-1 rounded-br-[3px]" />
                    </div>

                    {/* max tooltip */}
                    <div className="absolute -top-11 -translate-x-1/2 flex flex-col items-center" style={{ left: `calc(${maxPercent}% + ${8 - maxPercent * 0.16}px)` }}>
                        <div className="rounded-full bg-primary text-white text-[13px] font-medium px-2 py-1 shadow-sm whitespace-nowrap">${maxValue}</div>
                        <div className="w-2 h-2 bg-primary rotate-45 -mt-1 rounded-br-[3px]" />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
                <div className='bg-border py-1.5 px-4 rounded-lg space-y-0.5'>
                    <h6 className='text-[#696969] text-sm'>Min Price:</h6>
                    <div className="flex gap-0.5 items-center">
                        <h5 className='font-medium'>$</h5>
                        <input
                            type="number"
                            className='w-full focus:outline-0 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            value={minValue}
                            onChange={handleMinInput}
                        />
                    </div>
                </div>
                <div className='bg-border py-1.5 px-4 rounded-lg space-y-0.5'>
                    <h6 className='text-[#696969] text-sm'>Max Price:</h6>
                    <div className="flex gap-0.5 items-center">
                        <h5 className='font-medium'>$</h5>
                        <input
                            type="number"
                            className='w-full focus:outline-0 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            value={maxValue}
                            onChange={handleMaxInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceRange;