import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div className='py-14 relative h-[90vh] overflow-hidden bg-[url("https://res.cloudinary.com/db30o33kz/image/upload/v1786861105/banner-bg_ew8pnn.png")]'>
            <div>
                <h1 className='text-6xl font-bold text-center'>Keyboard for Every Need</h1>
                <button className='bg-primary text-white pl-3.5 p-1 capitalize font-medium rounded-xl flex items-center gap-3 cursor-pointer mt-10 mx-auto'>
                    <span>explore collections</span>
                    <div className='bg-white text-black rounded-lg p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"></path>
                        </svg>
                    </div>
                </button>
                <div>
                    <Image src="/assets/image-1.png" alt="Hero Image" width={800} height={400} className='absolute -bottom-20 w-1/2 h-auto rotate-[70deg] left-2/5 transform -translate-x-2/5' />
                    <Image src="/assets/image-2.png" alt="Hero Image" width={800} height={400} className='absolute -bottom-20 w-[55%] h-auto rotate-[-70deg] right-2/5 transform translate-x-2/5' />
                </div>
            </div>
            <div className='p-1 rounded-xl border border-border bg-secondary w-60 h-24 grid grid-cols-5 gap-3 items-center absolute bottom-2/5 left-1/5 transform -translate-x-1/2'>
                <Image src="/assets/keyboard-1.jpg" alt="Hero Image" width={400} height={400} className='w-full h-full col-span-2 rounded-lg' />
                <div className="col-span-3 items-center">
                    <h3 className='font-medium text-sm text-gray-800'>Universe Vitality Orange</h3>
                    <h3 className='font-medium text-base mt-2'>$59</h3>
                </div>
            </div>
            <div className='p-1 rounded-xl border border-border bg-secondary w-60 h-24 grid grid-cols-5 gap-3 items-center absolute bottom-2/5 right-1/5 transform translate-x-1/2'>
                <Image src="/assets/keyboard-2.jpg" alt="Hero Image" width={400} height={400} className='w-full h-full col-span-2 rounded-lg' />
                <div className="col-span-3 items-center">
                    <h3 className='font-medium text-sm text-gray-800'>Filco Majestouch Keyboard</h3>
                    <h3 className='font-medium text-base mt-2'>$45</h3>
                </div>
            </div>
            <Image src="https://res.cloudinary.com/db30o33kz/image/upload/v1786864162/cloud_lee4zx.png" alt="Hero Image" width={1000} height={500} className='absolute -bottom-40 w-1/2 h-auto left-2/5 transform -translate-x-2/5' />
        </div>
    );
};

export default Hero;