'use client'

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import NotificationCard from "@/components/NotificationCard"
import { PageWrapper } from "@/components/animations/pageWrapper"
import { Button } from "@/components/ui/button"
import { safeNotification, safeUser } from "@/types/types"
import { Notification } from "@prisma/client"
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
      <PageWrapper>
    <Heading title="Notifications" desc="Check your recent notifications" />
    <div className="pt-7 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
         xl:grid-cols-3 2xl:grid-cols- ">
        {notifications.map((notification) => (
          <div key={notification.id}>
            <NotificationCard body={notification.body} 
              userId={notification.userId} createdAt={notification.createdAt}
              userName={notification.userName}/>
          </div>
        ))}
    </div>
    <div className="flex flex-col gap-4 items-center justify-center pb-5 ">
        <Button onClick={onDelete} className="text-lg">
          Clear all
        </Button>
        <Button onClick={()=>router.push('/myreservations')}
          variant='cancel' className="text-lg">
          Check reservations
        </Button>
      </div>
      </PageWrapper>
   </Container>
  )
}

export default NotificationsClient