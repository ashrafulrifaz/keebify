import React from 'react';

const InfoCards = () => {
    return (
        <div className='grid grid-cols-4 gap-5 mt-7'>
            <div className='p-4 rounded-xl border border-black/5'>
                <div className="flex justify-between">
                    <span className='capitalize text-[#696969] font-medium text-md'>Total sales</span>
                    <div className='bg-primary rounded-full p-2.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5">
                            <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" strokeLinecap="round"></path>
                            <path d="M6 6H22" strokeLinecap="round"></path>
                            <circle cx="6" cy="20" r="2"></circle>
                            <circle cx="17" cy="20" r="2"></circle>
                            <path d="M8 20L15 20" strokeLinecap="round"></path>
                            <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" strokeLinecap="round"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                    <h3 className='font-medium text-4xl'>{1450}</h3>
                    <div className='flex items-center gap-0.5 bg-[#E3F1DE] rounded-full py-[3px] pl-1 pr-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a8b3b" fill="none" stroke="#4a8b3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5.5V19"></path>
                            <path d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"></path>
                        </svg>
                        <span className='text-xs text-[#4A8B3B] font-medium'>{4.9}%</span>
                    </div>
                </div>
                <p className='capitalize text-[#696969] font-medium text-md mt-4'>Last month: <span className='text-[#414141]'>{1200}</span></p>
            </div>
            <div className='p-4 rounded-xl border border-black/5'>
                <div className="flex justify-between">
                    <span className='capitalize text-[#696969] font-medium text-md'>Total revenue</span>
                    <div className='bg-primary rounded-full p-2.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M18.4167 8.14815C18.4167 5.85719 15.5438 4 12 4C8.45617 4 5.58333 5.85719 5.58333 8.14815C5.58333 10.4391 7.33333 11.7037 12 11.7037C16.6667 11.7037 19 12.8889 19 15.8519C19 18.8148 15.866 20 12 20C8.13401 20 5 18.1428 5 15.8519"></path>
                            <path d="M12 2V22" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                    <h3 className='font-medium text-4xl'>${8329.40}</h3>
                    <div className='flex items-center gap-0.5 bg-[#E3F1DE] rounded-full py-[3px] pl-1 pr-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a8b3b" fill="none" stroke="#4a8b3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5.5V19"></path>
                            <path d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"></path>
                        </svg>
                        <span className='text-xs text-[#4A8B3B] font-medium'>{12.9}%</span>
                    </div>
                </div>
                <p className='capitalize text-[#696969] font-medium text-md mt-4'>last month: <span className='text-[#414141]'>${6710.20}</span></p>
            </div>
            <div className='p-4 rounded-xl border border-black/5'>
                <div className="flex justify-between">
                    <span className='capitalize text-[#696969] font-medium text-md'>new customers</span>
                    <div className='bg-primary rounded-full p-2.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5">
                            <path d="M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20" strokeLinecap="round" strokeLinejoin="round"></path>
                            <circle cx="10" cy="7.5" r="3.5"></circle>
                            <path d="M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547" strokeLinecap="round"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                    <h3 className='font-medium text-4xl'>{134}</h3>
                    <div className='flex items-center gap-0.5 bg-[#E3F1DE] rounded-full py-[3px] pl-1 pr-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#4a8b3b" fill="none" stroke="#4a8b3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5.5V19"></path>
                            <path d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"></path>
                        </svg>
                        <span className='text-xs text-[#4A8B3B] font-medium'>{30.3}%</span>
                    </div>
                </div>
                <p className='capitalize text-[#696969] font-medium text-md mt-4'>last month: <span className='text-[#414141]'>{97}</span></p>
            </div>
            <div className='p-4 rounded-xl border border-black/5'>
                <div className="flex justify-between">
                    <span className='capitalize text-[#696969] font-medium text-md'>return products</span>
                    <div className='bg-primary rounded-full p-2.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.49933 7.50009V13.5001C2.49933 17.2713 2.49933 19.1569 3.6709 20.3285C4.84247 21.5001 6.72809 21.5001 10.4993 21.5001H13.9993M21.4993 14.0001V7.50009"></path>
                            <path d="M3.86842 5.3147L2.49933 7.50009H21.4993L20.2471 5.41312C19.3935 3.9903 18.9666 3.27889 18.2789 2.88949C17.5911 2.50009 16.7615 2.50009 15.1022 2.50009H8.95304C7.32931 2.50009 6.51744 2.50009 5.83946 2.87539C5.16148 3.25069 4.73046 3.9387 3.86842 5.3147Z"></path>
                            <path d="M11.9993 7.50009V2.50009"></path>
                            <path d="M15.9993 14.5001C15.9993 14.5001 13.4993 16.3413 13.4993 17.0001C13.4993 17.6589 15.9993 19.5001 15.9993 19.5001M13.9993 17.0001H19.2493C20.492 17.0001 21.4993 18.0075 21.4993 19.2501C21.4993 20.4927 20.492 21.5001 19.2493 21.5001H18.4993"></path>
                            <path d="M9.99933 10.5001H13.9993"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                    <h3 className='font-medium text-4xl'>{70}</h3>
                    <div className='flex items-center gap-0.5 bg-[#FBE3E1] rounded-full py-[3px] pl-1 pr-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#c4453a" fill="none" stroke="#c4453a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 18.502V5.00195"></path>
                            <path d="M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002"></path>
                        </svg>
                        <span className='text-xs text-[#C4453A] font-medium'>{14}%</span>
                    </div>
                </div>
                <p className='capitalize text-[#696969] font-medium text-md mt-4'>last month: <span className='text-[#414141]'>{90}</span></p>
            </div>
        </div>
    );
};

export default InfoCards;