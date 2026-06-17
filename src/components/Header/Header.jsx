'use client';
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
        <div className="w-full py-5 grid grid-cols-3 gap-5 mx-12">
            <div>
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
            <div></div>
            <div></div>
        </div>
    );
};

export default Header;