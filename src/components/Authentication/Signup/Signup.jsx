'use client'
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const {register, handleSubmit, reset} = useForm()
    const router = useRouter();

    const onSubmit = async (data) => {
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!res.ok) {
            console.log('error found')
            return
        }
        
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if(result?.error) {
            console.log('error found')
            return
        }

        reset()
        router.push('/')
    }

    return (
        <div className='pl-10 h-full flex flex-col justify-center'>
            <h2 className='text-3xl font-semibold capitalize'>sign up</h2>
            <p className='text-[#414141] mt-9'>Sign up with</p>
            <div className='mt-5 flex items-center gap-4'>
                <button className='flex gap-3 items-center justify-center border border-[#c4c4c4]/50 rounded-lg py-2 px-4 bg-border/50 w-[218px] cursor-pointer font-medium'>
                    <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1786974993/google-2_rad9gx.png'} alt='google' width={50} height={20} className='w-5 h-5' />
                    <span>Google</span>
                </button>
                <button className='flex gap-3 items-center justify-center border border-[#c4c4c4]/50 rounded-lg py-2 px-4 bg-border/50 w-[218px] cursor-pointer font-medium'>
                    <Image src={'https://res.cloudinary.com/db30o33kz/image/upload/v1786968415/apple-logo_yqakun.png'} alt='apple' width={50} height={20} className='w-5 h-5' />
                    <span>Apple</span>
                </button>
            </div>
            <div className='h-[1px] w-[450px] bg-border my-7'></div>
            <p className='text-[#414141]'>Or continue with email address</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='Enter your name' className='border border-[#c4c4c4]/50 rounded-lg py-2 px-4 bg-border/50 w-[450px] mt-5 focus:outline-0' {...register("name", {required: true})} />
                <input type="email" placeholder='Enter your email' className='border border-[#c4c4c4]/50 rounded-lg py-2 px-4 bg-border/50 w-[450px] mt-5 focus:outline-0' {...register("email", {required: true})} />
                <input type="password" placeholder='Enter your password' className='border border-[#c4c4c4]/50 rounded-lg py-2 px-4 bg-border/50 w-[450px] mt-5 focus:outline-0' {...register("password", {required: true})} />
                <button className='bg-primary text-white font-medium capitalize rounded-xl py-2.5 w-[450px] cursor-pointer mt-6'>Sign Up</button>
            </form>
            <p className='text-[#696969] mt-8'>Don{"'"}t have an account? <Link href='/signin' className='text-primary cursor-pointer font-medium'>Sign In</Link></p>
        </div>
    );
};

export default Signup;