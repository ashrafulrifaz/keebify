'use client'

import CheckoutInfos from "./CheckoutInfos";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutContainer = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <CheckoutInfos />
            <CheckoutSummary />
        </div>
    );
};

export default CheckoutContainer;