import Image from 'next/image';
import React from 'react';

const ReviewCard = ({review}) => {
    const {text, image, name, location} = review || {}
    return (
        <div className="border border-[#eaeaea] p-3 rounded-xl">
            <div className="flex gap-1 items-center border border-[#eaeaea] w-fit rounded-full py-1 px-2">
                <Image src={'/assets/star.png'} alt='star icon' width={20} height={20} className='w-4 h-4' />
                <Image src={'/assets/star.png'} alt='star icon' width={20} height={20} className='w-4 h-4' />
                <Image src={'/assets/star.png'} alt='star icon' width={20} height={20} className='w-4 h-4' />
                <Image src={'/assets/star.png'} alt='star icon' width={20} height={20} className='w-4 h-4' />
                <Image src={'/assets/star.png'} alt='star icon' width={20} height={20} className='w-4 h-4' />
            </div>
            <p className='mt-3 text-[#464646]'>{text}</p>

            <div className="flex items-center gap-3 mt-5">
                <Image src={image} alt='reviewer image' width={40} height={40} className='rounded-full w-10 h-10' />
                <div>
                    <h4 className='font-medium'>{name}</h4>
                    <h5 className='text-[15px] text-[#464646]'>{location}</h5>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;