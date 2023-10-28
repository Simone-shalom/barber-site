'use client'
import {useRouter} from 'next/navigation'


const Logo = () => {

    
    const router = useRouter()

  return (

    <div className=''>
       <img 
        onClick={() => router.push('/home')}
        src='/images/barber-logo.png' alt='Logo'
        className='cursor-pointer object-contain'
        height={50} width={200} />
    </div>
  )
}

export default Logo