'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"

export default function LogInForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data:any) => console.log(data)

    return (
        <div className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/6">
            <h3 className="text-center text-[#DF0906] font-medium text-2xl">Sign up for Welp</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col my-2">
                <div className="flex flex-row">
                    <input {...register('userFirstName', {required: true})} placeholder=" First Name" className="rounded text-black outline outline-slate-300 my-1 w-full mr-2"></input>
                    <input {...register('userLastName', {required: true})} placeholder=" Last Name" className="rounded text-black outline outline-slate-300 my-1 w-full"></input>
                </div>
                <input {...register('userEmail', {required: true})} placeholder=" Email" className="rounded text-black outline outline-slate-300 my-1 w-full"></input>
                <input {...register('userPassword', {required: true})} placeholder=" Password" className="rounded text-black outline outline-slate-300 my-1 w-full"></input>
                <input {...register('userZipCode', {required: true})} placeholder=" ZIP Code" className="rounded text-black outline outline-slate-300 my-1 w-full"></input>
                <br /><button type="submit" className="bg-[#DF0906] rounded text-white py-1 px-2 w-full my-1">Sign Up</button>
            </form>
            <span className="text-right text-xs">Already on Welp? <Link href='/login' className="text-sky-500">Log in</Link></span>
        </div>
    )
}