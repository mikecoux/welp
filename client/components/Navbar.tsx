'use client'

import Link from "next/link"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter, useSearchParams } from 'next/navigation';
import SearchLocation from "./SearchLocation"
import { useLoadScript } from '@react-google-maps/api'

const libraries:any = ["places"]

export default function Navbar () {

    // Loads the JS script for the Google Maps API with the places library
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries
    });

    const { register, handleSubmit, control } = useForm()
    const router = useRouter()
    const searchParams:any = useSearchParams()!;

    // creates a query string with data from an object passed as a parameter
    // not sure what useCallback does
    const createQueryString = useCallback(
        (obj:any) => {
            // not exactly sure what is being constructed here
          const params = new URLSearchParams(searchParams);
          // iterate through the obj, setting a query param for each key/value
          for (const key in obj) {
            params.set(key, obj[key])
          };
     
          return params.toString();
        },
        [searchParams],
      );

    // data is returned from react-hook-form as an object
    // keys are set to the name the input is "registered" with
    // on form submit, the keys and values are appended to the query string
    const onSubmit = (data:any) => {
        router.push('/search' + "?" + createQueryString(data))
    }

    return (
        <nav className="flex flex-row space-x-2 items-center justify-between m-4">
            <Link href='/' className="justify-self-start"><Image src="/assets/welp-logo.png" width={110} height={40} alt="welp-logo"/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="space-x-2 items-center flex shadow-md">
                <input {...register('find_desc')} placeholder="cheap dinner, plumber, tacos" className="rounded outline-none indent-2.5"/>
                <span className="text-neutral-200">|</span>

                {isLoaded ? 
                    <Controller
                        control={control}
                        name='find_loc'
                        render={({ field: { onChange } }) => (
                            <SearchLocation onChange={onChange} />
                        )}
                    /> 
                : null}

                <button type="submit"><Image src="/assets/search-icon.jpeg" alt="search" height={30} width={30} className="rounded text-black"/></button>
            </form>
            <div className="space-x-2">
                <Link href='/login'><button className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 text-black">Log In</button></Link>
                <Link href='/signup'><button className="bg-[#DF0906] rounded text-white py-1 px-2">Sign Up</button></Link>
            </div>
        </nav>
    )
}