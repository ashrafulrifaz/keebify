'use client'
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const STATUS_OPTIONS = ['active', 'draft', 'out of stock'];

const STATUS_STYLES = {
    active: 'bg-[#E3F1DE] text-[#4A8B3B]',
    draft: 'bg-[#EFEFEF] text-[#696969]',
    'out of stock': 'bg-[#FBE3E1] text-[#C4453A]',
};

const useDropdown = () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0, ready: false });

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    useLayoutEffect(() => {
        if (!open || !triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const menuHeight = menuRef.current?.offsetHeight ?? 0;
        const spaceBelow = window.innerHeight - rect.bottom;
        const shouldFlip = menuHeight > 0 && spaceBelow < menuHeight;

        setCoords({
            top: shouldFlip ? rect.top - menuHeight - 6 : rect.bottom + 6,
            left: rect.left,
            ready: true,
        });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return { open, setOpen, triggerRef, menuRef, coords, toggle };
};

const StatusBadge = ({ status, onChange, productId }) => {
    const { open, setOpen, triggerRef, menuRef, coords, toggle } = useDropdown();

    const handleStatusUpdate = async (option) => {
        const res = await fetch(`http://localhost:3001/products/${productId}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                status: option
            })
        })

        if (res.ok) {
            const updatedProduct = await res.json();
            console.log('Updated:', updatedProduct);
        } else {
            console.error('Update failed');
        }
    }

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={toggle}
                className={`capitalize flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium cursor-pointer transition-colors ${STATUS_STYLES[status]}`}
            >
                {status}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" />
                </svg>
            </button>

            {open && typeof window !== 'undefined' && createPortal(
                <div
                    ref={menuRef}
                    style={{
                        position: 'fixed',
                        top: coords.top,
                        left: coords.left,
                        visibility: coords.ready ? 'visible' : 'hidden',
                    }}
                    className="w-40 bg-white rounded-xl border border-border shadow-lg shadow-black/5 py-1.5 z-50 overflow-hidden"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                                handleStatusUpdate(option)
                            }}
                            className="w-full text-left px-3.5 py-2 text-sm text-[#414141] hover:bg-secondary transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </>
    );
};

const ActionMenu = (id) => {
    const { open, setOpen, triggerRef, menuRef, coords, toggle } = useDropdown();
    const queryClient = useQueryClient();

    const handleProductDelete = async () => {
        setOpen(false)
        const res = await fetch(`http://localhost:3001/products/${id.id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log('Deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setRows((prev) => prev.filter((row) => row._id !== id.id));
        } else {
            console.error('Delete failed');
        }
    }

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={toggle}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Row actions"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#414141" strokeWidth="1.5">
                    <path d="M21 12C21 11.1716 20.3284 10.5 19.5 10.5C18.6716 10.5 18 11.1716 18 12C18 12.8284 18.6716 13.5 19.5 13.5C20.3284 13.5 21 12.8284 21 12Z"></path>
                    <path d="M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z"></path>
                    <path d="M6 12C6 11.1716 5.32843 10.5 4.5 10.5C3.67157 10.5 3 11.1716 3 12C3 12.8284 3.67157 13.5 4.5 13.5C5.32843 13.5 6 12.8284 6 12Z"></path>
                </svg>
            </button>

            {open && typeof window !== 'undefined' && createPortal(
                <div
                    ref={menuRef}
                    style={{
                        position: 'fixed',
                        top: coords.top,
                        left: coords.left - 100,
                        visibility: coords.ready ? 'visible' : 'hidden',
                    }}
                    className="w-36 bg-white rounded-xl border border-border shadow-lg shadow-black/5 py-1.5 z-50 overflow-hidden"
                >
                    <Link href={`/dashboard/products/${id.id}`} className="block text-left px-3.5 py-2 text-sm text-[#414141] hover:bg-secondary transition-colors">Edit</Link>
                    <button onClick={() => {handleProductDelete()}} className="w-full text-left px-3.5 py-2 text-sm text-[#C4453A] hover:bg-secondary transition-colors">Delete</button>
                </div>,
                document.body
            )}
        </>
    );
};

const Table = ({products}) => {
    const [rows, setRows] = useState(products || []);

    useEffect(() => {
        setRows(products || []);
    }, [products]);

    const updateStatus = (id, status) => {
        setRows((prev) => prev.map((row) => (row._id === id ? { ...row, status } : row)));
    };

    return (
        <div className="rounded-2xl bg-[#F5F5F5] mt-5">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-border text-[#414141] text-[15px]">
                        <th className="text-left font-medium py-3 pl-6 pr-4 w-24">Image</th>
                        <th className="text-left font-medium py-3 px-4">Product Name</th>
                        <th className="text-left font-medium py-3 px-4">Category</th>
                        <th className="text-left font-medium py-3 px-4">Price</th>
                        <th className="text-left font-medium py-3 px-4">Stock</th>
                        <th className="text-left font-medium py-3 px-4">Status</th>
                        <th className="text-left font-medium py-3 pr-6 pl-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((product, idx) => (
                        <tr
                            key={idx}
                            className={idx !== rows.length - 1 ? 'border-b border-[#e5e5e5]' : ''}
                        >
                            <td className="py-3.5 pl-6 pr-4">
                                <div className="w-20 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={product.photos[0]}
                                        alt={product.name}
                                        width={64}
                                        height={48}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            </td>
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a]">{product.name}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{product.category}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a]">${product.price}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{product.stock}</td>
                            <td className="py-3.5 px-4">
                                <StatusBadge status={product.status} onChange={(status) => updateStatus(product._id, status)} productId={product._id} />
                            </td>
                            <td className="py-3.5 pr-6 pl-4">
                                <ActionMenu id={product._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;