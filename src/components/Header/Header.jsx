'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
    {
        "id": 0,
        "name": "Home",
        "link": "/"
    },
    {
        "id": 1,
        "name": "Products",
        "link": "/products"
    },
    {
        "id": 2,
        "name": "About",
        "link": "/about"
    },
    {
        "id": 3,
        "name": "Contact",
        "link": "/contact"
    }
]

const Header = () => {
    const pathname = usePathname();

    return (
        <div className="w-full py-3 grid grid-cols-3 gap-5 px-12">
            <div className='flex justify-start items-center'>
                <nav className={`inline-block border border-border bg-secondary rounded-full px-3 ${pathname === '/' ? 'pr-3 pl-0' : ''} ${pathname === '/contact' ? 'pl-3 pr-0' : ''}`}>
                    <ul className="flex items-center gap-3">
                        {
                            navItems.map( item => (
                                <li key={item.id}><Link href={item.link} className={`text-sm block ${pathname === item.link ? 'bg-primary text-white font-medium rounded-full px-3 py-1.5' : ''}`}>{item.name}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
            <div className="flex justify-center items-center">
                <Image src={'/logo.png'} alt="Logo" width={100} height={100} className='w-32 h-auto' />
            </div>
            <div className='flex justify-end items-center gap-3'>
                <Link href="/cart" className='border border-border p-1.5 bg-secondary rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"></path>
                    </svg>
                </Link>
                <Link href="/profile" className='border border-border p-1.5 bg-secondary rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"></path>
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Header;