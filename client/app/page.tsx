import Image from 'next/image'
import diningHero from '../public/images/homepage-hero/dining.jpg'

export default function Home() {

  return (
    <div>
      <div className='relative'>
        <Image src={diningHero} alt='homepage-hero' priority className='opacity-75'/>
        <h1 className='absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-xl lg:text-3xl text-white'>Find Dining...</h1>
      </div>
    </div>
  )
}
