'use client'

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { LatLng } from 'use-places-autocomplete';

export default function SearchMap(
    { selected }: { selected:LatLng }
) {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries: ["places"]
    });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <Map selected={selected} />
        </div>
    )
}

function Map(
    { selected }: { selected:LatLng }
){
    const center = useMemo(() => ({lat: 44, lng: -80}), []);

    return(
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName='w-full h-[500px]'
        >
            {selected && <Marker position={selected} />}
        </GoogleMap>
    )
}