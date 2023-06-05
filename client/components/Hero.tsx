'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import diningHero from '../public/images/homepage-hero/dining.jpg'
import golfHero from '../public/images/homepage-hero/golf.jpg'
import poolHero from '../public/images/homepage-hero/pool.jpg'


export default function Hero(){
    const [heroImgIndex, setHeroImgIndex] = useState<number>(0)
    const heroImgs:any[] = [diningHero, golfHero, poolHero]

    useEffect(() => {
        const heroInterval = setInterval(() => {
            setHeroImgIndex(heroImgIndex => (heroImgIndex + 1) % heroImgs.length)
        }, 2000);

        return () => clearInterval(heroInterval)
    },[])

    return (
        <div className='relative'>
            <Image src={heroImgs[heroImgIndex]} alt='homepage-hero' priority className='opacity-75'/>
            <h1 className='absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-xl lg:text-3xl text-white'>Find Dining...</h1>
        </div>
    )
}