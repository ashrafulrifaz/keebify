'use client'
import Image from 'next/image';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const STATUS_OPTIONS = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_STYLES = {
    Pending: 'bg-[#FCF1D9] text-[#B98900]',
    Shipped: 'bg-[#E0EDFB] text-[#2F6FBD]',
    Delivered: 'bg-[#E3F1DE] text-[#4A8B3B]',
    Cancelled: 'bg-[#FBE3E1] text-[#C4453A]',
};

const orders = [
    { id: 1, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Ashraful Rifaz', quantity: 1, date: '2026-08-12', total: 85.0, status: 'Pending' },
    { id: 2, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Sarah Chen', quantity: 2, date: '2026-08-14', total: 170.0, status: 'Shipped' },
    { id: 3, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Marcus Lee', quantity: 1, date: '2026-08-09', total: 85.0, status: 'Delivered' },
    { id: 4, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Priya Sharma', quantity: 3, date: '2026-08-16', total: 255.0, status: 'Cancelled' },
    { id: 5, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Daniel Kim', quantity: 1, date: '2026-08-18', total: 85.0, status: 'Delivered' },
];

// Shared hook: computes dropdown position + open state + outside click
const useDropdown = () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0, ready: false });

    const toggle = () => setOpen((prev) => !prev);

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
                triggerRef.current && !triggerRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return { open, setOpen, triggerRef, menuRef, coords, toggle };
};

const StatusBadge = ({ status, onChange }) => {
    const { open, setOpen, triggerRef, menuRef, coords, toggle } = useDropdown();

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={toggle}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium cursor-pointer transition-colors ${STATUS_STYLES[status]}`}
            >
                {status}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" />
                </svg>
            </button>

            {open && typeof window !== 'undefined' && createPortal(
                <div
                    ref={menuRef}
                    style={{ position: 'fixed', top: coords.top, left: coords.left, visibility: coords.ready ? 'visible' : 'hidden' }}
                    className="w-40 bg-white rounded-xl border border-border shadow-lg shadow-black/5 py-1.5 z-50 overflow-hidden"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => { onChange(option); setOpen(false); }}
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

const ActionModal = ({ order, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">Manage order</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-secondary transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='mt-5'>
                    <Image src={order.image} alt='product image' width={300} height={150} className='w-full h-1/2 border border-border/40 rounded-xl bg-border/5-' />

                    <div>
                        <h4>Product Name</h4>
                        <h5>{order.product}</h5>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => {
                            console.log('Edit', order.id);
                            onClose();
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#414141] bg-secondary hover:bg-border transition-colors cursor-pointer"
                    >
                        Edit order
                    </button>
                    <button
                        onClick={() => {
                            console.log('Delete', order.id);
                            onClose();
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#C4453A] bg-[#FBE3E1] hover:bg-[#f5cfcb] transition-colors cursor-pointer"
                    >
                        Delete order
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const ActionButton = ({ order }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Row actions"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5">
                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"></path>
                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"></path>
                </svg>
            </button>

            {modalOpen && <ActionModal order={order} onClose={() => setModalOpen(false)} />}
        </>
    );
};

const Table = () => {
    const [rows, setRows] = useState(orders);

    const updateStatus = (id, status) => {
        setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
    };

    return (
        <div className="rounded-2xl bg-[#F5F5F5] mt-5">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-border text-[#414141] text-[15px]">
                        <th className="text-left font-medium py-3 pl-6 pr-4 w-24">Image</th>
                        <th className="text-left font-medium py-3 px-4">Product Name</th>
                        <th className="text-left font-medium py-3 px-4">Customer</th>
                        <th className="text-left font-medium py-3 px-4">Quantity</th>
                        <th className="text-left font-medium py-3 px-4">Date</th>
                        <th className="text-left font-medium py-3 px-4">Total</th>
                        <th className="text-left font-medium py-3 px-4">Status</th>
                        <th className="text-left font-medium py-3 pr-6 pl-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((order, idx) => (
                        <tr
                            key={order.id}
                            className={idx !== rows.length - 1 ? 'border-b border-[#e5e5e5]' : ''}
                        >
                            <td className="py-3.5 pl-6 pr-4">
                                <div className="w-20 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={order.image}
                                        alt={order.product}
                                        width={64}
                                        height={48}
                                        className="object-contain w-full h-full p-1"
                                    />
                                </div>
                            </td>
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a]">{order.product}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{order.customer}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a] font-medium">{order.quantity}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{order.date}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141] font-medium">${order.total}</td>
                            <td className="py-3.5 px-4">
                                <StatusBadge status={order.status} onChange={(status) => updateStatus(order.id, status)} />
                            </td>
                            <td className="py-3.5 pr-6 pl-4">
                                {/* <ActionButton order={order} /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;