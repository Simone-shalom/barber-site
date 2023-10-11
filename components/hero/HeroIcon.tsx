import { LucideIcon } from "lucide-react"

interface HeroIconProps {
  Icon: LucideIcon
  title: string
  desc: string
}

export const HeroIcon = ({Icon, title, desc}: HeroIconProps) => {
  return (
    <div className="flex flex-col w-40 h-24 items-center justify-center text-center">
      <div className="p-1 bg-white rounded-xl">
      <Icon size={32} color="black"/>
      </div>
      <h1 className="text-lg font-semibold capitalize">
        {title}
      </h1>
      <p className="font-thin leading-none ">
        {desc}
      </p>
    </div>
  )
}
