'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const customers = [
    { id: 1, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 2, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 3, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 4, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 5, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 6, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
    { id: 7, name: 'Ashraful Islam', email: 'ashrafulislamrifaz@gmail.com', phone: '+880 016438 76985', totalOrders: 12, totalSpent: 1700.0 },
];

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
    const [rows, setRows] = useState(customers);

    const updateStatus = (id, status) => {
        setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
    };

    return (
        <div className="rounded-2xl bg-[#F5F5F5] mt-5">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-border text-[#414141] text-[15px]">
                        <th className="text-left font-medium py-3 px-4">Customer Name</th>
                        <th className="text-left font-medium py-3 px-4">Email</th>
                        <th className="text-left font-medium py-3 px-4">Phone</th>
                        <th className="text-left font-medium py-3 px-4">Total Orders</th>
                        <th className="text-left font-medium py-3 px-4">Total Spent</th>
                        <th className="text-left font-medium py-3 pr-6 pl-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((customer, idx) => (
                        <tr
                            key={customer.id}
                            className={idx !== rows.length - 1 ? 'border-b border-[#e5e5e5]' : ''}
                        >
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a]">{customer.name}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{customer.email}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#1a1a1a]">{customer.phone}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">{customer.totalOrders}</td>
                            <td className="py-3.5 px-4 text-[15px] text-[#414141]">${customer.totalSpent}</td>
                            <td className="py-3.5 pr-6 pl-4">
                                <ActionButton customer={customer} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;