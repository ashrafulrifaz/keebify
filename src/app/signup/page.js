import Signup from '@/components/Authentication/Signup/Signup';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <div className="h-screen grid grid-cols-2 gap-12 px-8 py-6">
            <Signup />
            <div className={`bg-[url('https://res.cloudinary.com/db30o33kz/image/upload/v1786967521/keyboard_rwqfmw.png')] bg-cover bg-right bg-no-repeat rounded-4xl p-4`}>
                <Image src={'/assets/logo.png'} alt='keyboard' width={120} height={50} className='ml-auto' />
            </div>
        </div>
    );
};

export default page;