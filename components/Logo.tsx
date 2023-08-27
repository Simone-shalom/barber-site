'use client'
import Image from 'next/image'
import {useRouter} from 'next/navigation'


const Logo = () => {

    
    const router = useRouter()

  return (
    <Image 
        onClick={() => router.push('/')}
        src='/images/barber-logo.png' alt='Logo'
        className='hidden md:block cursor-pointer'
        height={200} width={160}/>
  )
}

export default Logo