import BestSelling from '@/components/Sections/BestSelling/BestSelling';
import CTA from '@/components/Sections/CTA/CTA';
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
                <CTA />
            </div>
        </div>
    );
};

export default page;