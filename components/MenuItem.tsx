'use client'

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label}) => {
  return (
    <div 
        onClick={onClick}
        className='py-3 px-4 hover:bg-neutral-100 rounded-xl transition text-sm'>
        {label}
    </div>
  )
}

export default MenuItem