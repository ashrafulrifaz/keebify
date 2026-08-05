import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='py-12 px-12 bg-[#FCF8ED] mt-20 grid grid-cols-6 gap-5 rounded-t-4xl'>
            <div className='col-span-2'>
                <Image src={'/assets/logo.png'} alt='logo' width={100} height={70} className='w-32 h-auto' />
                <p className='text-[#464646] text-[16px]'>Your one-stop shop for keyboards, switches, and keycaps.</p>
            </div>
            <div>
                <h6 className='capitalize text-[17px] font-medium'>company</h6>
                <div className='mt-4 flex flex-col gap-2.5'>
                    <Link href={'/contact'} className='capitalize text-[#464646]'>contact us</Link>
                    <Link href={'/support'} className='capitalize text-[#464646]'>support</Link>
                    <Link href={'/terms-and-condition'} className='capitalize text-[#464646]'>terms & conditions</Link>
                </div>
            </div>
            <div>
                <h6 className='capitalize text-[17px] font-medium'>Socials</h6>
                <div className='mt-4 flex flex-col gap-2.5'>
                    <Link href={'/'} className='capitalize text-[#464646]'>facebook</Link>
                    <Link href={'/'} className='capitalize text-[#464646]'>instagram</Link>
                    <Link href={'/'} className='capitalize text-[#464646]'>tiktok</Link>
                </div>
            </div>
            <div className='col-span-2'>
                <h6 className='capitalize text-[17px] font-medium'>Newsletter</h6>
                <p className='text-[#464646] text-[16px] mt-5'>Get early access to new drops, exclusive deals, and keyboard guides.</p>
                <div className='mt-4 border border-[#eaeaea] bg-[#f8f8f8] rounded-xl p-1 flex'>
                    <input type="email" placeholder='Enter your email' className='focus:outline-0 w-full py-0.5 px-2' />
                    <div className='bg-primary rounded-lg p-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;