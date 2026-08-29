'use client'
import { useState } from 'react';
import TimeDropDown from './TimeDropDown';

const PerformanceCard = () => {
    const [selected, setSelected] = useState(null)

    return (
        <div className='p-4 rounded-xl border border-black/5 col-span-2'>
            <div className="flex justify-between">
                <h4 className='capitalize text-lg font-medium'>performance overview</h4>
                <div className='flex flex-col justify-end'>
                    <TimeDropDown selected={selected} setSelected={setSelected} />
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;