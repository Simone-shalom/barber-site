'use client'
import { DatePicker, Stack } from 'rsuite';
import isBefore from 'date-fns/isBefore';

interface DateTimeSelectionProps {
  onChange: (value: any ) => void;
}

export const DateTimeSelection = ({onChange}: 
  DateTimeSelectionProps) => {
  return (
    <div className='flex flex-col lg:flex-row items-center space-y-3 lg:space-y-0 '>
        <Stack direction='column'alignItems='flex-start'spacing={6}> 
            <DatePicker shouldDisableDate={date => isBefore(date, new Date()) } 
                style={{ width: 200 }} onChange={onChange}/>
        </Stack>
    </div>
  )
}
