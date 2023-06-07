'use client'

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { LatLng } from 'use-places-autocomplete';

const libraries:any = ["places"]

export default function SearchMap(
    { selected }: { selected:LatLng }
) {

    // Loads the JS script for the Google Maps API with the places library
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGL_MAPS_API_KEY,
        libraries
    });

    // useMemo stores this information in memory in case the component re-renders
    const center = useMemo(() => ({lat: 44, lng: -80}), []);

    if (!isLoaded) return <div>Loading...</div>

    return(
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="h-[90vh] w-1/3 mt-4"
        >
            {selected && <Marker position={selected} />}
        </GoogleMap>
    )
}