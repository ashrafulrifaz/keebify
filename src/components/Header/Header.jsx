'use client';
import { signOut, useSession } from 'next-auth/react';
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
    const {status} = useSession()

    return (
        <div className="w-full py-3 grid grid-cols-3 gap-5 px-12">
            <div className='flex justify-start items-center'>
                <nav className={`inline-block border border-border bg-secondary rounded-full px-3 ${pathname === '/' ? 'pl-0' : ''} ${pathname === '/contact' ? 'pr-0' : ''}`}>
                    <ul className="flex items-center gap-3">
                        {
                            navItems.map( item => (
                                <li key={item.id}><Link href={item.link} className={`text-sm block py-2 ${pathname === item.link ? 'bg-primary text-white font-medium rounded-full px-2.5' : ''}`}>{item.name}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
            <div className="flex justify-center items-center">
                <Link href={'/'}>
                    <Image src={'/assets/logo.png'} alt="Logo" width={100} height={100} className='w-32 h-auto' />
                </Link>
            </div>
            <div className='flex justify-end items-center gap-3'>
                <Link href="/cart" className={`border  p-1.5 rounded-full ${pathname === '/cart' ? 'border-primary bg-primary text-white' : 'border-border bg-secondary'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.32352 13.0113C3.6739 10.009 4.18586 7.75784 4.66063 6.15851C5.04994 4.84711 5.24459 4.19141 6.04283 3.5957C6.84107 3 7.65697 3 9.28876 3H14.7113C16.3431 3 17.159 3 17.9572 3.5957C18.7554 4.19141 18.9501 4.84711 19.3394 6.15851C19.8142 7.75784 20.3261 10.009 20.6765 13.0113C21.0895 16.5497 21.2959 18.3189 20.1027 19.6594C18.9095 21 16.9758 21 13.1084 21H10.8916C7.02422 21 5.09052 21 3.89731 19.6594C2.70411 18.3189 2.91058 16.5497 3.32352 13.0113Z"></path>
                        <path d="M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7"></path>
                    </svg>
                </Link>
                <Link href="/profile" className='border border-border p-1.5 bg-secondary rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"></path>
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"></path>
                    </svg>
                </Link>
                {
                    status === 'authenticated' ? (
                        <button onClick={() => signOut()} className='border border-border p-1.5 bg-secondary rounded-full cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#141b34" fill="none" stroke="#141b34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11.9474 21C7.00589 21 3 16.9706 3 12C3 7.02944 7.00589 3 11.9474 3"></path>
                                <path d="M17 8C17 8 21 10.946 21 12C21 13.0541 17 16 17 16M20.5 12H9"></path>
                            </svg>
                        </button>
                    ) : ''
                }
            </div>
        </div>
    );
};

export default Header;