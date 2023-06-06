'use client'

import Link from "next/link"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from 'next/navigation';
import SearchLocation from "./SearchLocation"
import { useLoadScript } from '@react-google-maps/api'
import { LatLng } from "use-places-autocomplete"

export default function Navbar () {
    const { selected, setSelected } = useState<LatLng|null>(null)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries: ["places"]
    });

    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const searchParams:any = useSearchParams()!;

    const createQueryString = useCallback(
        (obj:any) => {
          const params = new URLSearchParams(searchParams);
          for (const key in obj) {
            params.set(key, obj[key])
          };
     
          return params.toString();
        },
        [searchParams],
      );

    const onSubmit = (data:any) => {
        router.push('/search' + "?" + createQueryString(data))
    }

    return (
        <nav className="flex flex-row space-x-2 items-center justify-between m-4">
            <Link href='/' className="justify-self-start"><Image src="/assets/welp-logo.png" width={110} height={40} alt="welp-logo"/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="space-x-2 items-center flex shadow-md">
                <input {...register('find_desc')} placeholder=" tacos, cheap dinner, ..." className="rounded outline-none"/>
                <span className="text-neutral-200">|</span>

                {isLoaded ? <SearchLocation register={register} name={'find_loc'} setSelected={setSelected} /> : null}

                {/* <input {...register('find_loc')} placeholder=" city, zip code, ..." className="rounded outline-none" /> */}
                <button type="submit"><Image src="/assets/search-icon.jpeg" alt="search" height={30} width={30} className="rounded text-black"/></button>
            </form>
            <div className="space-x-2">
                <Link href='/login'><button className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 text-black">Log In</button></Link>
                <Link href='/signup'><button className="bg-[#DF0906] rounded text-white py-1 px-2">Sign Up</button></Link>
            </div>
        </nav>
    )
}