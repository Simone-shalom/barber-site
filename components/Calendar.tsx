'use client'

import { Datetype } from '@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle';
import { add, format, isBefore } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';

interface CalendarProps {
    date: Datetype
    setDate: Dispatch<SetStateAction<Datetype>>
    disabledDates?: Date[]
}

const Calendar = ({setDate,date, disabledDates=[]}:
     CalendarProps) => {

    const [mounted, setMounted] = useState(false)
    const router = useRouter()


    useEffect(() => {
        setMounted(true)
    },[])

if(!mounted){
    return null
}

const getTimes = () =>{
    if(!date.justDate) return 

    const {justDate} = date

    const begginning = add(justDate, {hours: 9})
    const end = add(justDate, {hours: 18})
    const interval = 60 // in minutes
    const now = new Date() // current time

    const times = []
    for(let i = begginning; i <=end; i= add(i, {minutes: interval})){
         // Check if the time is in the past
      if (isBefore(i, add(now, { hours: 1 })))  {
        continue; // Skip past times
      }
        times.push(i)
    }

      // Filter out times that match the disabledDates
      const filteredTimes = times.filter((time) => {
        return !disabledDates.some((disabledDate) =>
        time.getFullYear() === disabledDate.getFullYear() &&
        time.getMonth() === disabledDate.getMonth() &&
        time.getDate() === disabledDate.getDate() &&
        time.getHours() === disabledDate.getHours()
        );
    });
    return  filteredTimes
}

const times = getTimes()

    const tileDisabled = ({ date }: { date: Date }) => {
    // Check if the date is a Saturday (6) or Sunday (0)
    return date.getDay() === 6 || date.getDay() === 0;
  };


  const removeDate = () => {
    
    date.justDate= null
    router.refresh()
  }

  return (
    <div 
        data-testid='calendar-container'
        className='flex justify-center items-center pt-2'>
        {date.justDate ? (
            <div className='flex gap-4  overflow-x-auto p-3  rounded-xl  '>
                {times && times.length === 0 ? (
                  <div className='flex flex-col items-center justify-center space-y-3'>
                    <p className='text-2xl px-4 text-center'>
                     No Times available that day
                    </p>
                    <Button
                        onClick={removeDate}
                        variant='secondary' className='bg-gray-200 text-lg font-semibold'>
                        Remove Date <CalendarCheck className='ml-3'/>
                    </Button>
                  </div>
                ):(
                    <div className='flex gap-4 overflow-x-auto 
                     rounded-xl pb-3 border
                     border-black/80 p-3'>
                    {times?.map((time, i) => (
                        <div key={`time-${i}`} className='rounded-md bg-gray-100  '>
                            <button type='button'
                                className=' focus:bg-gray-300 p-2 rounded-md' 
                                onClick={() => setDate((prev) => ({
                                    ...prev, dateTime:time
                            }))} 
                            >
                                {format(time, 'kk')}:00
                            </button>
                        </div>
                    ))}
                     </div>
                )}
            </div>
        ) :(
            <ReactCalendar
            data-testid='calendar'
            tileDisabled={tileDisabled}
                minDate={new Date()} view='month'
                onClickDay={(date) => setDate((prev)=> ({...prev, justDate: date}))}/>
        )}
    </div>
  )
}

export default Calendar