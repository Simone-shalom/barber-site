'use client'

import { safeUser } from "@/types/types"
import { BanknoteIcon, HomeIcon, Palmtree, Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface StatisticsProps {
    totalIncome: number
    allUsers: number
    reservationsCount: number
    takenTimes:string[] | null
    currentDayName: string
    currentUser: safeUser
}


const Statistics = ({totalIncome, allUsers, reservationsCount,
     takenTimes,currentDayName, currentUser}: 
    StatisticsProps) => {

      const router = useRouter()

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
                <h1 className="pt-10 text-2xl">
                  Today is <span className="font-semibold text-xl ml-1">{currentDayName}</span>
                </h1>
                <div className="pt-2">
                    {takenTimes&& takenTimes.length > 0 ? (
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
                      <div className="flex items-center  space-x-2">
                        <h1 className="text-xl  font-semibold pb-1">
                            No reservations Today
                        </h1>
                        <Palmtree size={32}/>
                      </div>
                    )}
                   
                </div>
                <div className="flex items-center justify-center pt-8">
                  <Button onClick={()=> router.push('/myreservations')}>
                    Check reservations
                  </Button>
                </div>
                <div className=" flex flex-col pt-2 items-center justify-center">
                  Barber
                  <p className="text-xl ">@ {currentUser.name}</p>
                </div>
                {/* <div className="flex items-center justify-center pt-5">
                  <Button onClick={()=> router.push('/myreservations')}>
                    Check reservations
                  </Button>
                </div> */}

              </div>
    </div>
  )
}

export default Statistics