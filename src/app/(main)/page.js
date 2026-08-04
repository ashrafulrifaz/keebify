import BestSelling from '@/components/Sections/BestSelling/BestSelling';
import Hero from '@/components/Sections/Hero/Hero';
import NewArrivals from '@/components/Sections/NewArrivals/NewArrivals';
import Testimonials from '@/components/Sections/Testimonials/Testimonials';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <div className='px-12'>
                <NewArrivals />
                <BestSelling />
                <Testimonials />
            </div>
        </div>
    );
};

export default page;