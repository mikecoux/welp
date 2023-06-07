'use client'

import BusinessCard from "@/components/BusinessCard"
import SearchMap from "@/components/SearchMap"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const libraries:any = ["places"]

export default function Search(){
    const [selected, setSelected] = useState<any>(null)
    const searchParams = useSearchParams()

    useEffect(()=> {
        const coordinatesStr = searchParams.get('find_loc')?.split(',')
        if (coordinatesStr != undefined) {

            const coordinatesObj = {
                lat: parseFloat(coordinatesStr[0]),
                lng: parseFloat(coordinatesStr[1])
            }
            console.log(coordinatesObj)
            setSelected(coordinatesObj)

        }
    }, [searchParams])

    const key = 1
    const img = "/assets/fillerimg.png"
    const name = 'Testaurant'
    const rating = 4.5
    const tags = ['food', 'like', 'good', 'nice']
    const highlight = "This restaurant good. Very fast and convenient. I like this place and recommend it."

    return (
        <div className="flex flex-row justify-between">
            <BusinessCard key={key} img={img} name={name} rating={rating} tags={tags} highlight={highlight} />
            <SearchMap selected={selected} setSelected={setSelected}/>
        </div>
    )
}