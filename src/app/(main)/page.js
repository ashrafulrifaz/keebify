import Hero from '@/components/Sections/Hero/Hero';
import NewArrivals from '@/components/Sections/NewArrivals/NewArrivals';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <div className='px-12'>
                <NewArrivals />
            </div>
        </div>
    );
};

export default page;