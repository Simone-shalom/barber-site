import getCurrentUser from "@/actions/get-current-user"
import Empty from "@/components/Empty"
import NotificationsClient from "./components/NotificationsClient"
import getNotifications from "@/actions/get-notifications"
import { ADMIN_ID } from "@/permissions"
import { redirect } from "next/navigation"


const NotificationsPage = async() => {
    const currentUser = await getCurrentUser()

    const notifications = await getNotifications({userId: currentUser?.id})

    if(currentUser?.id !==ADMIN_ID) {
      redirect('/')
    }
    
    if(notifications.length=== 0){
      return (
        <Empty title="No Notifications yet" desc="Wait and see"  
          home/>
      )
  }

  return (
    <div>
      <NotificationsClient currentUser={currentUser} notifications={notifications}/>
    </div>
  )
}


export default NotificationsPage