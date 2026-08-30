import CheckoutSteps from '@/components/CartComponents/CheckoutSteps';
import CheckoutInfos from '@/components/CheckoutComponent/CheckoutInfos';
import CheckoutSummary from '@/components/CheckoutComponent/CheckoutSummary';
import React from 'react';

const page = () => {
    return (
        <div className="px-12 pb-5">
            <CheckoutSteps step={2} />
            <div className="grid grid-cols-3 gap-5">
                <CheckoutInfos />
                <CheckoutSummary />
            </div>
        </div>
    );
};

export default page;