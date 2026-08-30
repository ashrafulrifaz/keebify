import React from 'react';
const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = Array.from({ length: 12 }, (_, i) => String(2026 + i));
const CVV_LENGTHS = ['3 digits', '4 digits'];

const Card = () => {
    return (
        <div className='mt-7'>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    <label htmlFor="name" className='capitalize text-[#414141] font-medium'>country</label>
                    <input type="text" id='name' placeholder='Enter your country name' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                </div>
                <div>
                    <label htmlFor="cardNumber" className='capitalize text-[#414141] font-medium'>city</label>
                    <input type="number" id='cardNumber' placeholder='Enter your city name' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                </div>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-5'>
                <div className='col-span-2'>
                    <label htmlFor="address" className='capitalize text-[#414141] font-medium'>address</label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <SelectField placeholder="MM" options={MONTHS} />
                        <SelectField placeholder="YYYY" options={YEARS} />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className='capitalize text-[#414141] font-medium'>address</label>
                    <div className="mt-3">
                        <SelectField placeholder="CVV" options={CVV_LENGTHS} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SelectField = ({ placeholder, options }) => (
    <div className="relative">
        <select
            defaultValue=""
            className="w-full appearance-none bg-[#EAEAEA] rounded-lg pl-5 pr-10 py-3 text-[#696969] text-[15px] cursor-pointer focus:outline-none border border-[#c4c4c4]/50"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
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
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        >
            <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
        </svg>
    </div>
);

export default Card;