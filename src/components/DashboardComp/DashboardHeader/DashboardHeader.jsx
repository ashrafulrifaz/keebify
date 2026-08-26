'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
    {
        "id": 0,
        "name": "Dashboard",
        "link": "/dashboard"
    },
    {
        "id": 1,
        "name": "Products",
        "link": "/dashboard/products"
    },
    {
        "id": 2,
        "name": "Orders",
        "link": "/dashboard/orders"
    },
    {
        "id": 3,
        "name": "Customers",
        "link": "/dashboard/customers"
    }
]

const DashboardHeader = () => {
    const pathname = usePathname();
    const {data} = useSession()

    return (
        <div className='grid grid-cols-3 gap-5 items-center px-6 py-3'>
            <Link href={'/dashboard'}>
                <Image src={'/assets/logo.png'} alt="Logo" width={100} height={100} className='w-32 h-auto' />
            </Link>

            <div className="flex justify-center">
                <nav className="flex items-center gap-4 rounded-full bg-secondary border border-border p-[1.5px]">
                    <ul className="flex">
                        {navItems.map((item) => (
                            <li key={item.id} className={`px-4 py-2 text-sm ${item.link === pathname ? 'bg-primary text-white rounded-full font-medium' : ''}`}>
                                <Link href={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='flex justify-end items-center gap-2'>
                <button className='border border-border p-2 bg-secondary rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#141b34" fill="none" stroke="#141b34" strokeWidth="1.5">
                        <path d="M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z"></path>
                    </svg>
                </button>
                <div className='border border-border p-0.5 bg-secondary rounded-full flex items-center gap-2'>
                    <Image src={data?.user?.image || '/assets/user.png'} alt="User" width={50} height={50} className='w-8 h-8 rounded-full' />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#141b34" fill="none" stroke="#141b34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;