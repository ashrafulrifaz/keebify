'use client'
import { useState } from "react";
import Card from "./PaymentMethods/Card";
import Paypal from "./PaymentMethods/Paypal";
import Wallet from "./PaymentMethods/Wallet";

const PAYMENT_METHODS = [
    {
        id: 'card',
        label: 'Card',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z" strokeLinecap="round"></path>
                <path d="M10 16H11.5" strokeMiterlimit="10" strokeLinecap="round"></path>
                <path d="M14.5 16L18 16" strokeMiterlimit="10" strokeLinecap="round"></path>
                <path d="M2 9H22"></path>
            </svg>
        ),
    },
    {
        id: 'paypal',
        label: 'Paypal',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6.29358 4.83499L4.16511 17.6712C3.98586 18.7522 3.89623 19.2927 4.19427 19.6464C4.49231 20 5.03749 20 6.12785 20H6.53027C7.35308 20 7.76448 20 8.04501 19.7555C8.32554 19.5109 8.38372 19.1016 8.50008 18.2828L8.96761 14.9934C9.00457 14.7333 9.02305 14.6033 9.05213 14.492C9.26041 13.6948 9.93391 13.1077 10.7485 13.0132C10.8622 13 10.9929 13 11.2543 13H12.4163C15.5113 13 18.1943 10.8473 18.8803 7.81384C19.5536 4.83576 17.3016 2 14.2631 2H9.62312C8.5093 2 7.95239 2 7.51383 2.2348C7.26304 2.36907 7.04377 2.55577 6.87077 2.78235C6.56824 3.17856 6.47669 3.7307 6.29358 4.83499Z"></path>
                <path d="M8.24315 19.4998L8.01451 20.8325C7.90978 21.4429 8.38532 21.9998 9.01128 21.9998H11.0018C11.4961 21.9998 11.9179 21.6464 11.9991 21.1642L12.7285 16.8354C12.8098 16.3533 13.2316 15.9998 13.7258 15.9998H15.5289C18.11 15.9998 20.3448 14.2267 20.9047 11.7345C21.2967 9.99004 20.4437 8.30993 19 7.50098"></path>
            </svg>
        ),
    },
    {
        id: 'wallet',
        label: 'Wallet',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z"></path>
            <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833"></path>
            <path d="M17.5 15.5C17.7761 15.5 18 15.2761 18 15C18 14.7239 17.7761 14.5 17.5 14.5M17.5 15.5C17.2239 15.5 17 15.2761 17 15C17 14.7239 17.2239 14.5 17.5 14.5M17.5 15.5V14.5"></path>
        </svg>
        ),
    },
    {
        id: 'cod',
        label: 'COD',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"></path>
                <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" strokeLinecap="round"></path>
            </svg>
        ),
    },
];

const COD = () => {
    return (
        <div className='mt-7'>
            <div>
                <label htmlFor="deliveryNote" className='capitalize text-[#414141] font-medium'>delivery note</label>
                <input type="text" id='deliveryNote' placeholder='Any special instructions' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
            </div>
        </div>
    );
};

const CheckoutInfos = () => {
    const [method, setMethod] = useState('card');

    return (
        <form className='col-span-2'>
            <h3 className='capitalize text-lg font-medium'>my cart</h3>
            <div className='mt-3 rounded-xl bg-border/50 py-4 px-5'>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label htmlFor="name" className='capitalize text-[#414141] font-medium'>name</label>
                        <input type="text" id='name' placeholder='Enter your name' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                    </div>
                    <div>
                        <label htmlFor="phone" className='capitalize text-[#414141] font-medium'>phone</label>
                        <input type="number" id='phone' placeholder='Enter your phone' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="email" className='capitalize text-[#414141] font-medium'>email</label>
                    <input type="text" id='email' placeholder='Enter your email address' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                </div>
            </div>
            <h3 className='capitalize text-lg font-medium mt-5'>shipping info</h3>
            <div className='mt-3 rounded-xl bg-border/50 py-4 px-5'>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label htmlFor="country" className='capitalize text-[#414141] font-medium'>country</label>
                        <input type="text" id='country' placeholder='Enter your country name' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                    </div>
                    <div>
                        <label htmlFor="city" className='capitalize text-[#414141] font-medium'>city</label>
                        <input type="number" id='city' placeholder='Enter your city name' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="address" className='capitalize text-[#414141] font-medium'>address</label>
                    <input type="text" id='address' placeholder='Enter your full address' className='border border-[#c4c4c4]/50 block mt-2 bg-border rounded-lg px-2.5 py-1.5 focus:outline-0 w-full' />
                </div>
            </div>
            <h3 className='capitalize text-lg font-medium mt-5'>payment method</h3>
            <div className='mt-3 rounded-xl bg-border/50 py-4 px-5'>
                <div className="grid grid-cols-4 gap-5">
                    {
                        PAYMENT_METHODS.map((option) => {
                        const isActive = method === option.id;
                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setMethod(option.id)}
                                className={`flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 transition-colors cursor-pointer ${
                                    isActive
                                        ? 'border-primary bg-[#e2e2e2] text-primary'
                                        : 'border-transparent bg-border text-[#414141] hover:bg-[#e2e2e2]'
                                }`}
                            >
                                {option.icon}
                                <span className={`font-medium`}>{option.label}</span>
                            </button>
                        );
                    })}
                </div>
                
                {method === 'card' && <Card />}
                {method === 'paypal' && <Paypal />}
                {method === 'wallet' && <Wallet />}
                {method === 'cod' && <COD />}

            </div>
        </form>
    );
};

export default CheckoutInfos;