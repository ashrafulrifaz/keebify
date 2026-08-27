'use client'
import { useSession } from "next-auth/react";
import TimeDropDown from "./TimeDropDown";
import { useState } from "react";

const DashboardHero = () => {
    const {data} = useSession()
    const [selected, setSelected] = useState(null)

    return (
        <div className='flex justify-between gap-3'>
            <div>
                <h2 className='capitalize text-2xl font-medium'>Welcome, {data?.user?.name}</h2>
                <p className='text-[#414141] mt-2'>Manage Products, orders, customer and performance in one place</p>
            </div>
            <div className='flex flex-col justify-end'>
                <TimeDropDown selected={selected} setSelected={setSelected} />
            </div>
        </div>
    );
};

export default DashboardHero;