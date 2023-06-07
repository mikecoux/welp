'use client'

import Image from "next/image"

export default function BusinessCard( props:{ key:number, img:string, name:string, rating:number, tags:string[], highlight:string }){
    const tagsList = props.tags.map((tag:string) => <span key={tag} className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1">{tag}</span>)

    return (
        <div className="flex flex-row w-1/2 h-fit mx-8 mt-4 hover:shadow-lg">
            <div className="m-4">
                <Image src={props.img} width={200} height={200} alt="test img" />
            </div>
            <div className="my-4 mr-4">
                <h3 className="font-medium text-xl">{props.name}</h3>
                <h5>Rating: {props.rating}</h5>
                <div className="flex flex-row">
                    {tagsList}
                </div>
                <p>{props.highlight}</p>
            </div>
        </div>
    )
}