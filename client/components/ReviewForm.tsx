'use client'

import { useForm } from "react-hook-form"

export default function ReviewForm({ showForm, setShowForm }:{ showForm:boolean, setShowForm:any }) {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data:any) => {
        console.log(data)
        setShowForm(!showForm)
    }

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-center text-[#DF0906] font-medium text-2xl">Write Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col my-2">
                <input {...register('rating', {required: true})} placeholder="Rating" className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5"></input>
                <input {...register('description', {required: true})} placeholder="Description" className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5"></input>
                <br /><button type="submit" className="bg-[#DF0906] rounded text-white py-1 px-2 w-full my-1">Add Review</button>
            </form>
        </div>
    )
}