'use client'
import { Datetype } from '@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle';
import { add, format, isBefore } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
    date: Datetype
    setDate: Dispatch<SetStateAction<Datetype>>
    disabledDates?: Date[]
}

const Calendar = ({setDate,date, disabledDates=[]}:
     CalendarProps) => {

    const [mounted, setMounted] = useState(false)

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


  return (
    <div className='flex justify-center items-center pt-2'>
        {date.justDate ? (
            <div className='flex gap-4 overflow-x-auto p-3 border
            border-black/80 rounded-xl '>
                {times?.map((time, i) => (
                    <div key={`time-${i}`} className='rounded-md bg-gray-100  '>
                        <button type='button'
                            className=' focus:bg-gray-300 p-2 rounded-md' 
                            onClick={() => setDate((prev) => ({
                                ...prev, dateTime:time
                        }))}>
                            {format(time, 'kk')}:00
                        </button>
                    </div>
                ))}
            </div>
        ) :(
            <ReactCalendar
            tileDisabled={tileDisabled}
                minDate={new Date()} view='month'
                onClickDay={(date) => setDate((prev)=> ({...prev, justDate: date}))}/>
        )}
    </div>
  )
}

export default Calendar