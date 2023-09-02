'use client'

import { AlertCircle } from "lucide-react";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    alert?: boolean 
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label, alert}) => {
  return (
    <div 
        onClick={onClick}
        className='py-3 flex px-4 hover:bg-neutral-100 rounded-xl transition text-lg'>
        {label}
        {alert && (
          <div className="flex pl-2 animate-pulse duration-1000">
            <AlertCircle />
          </div>
        )}
    </div>
  )
}

export default MenuItem