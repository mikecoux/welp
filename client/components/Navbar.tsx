'use client'

import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"

export default function Navbar () {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data:any) => console.log(data)

    return (
        <nav className="flex flex-row space-x-2 items-center justify-between mx-2">
            <Link href='/' className="justify-self-start"><Image src="/assets/welp-logo.png" width={110} height={40} alt="welp-logo"/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="space-x-2 items-center flex drop-shadow-md">
                <input {...register('searchProducts')} placeholder=" tacos, cheap dinner, Max's" className="rounded text-black"/>
                <input {...register('searchLocation')} placeholder=" Denver, CO" className="rounded" />
                <button type="submit"><Image src="/assets/search-icon.jpeg" alt="search" height={30} width={30} className="rounded text-black"/></button>
            </form>
            <div className="space-x-2">
                <Link href='/login'><button className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 text-black">Log In</button></Link>
                <Link href='/signup'><button className="bg-[#DF0906] rounded text-white py-1 px-2">Sign Up</button></Link>
            </div>
        </nav>
    )
}