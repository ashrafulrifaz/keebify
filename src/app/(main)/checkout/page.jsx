import CheckoutSteps from '@/components/CartComponents/CheckoutSteps';
import React from 'react';

const page = () => {
    return (
        <div className="px-12 pb-5">
            <CheckoutSteps step={2} />
            
        </div>
    );
};

export default page;