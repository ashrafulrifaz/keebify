import React from 'react';
import Table from './Table';
import StatusDropdown from './StatusDropDown';

const OrdersTable = () => {
    return (
        <div className='mt-5 bg-border/50 rounded-xl px-4 py-5'>
            <div className='flex items-center justify-between'>
                <div className='border border-[#c4c4c4]/40 bg-border/75 flex gap-2 rounded-full py-1.5 px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 17L21 21"></path>
                        <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"></path>
                    </svg>
                    <input type="text" placeholder='Search order' className='text-[15px] focus:outline-0' />
                </div>
                <StatusDropdown />
            </div>

            <Table />
        </div>
    );
};

export default OrdersTable;