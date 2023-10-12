import React from 'react'
import HeroHeading from './hero/HeroHeading'

interface HomeAdvertProps {
  admin?: boolean
}

export const HomeAdvert = ({admin}: HomeAdvertProps) => {
  return (
    <div className="flex items-center justify-center">
    <div className="bg-gradient-to-r from-red-500 to-blue-500 max-w-4xl flex items-center justify-center rounded-3xl shadow-2xl hover:scale-105 transition  duration-500 ">
       <div className="flex flex-col items-center justify-center text-white font-serif px-5 py-2 ">
        {admin ? (   
          <HeroHeading title="Manage Your reservations" desc='' href="/home" testimonials/>

        ): (
          <HeroHeading title="Create Your first reservation" desc='' href="/home" testimonials/>
        )}
        </div>
        {/* <div className="absolute right-10">
        <Logo />
        </div> */}
    </div>
    </div>
  )
}
