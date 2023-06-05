'use client'

import Image from "next/image"

export default function BusinessCard({ img, name, rating, tags, highlight }){
    const tagsList = tags.map((tag) => <span className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1">{tag}</span>)

    return (
        <div className="flex flex-row w-1/2 m-8 hover:shadow-lg">
            <div className="m-4">
                <Image src={img} width={200} height={200} alt="test img" />
            </div>
            <div className="my-4 mr-4">
                <h3 className="font-medium text-xl">{name}</h3>
                <h5>Rating: {rating}</h5>
                <div className="flex flex-row">
                    {tagsList}
                </div>
                <p>{highlight}</p>
            </div>
        </div>
    )
}