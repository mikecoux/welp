'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import { useUserStore } from "@/stores/UserStore"
import { shallow } from 'zustand/shallow'

export default function LogInForm() {
    const { register, handleSubmit } = useForm()
    const [user, setUser] = useUserStore(
        (state) => [state.user, state.setUser],
        shallow
    )

    const onSubmit = (data:any) => {
        fetch('/api/login', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((user) => setUser(user))
            }
        })
    }

    return (
        <div className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/6">
            <h3 className="text-center text-[#DF0906] font-medium text-2xl">Log in to Welp</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col my-2">
                <input {...register('email', {required: true})} placeholder="Email" className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5"></input>
                <input {...register('password', {required: true})} placeholder="Password" className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5"></input>
                <br /><button type="submit" className="bg-[#DF0906] rounded text-white py-1 px-2 w-full my-1">Log In</button>
            </form>
            <span className="text-right text-xs">New to Welp? <Link href='/signup' className="text-sky-500">Sign up</Link></span>
        </div>
    )
}