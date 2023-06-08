'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const libraries:any = ["places"]

export default function SearchMap() {

    const [selected, setSelected] = useState<any>(null)
    const searchParams = useSearchParams()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries
    });

    useEffect(()=> {
        const coordinatesStr = searchParams.get('find_loc')?.split(',')
        if (coordinatesStr != undefined) {

            const coordinatesObj = {
                lat: parseFloat(coordinatesStr[0]),
                lng: parseFloat(coordinatesStr[1])
            }

            setSelected(coordinatesObj)

        }
    }, [searchParams])

    if (!isLoaded) return <div>Loading...</div>;

    return(
        <GoogleMap 
            zoom={11}
            center={selected ? selected as any : { lat: 43.45, lng: -80.49 }}
            mapContainerClassName="h-[90vh] w-1/3 mt-4 shadow-md"
        >
            {/* {selected && <Marker position={selected} />} */}
        </GoogleMap>
    )
}