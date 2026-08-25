import CustomersTable from '@/components/DashboardComp/CustomersTable/CustomersTable';
import React from 'react';

const page = () => {
    return (
        <div className='px-6 py-4'>
            <div>
                <h2 className='capitalize text-2xl font-medium'>Customers</h2>
                <p className='text-[#414141] mt-2'>manage customers order</p>
            </div>
            <CustomersTable />
        </div>
    );
};

export default page;