'use client'
import { DatePicker, Stack } from 'rsuite';
import isBefore from 'date-fns/isBefore';

export const DateTimeSelection = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center space-y-3 lg:space-y-0 '>
        <Stack direction='column'alignItems='flex-start'spacing={6}> 
            <DatePicker shouldDisableDate={date => isBefore(date, new Date()) } 
                style={{ width: 200 }} />
        </Stack>

        <DatePicker
            format="HH" ranges={[]}
            defaultValue={new Date('2017-12-12 09:15:30')}
            shouldDisableHour={hour => hour < 8 || hour > 18}
            style={{ width: 200, }} 
    />
    </div>
  )
}
