import { ptSans } from '@/lib/fonts';
import React from 'react';

const CTA = () => {
    return (
        <div className="bg-[url('/assets/cta.png')] bg-cover bg-center bg-no-repeat rounded-3xl px-7 py-10 h-[650px] flex flex-col justify-between">
            <h1 className={`text-white text-5xl leading-relaxed ${ptSans.className} font-[700]`}>Premium Keyboards.<br /> Maximum Performance.</h1>
            <div>
                <button className='bg-primary text-white pl-3.5 p-1 capitalize font-medium rounded-xl flex items-center gap-3 cursor-pointer'>
                    <span>explore collections</span>
                    <div className='bg-white text-black rounded-lg p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CTA;