'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

const orders = [
    { id: 1, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Ashraful Rifaz', quantity: 1, date: '2026-08-12', total: 85.0, status: 'Pending' },
    { id: 2, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Sarah Chen', quantity: 2, date: '2026-08-14', total: 170.0, status: 'Shipped' },
    { id: 3, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Marcus Lee', quantity: 1, date: '2026-08-09', total: 85.0, status: 'Delivered' },
    { id: 4, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Priya Sharma', quantity: 3, date: '2026-08-16', total: 255.0, status: 'Cancelled' },
    { id: 5, image: 'https://res.cloudinary.com/db30o33kz/image/upload/v1785846044/AULA_F75_Max_Driver_Background_Removed_yndmgl.png', product: 'Universe Vitality Orange', customer: 'Daniel Kim', quantity: 1, date: '2026-08-18', total: 85.0, status: 'Delivered' },
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

const ActionButton = ({ item }) => {
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

const RecentOrders = () => {
    return (
        <div className='p-4 rounded-xl border border-black/5'>
            <h4 className='capitalize text-lg font-medium'>recent orders</h4>
            {
                orders?.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="mt-4">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-14 rounded-2xl bg-border flex items-center justify-center overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.product}
                                    width={64}
                                    height={48}
                                    className="object-contain w-full h-full p-1"
                                />
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <h3>{item.product}</h3>
                                <ActionButton item={item} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RecentOrders;