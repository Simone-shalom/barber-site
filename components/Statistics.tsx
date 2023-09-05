'use client'

import { BanknoteIcon, HomeIcon, Pencil } from "lucide-react"
import Image from "next/image"

interface StatisticsProps {
    totalIncome: number
    allUsers: number
    reservationsCount: number
    takenTimes:string[] | null
}


const Statistics = ({totalIncome, allUsers, reservationsCount,
     takenTimes}: 
    StatisticsProps) => {
  return (
    <div>
         <h1 className="text-3xl pb-10 pt-3 text-center font-semibold">
                Your statistics
              </h1>
              <div className="space-y-3">
                <div>
                  <BanknoteIcon size={32}/>
                  <p className="text-2xl">
                    Total Income
                    <span className="font-bold ml-2">
                      {totalIncome} $</span>
                  </p>
                </div>
                
                <div>
                  <Pencil size={32}/>
                  <p className="text-2xl">
                    Reservations Count
                    <span className="font-bold ml-2">{reservationsCount}</span>
                  </p>
                </div>

                <div>
                  <HomeIcon size={32}/>
                  <p className="text-2xl">
                    Users Count
                    <span className="font-bold ml-2">{allUsers}</span>
                  </p>
                </div>

                <div className="pt-5">
                    {takenTimes ? (
                        <div>
                              <h1 className="text-xl font-semibold pb-1">
                        Reservation times today:
                    </h1>
                    <div className="flex gap-2 overflow-x-auto 
                        rounded-xl pb-3 border
                        border-black/80 p-3">
                        {takenTimes?.map((time) => (
                            <div key={time} className='rounded-md bg-gray-100 px-3 py-1'>
                                <p className="font-semibold">{time}</p>
                            </div>
                        ))}
                    </div>
                        </div>
                    ): (
                        <h1 className="text-xl font-semibold pb-1">
                            No reservations Today
                        </h1>
                    )}
                   
                </div>
                <div className=" flex flex-col pt-5 items-center justify-center">
                
                  <p className="text-xl pt-5">Free times from calendar soon for that day</p>
                </div>

              </div>
    </div>
  )
}

export default Statistics