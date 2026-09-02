import CheckoutSteps from '@/components/CartComponents/CheckoutSteps';
import CheckoutContainer from '@/components/CheckoutComponent/CheckoutContainer';
import React from 'react';

const page = () => {
    return (
        <div className="px-12 pb-5">
            <CheckoutSteps step={2} />
            <CheckoutContainer />
        </div>
    );
};

export default page;