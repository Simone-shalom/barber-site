'use client'
import Image from 'next/image'
import {useRouter} from 'next/navigation'


const Logo = () => {

    
    const router = useRouter()

  return (

    <div className=''>
       <Image 
        onClick={() => router.push('/home')}
        src='/images/barber-logo.png' alt='Logo'
        className='cursor-pointer object-contain'
        height={60} width={200} />
    </div>
  )
}

export default Logo