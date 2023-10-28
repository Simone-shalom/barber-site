'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import NotificationCard from "@/components/NotificationCard"
import { PageWrapper } from "@/components/animations/pageWrapper"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { safeNotification, safeUser } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface NotificationsClientProps {
    currentUser: safeUser
    notifications: safeNotification[]
}

const NotificationsClient = ({ currentUser, notifications}:
     NotificationsClientProps) => {

      
  const router = useRouter()

  const [loading, setLoading] = useState(false)


  const onDelete = async() => {
      
    try{
        setLoading(true)
        await axios.delete(`/api/notifications/${currentUser.id}`)

        toast.success("Deleted notifications")
        router.refresh()

    } catch(error: any){
      console.log(error)
      toast.error('Error deleting notification')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Container>
    <Heading title="Notifications" desc="Check your recent notifications" />

    <ScrollArea className="h-[500px] w-full rounded-md border scroll-smooth mt-10  px-3">
    <div className="py-5 gap-8 grid grid-cols-1 md:grid-cols-2 
         xl:grid-cols-3 ">
        {notifications.map((notification) => (
          <>
          <PageWrapper key={notification.id}>
          <div key={notification.id}>
            <NotificationCard body={notification.body} 
              userId={notification.userId} createdAt={notification.createdAt}
              userName={notification.userName}/>
          </div>
          </PageWrapper>
          </>
        ))}
    </div>
    </ScrollArea>
    <div className="flex flex-col gap-4 items-center justify-center pb-5 pt-20">
        <Button onClick={onDelete} className="text-lg">
          Clear all
        </Button>
        <Button onClick={()=>router.push('/myreservations')}
          variant='cancel' className="text-lg">
          Check reservations
        </Button>
      </div>
   </Container>
  )
}

export default NotificationsClient