'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries:any = ["places"]

export default function SearchMap(
    { selected, setSelected }: { selected:any, setSelected:any }
) {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries
    });

    if (!isLoaded) return <div>Loading...</div>;

    return(
        <GoogleMap 
            zoom={11}
            center={selected ? selected as any : { lat: 43.45, lng: -80.49 }}
            mapContainerClassName="h-[90vh] w-1/3 mt-4"
        >
            {/* {selected && <Marker position={selected} />} */}
        </GoogleMap>
    )
}