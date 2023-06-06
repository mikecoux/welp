'use client'

// import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import diningHero from '../public/images/homepage-hero/dining.jpg'
import golfHero from '../public/images/homepage-hero/golf.jpg'
import poolHero from '../public/images/homepage-hero/pool.jpg'


export default function Hero(){
    const [heroIndex, setHeroIndex] = useState<number>(0)
    const [progBar, setProgBar] = useState(0)
    const [progBar2, setProgBar2] = useState(0)
    const [progBar3, setProgBar3] = useState(0)

    const heroImgs:any[] = [diningHero, golfHero, poolHero]
    const heroText = ["Find dining", "Swing into summer", "Discover leisure"]

    useEffect(() => {
        const heroInterval = setInterval(() => {
            setHeroIndex(heroIndex => (heroIndex + 1) % heroImgs.length)
        }, 4000);

        return () => clearInterval(heroInterval)
    },[])

    useEffect(() => {
        if (heroIndex === 0){
            setProgBar2(0);
            setProgBar3(0);
            const sliderInterval = setInterval(() => {
                setProgBar(progBar => (progBar + 2) % 100)
            }, 80)
            return () => clearInterval(sliderInterval)

        } else if (heroIndex === 1 ) {
            setProgBar(100);
            setProgBar3(0);
            const sliderInterval = setInterval(() => {
                setProgBar2(progBar2 => (progBar2 + 2) % 100)
            }, 80)
            return () => clearInterval(sliderInterval)

        } else {
            setProgBar(100);
            setProgBar2(100);
            const sliderInterval = setInterval(() => {
                setProgBar3(progBar3 => (progBar3 + 2) % 100)
            }, 80)
            return () => clearInterval(sliderInterval)
        }
    },[heroIndex])

    //possibly add transition-[height] and ease-linear to make the progress bar smoother

    return (
        <div className='relative'>
            <div className="h-[800px] overflow-hidden">
                <Image src={heroImgs[heroIndex]} alt='homepage-hero' priority className='opacity-75 w-full h-auto'/>
            </div>
            <div className="absolute top-1/4 left-1/4 flex flex-col">
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-white w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar}%`}}></div>
                </div>
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-white w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar2}%`}}></div>
                </div>
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-white w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar3}%`}}></div>
                </div>
            </div>
            <h1 className='absolute top-1/4 left-[30%] font-bold text-xl lg:text-6xl text-white'>{heroText[heroIndex]}</h1>
        </div>
    )
}