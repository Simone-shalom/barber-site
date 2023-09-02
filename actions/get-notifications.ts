import prismadb from "@/lib/prismadb";

interface INotificationsParams{
    userId?: string;
}

export default async function getNotifications(params: INotificationsParams){

    try {

        const {userId} = params

        const notifications = await prismadb.notification.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        const safeNotifications = notifications.map((notification) => ({
            ...notification,
            createdAt: notification.createdAt.toISOString()
        }))

        return safeNotifications

    }catch(error){
        throw new Error('Notifications error')
    }

}