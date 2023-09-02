'use client'

import { Button } from "./ui/button";


interface NotificationCardProps {
    body?: string;
    userId: string;
    createdAt: string;
    userName: string | null

}

const NotificationCard = ({body, userId, createdAt, userName}:
     NotificationCardProps) => {
  return (
    <div>
      <div>
        {body}
        {createdAt}
        {userName}
      </div>
    </div>
  )
}

export default NotificationCard