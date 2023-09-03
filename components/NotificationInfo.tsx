'use client'

import { safeNotification } from "@/types/types"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { BellDotIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"



interface NotificationInfoProps {
    notifications: safeNotification[]
}

const NotificationInfo = ({notifications}:
     NotificationInfoProps) => {

        const [isLoading, setIsLoading]= useState(false)
        const [mounted, setMounted]= useState(false)
        const [isNotificationOpen, setIsNotificationOpen] = useState(false)
        const router = useRouter()

        useEffect(() => {
            setMounted(true)
            if (notifications.length > 0) {
              setIsNotificationOpen(true);
            } else {
              setIsNotificationOpen(false);
            }
          }, [notifications]);



        const goNotifications =() => {
            setIsNotificationOpen(false)
            router.push('notifications')
            
           
        }

        const onClose =() => {
            setIsNotificationOpen(false)
        }

        if(!mounted){
            return null
        }
    
      return (
        <>
        {isNotificationOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                <Card className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                    <CardContent className="flex flex-col gap-2 items-center justify-center">
                        <CardTitle className="text-3xl">
                            Notifications
                        </CardTitle>
                        <CardDescription className="text-xl flex">
                            You got a new notifications
                            <BellDotIcon className="pl-2" size={32}/>
                        </CardDescription>
                        <Button 
                            onClick={goNotifications}
                            className="mt-5">
                            Check notifications
                        </Button>
                        <XIcon 
                            onClick={onClose}
                            className="absolute top-2 right-2 cursor-pointer 
                            hover:scale-110"
                        />
                    </CardContent>
                </Card>
            </div>
        )}
       </>
    
      )
}

export default NotificationInfo