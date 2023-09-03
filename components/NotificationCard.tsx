'use client'

import { format } from "date-fns";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";


interface NotificationCardProps {
    body?: string;
    userId: string;
    createdAt: string;
    userName: string | null

}

const NotificationCard = ({body, userId, createdAt, userName}:
     NotificationCardProps) => {

      const date = new Date(createdAt)
      const formatedDate = format(date,'HH:mm PP' )

  return (
    <div>
      <Card className='px-2  py-2 border-black/5
                hover:shadow-2xl shadow-xl  transition cursor-pointer w-full flex'>
        <CardContent className=" text-lg flex">
          <div className="flex flex-col space-y-2">
            <div className='text-xl font-semibold'>
                  {body}
            </div>
            <div className='text-md'>
                  {formatedDate}
            </div>
                <div className='font-semibold'>
                    {userName}
                </div>
            </div>
        </CardContent>
        <Image src='/images/pexels-photo-2608582.jpeg' alt="" width={100} height={80} 
          className="object-cover rounded-md ml-auto pr-1"/>
      </Card>
    </div>
  )
}

export default NotificationCard